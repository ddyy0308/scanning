(function(){
    /**
     * 扫描管理-任务浏览控制器
     */
    function scanController($rootScope, $scope, util, service){
        /**
         * 删除任务
         */
        $scope.deleteTask = function(id){deleteTask(id);};

        /**
         * 点击模态框OK button
         */
        $scope.clickModalOk = function(modalType, id){submit(modalType, id);};

        /**
         * 启动任务
         */
        $scope.startTask = function(taskID){startTask(taskID)};

        /**
         * 停止任务
         */
        $scope.stopTask = function(taskID){stopTask(taskID)};

        /**
         *定时刷新任务
         */
        $scope.changeTaskTimer = function(second){intervalSecond = second; setScanTimer(second);};

        /**
         *显示扫描任务详情
         */
        $scope.showScanDetail = function(id){
            util.showTab("a[href='#tab-scanDetail']");
            $rootScope.curScanDetailTaskID = id;
        };

        /**
         * 启动任务浏览定时器
         */
        $rootScope.startScanTimer = function(){
            setScanTimer(intervalSecond);
        };

        /**
         * 停止任务浏览定时器
         */
        $rootScope.stopScanTimer = function(){
            setScanTimer(0);
        };

        var intervalID= ""; //定时器ID
        var intervalSecond = 0;  //定时器时间

        /*弱密码、端口、快速扫描 扫描策略ID*/
        var configID = {'custom':{}, 'password':{config_id:'3a626a78-ebb3-4855-9540-2cf94f46d760'},
            'port':{config_id:'5acff6ed-11a3-4aea-b70f-8800dd01423c'}, 'fast':{config_id:'50d4ddae-8a78-4d63-a0ee-51a40381d25f'}};

        var init = function(){
            $scope.taskList = {'total':'', 'lists':''};
            $rootScope.firstTaskID = '';  //默认第一个扫描任务详情ID
            $rootScope.curScanDetailTaskID = ''; //当前扫描任务详情ID

            util.showTab("#myTab li a:first");
        };

        var event = function(){
            $("a[href='#tab-taskOverview']").on('shown.bs.tab', function(e){
                showTaskList(pagination.page.curBegin, pagination.page.curEnd, pagination.page.curBegin); //refresh
                $rootScope.stopScanDetailTimer();
                $rootScope.startScanTimer();
            });
        };

        var show = function(){
            showTaskList(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 显示任务列表
         */
        var showTaskList = function(begin, end, curPage){
            service.getAllTask(begin, end, $rootScope.taskMenuType).then(function(obj){
                if(obj.data.status == 0) $rootScope.firstTaskID = obj.data.value[0].id;    //默认取第一个
                util.showList({in:obj, out:$scope.taskList, curPage:curPage, cbFunc:showTaskList});
            });
        };

        /**
         * 新建任务
         */
        var createTask = function(){
            var serializeData = $("#modal-new-task form").serialize();
            service.createTask(configID[$rootScope.taskMenuType],serializeData).then(function(obj){
                util.create({in:obj, msg_success:$scope.msg.createTaskSuccess, msg_fail:$scope.msg.createTaskFail, cbFunc:show});
            });
        };

        /**
         * 编辑任务
         */
        var editTask = function(id){
            var serializeData = $("#modal-edit-task form").serialize();
            var params = {id:id};
            //$.extend(params, configID[$rootScope.taskMenuType]);
            $rootScope.taskMenuType == 'custom' ? $.extend(params, {config_id:id}) : angular.noop();
            service.editTask(params, serializeData).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editTaskSuccess, msg_fail:$scope.msg.editTaskFail, cbFunc:show});
            });
        };

        /**
         * 删除任务
         */
        var deleteTask = function(id){
            util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
                service.deleteTask(id).then(function(obj){
                    util.delete({in:obj, msg_success:$scope.msg.deleteTaskSuccess, msg_fail:$scope.msg.deleteTaskFail, cbFunc:show});
                });
            });
        };

        /**
         * 提交表单数据 新建、编辑
         * */
        var submit = function(modalType, id){
            if(modalType == "new"){
                util.checkModalSubmit("#modal-new-task form", createTask);
            }else if(modalType == "edit"){
                util.checkModalSubmit("#modal-edit-task form", editTask, id);
            }
        };

        /**
         * 启动任务
         */
        var startTask = function(taskID){
            service.startTask(taskID).then(function(obj){
                obj.data.status == 0 ? show() : util.showLayerAlert($scope.msg.startTaskFail, util.iconID.FAIL)
            });
        };

        /**
         * 停止任务
         */
        var stopTask = function(taskID){
            obj.data.status == 0 ? show() : util.showLayerAlert($scope.msg.stopTaskFail, util.iconID.FAIL)
        };

        /**
         * 设置扫描任务定时器 --second=0 clear Timer
         */
        var setScanTimer =  function(second){
            intervalID && clearInterval(intervalID);
            if(second != 0){
                intervalID = setInterval(function(){
                    show();
                }, second*1000);
            }
        };

        //Entrance
        init();
        event();
        show();
    }

    /**
     * 扫描管理-扫描详情控制器
     */
    function scanDetailController($rootScope, $scope, util, service){
        /**
         * 启动任务浏览定时器-默认5s
         */
        $rootScope.startScanDetailTimer = function(){
            setTaskTimer(5);
        };

        /**
         * 停止任务浏览定时器
         */
        $rootScope.stopScanDetailTimer = function(){
            setTaskTimer(0);
        };

        /**
         * 启动任务
         */
        $scope.startTask = function(){
            var promise = service.startTask($rootScope.curScanDetailTaskID);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    showScanDetail();
                    $rootScope.startScanDetailTimer();
                }else{
                    util.showLayerAlert($scope.msg.startTaskFail, util.iconID.FAIL);
                }
            });
        };

        /**
         * 停止任务
         */
        $scope.stopTask = function(){
            var promise = service.stop($rootScope.curScanDetailTaskID);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $rootScope.stopScanDetailTimer();
                    showScanDetail();
                }else{
                    util.showLayerAlert($scope.msg.stopTaskFail, util.iconID.FAIL);
                }
            });
        };

        var intervalID= ""; //扫描详情定时器ID
        var radialPercent = null; //任务进度
        var radialObj = [];   //漏洞统计
        var radialConfig = [{color:'#FF0000', radius:50},{color:'#FF3689', radius:40},{color:'#FF8444', radius:40},{color:'#FFED32', radius:40},{color:'#5FFF95', radius:40}];  //漏洞圆环配置
        var count = {}; //漏洞数字计数
        var init = function(){
            $scope.summary = {};    //任务概览
            $scope.detailLists = []; //扫描结果

            //初始化扫描百分比圆环
            radialPercent = $("#radial-scan-percent").radialIndicator({
                barColor: '#000000',
                barWidth: 15,
                radius:70,
                initValue: 0,
                roundCorner : true,
                percentage: true
            }).data('radialIndicator');

            //初始化漏洞统计圆环
            $.each($(".indicatorContainer"), function(index){
                //设置圆环
                radialObj[index] =$($(".indicatorContainer")[index]).radialIndicator({
                    barColor : radialConfig[index].color,
                    radius:radialConfig[index].radius,
                    barWidth : 10,
                    initValue : 0,
                    percentage: false,
                    displayNumber: false
                }).data('radialIndicator');
                radialObj[index].animate(0);
            });

            //初始化数字动画
            count = {     //数字动画
                option:{useEasing:true, useGrouping:true, separator:',', decimal:'.',prefix:'',suffix:''},
                totalNum:0,highNum:0,mediumNum:0,lowNum:0,recordNum:0
            };
        };

        /**
         * 设置扫描详情定时器
         */
        var setTaskTimer = function(second){
            intervalID && clearInterval(intervalID);
            if(second != 0){
                intervalID = setInterval(function(){
                    showScanDetail();
                }, second*1000);
            }
        };

        /**
         * 事件注册
         */
        var event = function(){
            $("a[href='#tab-scanDetail']").on('shown.bs.tab', function(e){
                $rootScope.stopScanTimer(); //停止任务浏览定时器
                $rootScope.startScanDetailTimer();  //启动扫描详情定时器

                showScanDetail();   //显示扫描详情
            });
        };

        /**
         * 显示扫描任务详情内容
         * */
        var showScanDetail = function(){
            if($rootScope.curScanDetailTaskID == ''){
                $rootScope.curScanDetailTaskID = $rootScope.firstTaskID;    //default:get first taskID
            }
            updateScanning($rootScope.curScanDetailTaskID);
        };

        /**
         * 更新扫描动画效果
         * */
        var controlAnimation = function(taskStatus){
            if(taskStatus == "Running"){
                $("#radial-scan-percent canvas").addClass('animated rotateIn'); //任务进度圆环动画
                $("#mirror-device").addClass('animated shake').css('display','block');
                $("#industry-device").css('display','block');
                $("#scan-description #task-status").html();
            }else{ //Done, Stopped, New
                $("#radial-scan-percent canvas").removeClass('animated rotateIn');
                $("#mirror-device").removeClass('animated shake').css('display','none');
                $("#industry-device").css('display','none');
            }
        };

        /**
         * 更新任务状态
         */
        var updateTaskStatus = function(obj){
            $scope.summary = obj;

            //更新扫描进度百分比
            var percent = obj.task_progress;
            radialPercent.animate(percent);

            //更新扫描动画
            var taskStatus = obj.task_status;
            controlAnimation(taskStatus);
        };

        /**
         * 更新漏洞统计圆环
         */
        var updateLeakStatistics = function(obj){
            var totalLeak = obj.high + obj.low +obj.medium+obj.record;
            //动画
            //更新漏总共洞个数
            new CountUp("radial-leak-num-total", count.totalNum, totalLeak, 0, 10, count.option).start(); //计数动画
            radialObj[0].animate(100); //百分比
            count.totalNum = totalLeak;    //保存当前值

            //更新高危漏洞
            new CountUp("radial-leak-num-high", count.highNum, obj.high, 0, 10, count.option).start();
            radialObj[1].animate(obj.high/totalLeak *100);
            count.highNum = obj.high;

            //更新中危漏洞
            new CountUp("radial-leak-num-medium", count.mediumNum, obj.medium, 0, 10, count.option).start();
            radialObj[2].animate(obj.medium/totalLeak *100);
            count.mediumNum = obj.medium;

            //更新低危漏洞
            new CountUp("radial-leak-num-low", count.lowNum, obj.low, 0, 10, count.option).start();
            radialObj[3].animate(obj.low/totalLeak *100);
            count.lowNum = obj.low;

            //更新记录
            new CountUp("radial-leak-num-record", count.recordNum, obj.record, 0, 10, count.option).start();
            radialObj[4].animate(obj.record/totalLeak *100);
            count.recordNum = obj.record;
        };

        /**
         * 更新漏洞列表
         */
        var updateLeakList = function(obj){
            $scope.detailLists = _.values(obj);
        };

        /**
         * 更新扫描任务详情内容
         * */
        var updateScanning = function(id){
            var promise = service.getScanReportStatus(id);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    var obj1 = obj.data.value.summary;  //任务描述，扫描状态
                    updateTaskStatus(obj1);

                    var obj2 = obj.data.value.number;   //漏洞统计
                    updateLeakStatistics(obj2);

                    var obj3 = obj.data.value.details;  //漏洞统计列表
                    updateLeakList(obj3);
                }else{
                    util.consoleError(obj.data.value);
                }
            });
        };

        //Entrance
        init();
        event();
        //showScanDetail();
    }

    /**
     * 扫描管理-父类控制器
     */
    function parentController($rootScope, $scope, util, service){
        var init = function(){
            $rootScope.taskMenuType = getTaskMenuType();
            $rootScope.navIcon = getNavIconClass();
        };

        /**
         *获取任务管理子菜单类型 ['自定义扫描','弱密码扫描'，'端口扫描','任务扫描']
         */
        var getTaskMenuType = function(){
            var str = location.search;  //  /scan/task?password
            return str == "" ? 'custom' : str.split("?")[1]
        };

        /**
         *获取任务管理子菜单小图标类
         */
        var getNavIconClass = function(){
            var navIcons = {'custom':'icon-globe-alt', 'password':'icon-shuffle', 'port':'icon-lock', 'fast':'icon-size-actual'};
            return navIcons[$rootScope.taskMenuType];
        };

        //
        init();
    }

    //main
    app.controller('parentCtrl', ['$rootScope','$scope', 'util', 'service', parentController]);
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("scanCtrl", ['$rootScope', '$scope', 'util', 'service', scanController]);
    app.controller("scanDetailCtrl", ['$rootScope', '$scope', 'util', 'service', scanDetailController]);
})();
