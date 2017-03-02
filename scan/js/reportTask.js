(function(){
    /**
     * ng-view 顶层控制器
     */
    function parentController($rootScope, $scope, util,  service, $routeParams){

        var showListFunc = '';  //获取数据函数接口
        var list = '';          //外部列表数据
        var bShowPage = true;    //默认显示翻页控件

        $scope.gReportType = 'list';    //当前报表类型[list, result, result-leak, overview]
        $scope.gFilterParam = undefined; //过滤参数,默认不过滤,传参数和控制过滤checkbox状态
        $scope.filterObj = {'action':'search', 'containIP':'','unContainIP':'', 'name':'','cve':'', 'threats':{'high':'1', 'medium':'1', 'low':'1', 'record':'1'}};    //过滤参数ng-model对象

        var init = function(){};

        /**
         * 初始化变量
         */
        $scope.init = function(obj){
            util.showTab(obj.selector);
            showListFunc = obj.func;
            list = obj.list;

            /*获取当前报表类型*/
            if(location.href.match('tab-leakResult')){
                $scope.gReportType = 'result-leak';
            }else if(location.href.match('tab-overview-host')){
                $scope.gReportType = 'overview-host';
            }else if(location.href.match('tab-overview-leak')){
                $scope.gReportType = 'overview-leak';
            }else if(location.href.match('taskReport')){
                $scope.gReportType = 'list';
            }else if(location.href.match('tab-overview')){
                $scope.gReportType = 'overview';
            }else{
                $scope.gReportType = 'result';
            }
        };

        /**
         * 显示列表内容
         */
        $scope.show = function(){
            showList(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 标签折叠
         */
        $scope.collapseMenu = function(selector){
            $(".collapse").collapse('hide');    //hide all collapse
            $(selector).collapse('toggle');
        };

        var showList = function(begin, end, curPage){
            //showListFunc.call({requestURL:''}, $rootScope.reportID,begin, end, $scope.gFilterParam); 解决 this.requestURL 为 undefined
            showListFunc($rootScope.reportID,begin, end, $scope.gFilterParam).then(function(obj){
                util.showList({in:obj, out:list, curPage:curPage, cbFunc:showList});
            });
        };

        /**
         * 确定过滤
         */
        $scope.confirmFilter = function(){
            var tmpObj = {};
            //解决angular checkbox ng-model不能绑定的问题
            angular.forEach(['high', 'medium', 'low', 'record'], function(e, i){
                var selector = "input[name='"+String.prototype.concat.call('threats.', e)+"']";
                $scope.filterObj.threats[e] = $(selector).attr('checked') ? '1' : '0';
            });

            angular.extend(tmpObj, $scope.filterObj);
            tmpObj.threats = angular.toJson(tmpObj.threats);
            $scope.gFilterParam = $.param(tmpObj);

            util.popupModal(".modal", false);

            //便于后台生成报表
            location.href.match('tab-overview')? service.getAllReportViewData($scope.gFilterParam) : angular.noop;

            //refresh Tab
            util.refreshTab();
        };

        /**
         * 还原过滤
         */
        $scope.restoreFilter = function(){
            $scope.gFilterParam = undefined;
            util.popupModal(".modal", false);

            //便于后台生成报表
            location.href.match('tab-overview')? service.getAllReportViewData($scope.gFilterParam) : angular.noop;

            //refresh Tab
            util.refreshTab();
        };

        /**
         * 取消过滤
         */
        $scope.cancelFilter = function() {
            util.popupModal(".modal", false);
        };

        /**
         * 进入报表结果列表
         */
        $scope.forwardReportResult = function(reportID){
            service.getAllReportData(reportID); //方便后台获取全部报表结果数据
            util.locationUrl("#tab-leakResult/"+reportID);
        };

        /**
         * 进入报表预览
         */
        $scope.forwardReportOverview = function(){
            service.getAllReportViewData(); //方便后台获取全部报表预览数据

            $scope.gFilterParam = undefined;
            util.locationUrl("#tab-overview-task");
        };

        /**
         * 返回报表结果
         */
        $scope.backReportResult = function(){
            $scope.gFilterParam = undefined;
            util.locationUrl("#tab-leakResult");
        };

        //entrance
        init();
    }

    /**
     * 任务报告控制器
     */
    function taskReportController($rootScope, $scope, util,  service, $routeParams){
        /**
         * 删除任务报告
         */
        $scope.deleteTaskReport = function(id){deleteTaskReport(id)};

        /**
         * 初始化
         */
        var init = function(){
            /*任务报告列表*/

            $scope.taskReportList = $scope.DEBUG ? {'total':1, lists:[ {
                "report_id" : "34ae152d-7f19-45c4-88a0-cec65a2232e9",
                "scan_start_time" : "2016-07-12 05:55:03",
                "scan_run_status" : "Done",
                "task_name" : "ds",
                "task_comment" : "dsd",
                "task_id" : "c838da9d-0ae2-46a4-b4c3-3029daf8ebc2",
                "task_progress" : "100",
                "high" : "0",
                "medium" : "2",
                "low" : "0",
                "record" : "19",
                "severity" : null
            } ]} :  {'total':0, lists:[ ]} ;
        };

        /**
         * 显示
         */
        var show = function(){
            if(angular.isDefined($routeParams.taskID)){
                showTaskReportByID(pagination.begin, pagination.end, pagination.curPage)
            }else{
                showTaskReport(pagination.begin, pagination.end, pagination.curPage);
            }
        };

        /**
         * 显示任务报告列表
         */
        var showTaskReport = function(begin, end, curPage){
            service.getAllTaskReport(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.taskReportList, curPage:curPage, cbFunc:showTaskReport});
            });
        };

        /**
         * 显示任务报告列表通过指定任务ID和报告类型
         */
        var showTaskReportByID = function(begin, end, curPage){
            var id = $routeParams.taskID;
            var type = $routeParams.reportType;

            service.getReportByTaskID(id, begin, end, type).then(function(obj){
                util.showList({in:obj, out:$scope.taskReportList, curPage:curPage, cbFunc:showTaskReportByID});
            });
        };

        /**
         * 删除任务报告
         */
        var deleteTaskReport = function(id){
            util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
                service.deleteTaskReport(id).then(function(obj){
                    util.delete({in:obj, msg_success:$scope.msg.deleteReportSuccess, msg_fail:$scope.msg.deleteReportFail, cbFunc:show});
                })
            });
        };

        //entrance
        init();
        show();
    }

    /**
     * 漏洞控制器
     */
    function leakController($rootScope, $scope, util,  service, $routeParams){
        if(angular.isDefined($routeParams.reportID)) {
            $rootScope.reportID = $routeParams.reportID; //保存全局报告ID 第一次进入
        }

        $scope.leakList = {'total':'', 'lists':[]};
        $scope.init({'list':$scope.leakList, 'func':service.getAllLeak,'selector':"a[href='#tab-leakResult']"});
        $scope.show();
    }

    /**
     * 主机控制器
     */
    function hostController($rootScope, $scope, util,  service){
        $scope.hostList = {'total':'', 'lists':[]};
        $scope.init({'list':$scope.hostList, 'func':service.getAllHost,'selector':"a[href='#tab-hostResult']"});
        $scope.show();
    }

    /**
     * 用户控制器
     */
    function userController($rootScope, $scope, util,  service){
        $scope.userList = {'total':'', 'lists':[]};
        $scope.init({'list':$scope.userList, 'func':service.getAllUser,'selector':"a[href='#tab-userResult']"});
        $scope.show();
    }

    /**
     * 端口服务控制器
     */
    function portServiceController($rootScope, $scope, util,  service){
        $scope.portList = {'total':'', 'lists':[]};
        $scope.init({'list':$scope.portList, 'func':service.getAllPort,'selector':"a[href='#tab-portServiceResult']"});
        $scope.show();
    }

    /**
     * 任务信息控制器
     */
    function taskOverviewController($rootScope, $scope, util,  service){
        var init = function(){
            $scope.gReportType = 'overview-task';
            $scope.taskInfo = {'name':'task1', 'comment':'first task', 'scan_start':'17:50','scan_end':'18:50',
            'scan_time':'00:00:00', 'target_name':'cetc', 'hosts_ordering':'顺序', 'config_name':'default', 'status':'new',
                'max_hosts':'10', 'max_checks':'10'
            };
            $scope.targetInfo = {'name':'target1', 'target_name':'8.8.8.8','exclude_hosts':'127.0.0.1',
                'port_list':'all Tcp', 'smb_lsc_credential_name':'smb-1','ssh_lsc_credential_name':'ssh-1'};
            util.showTab("a[href='#tab-overview-task']");
        };

        var show = function(){
            showTaskInfo(1, -1);
            showTargetInfo(1,-1);
        };

        var showTaskInfo = function(begin, end){
            service.getTaskInfo($rootScope.reportID,begin, end).then(function(obj){
                obj.data.status == 0 ? ($scope.taskInfo = obj.data.value[0]) : util.showLayerAlert(obj.data.value, util.iconID.FAIL)
            });
        };

        var showTargetInfo = function(begin, end){
            service.getTargetInfo($rootScope.reportID,begin, end).then(function(obj){
                obj.data.status == 0 ? ($scope.targetInfo = obj.data.value[0]) : util.showLayerAlert(obj.data.value, util.iconID.FAIL)
            });
        };
        //
        init();
        show();
    }

    /**
     * 主机列表预览控制器
     */
    function hostOverviewController($rootScope, $scope, util, chart, service){
        $scope.bSwitchHost = false; //切换
        $scope.hostOverviewList = {'total':'', 'lists':[]};

        //show list
        $scope.init({'list':$scope.hostOverviewList, 'func':service.getHostInfo,'selector':"a[href='#tab-overview-host']"});
        $scope.show();

        //show chart
        var option = $scope.DEBUG ? {'title':$scope.msg.hostRD,'legendData':[$scope.msg.hostChart['highPercent'], $scope.msg.hostChart['mediumPercent'] ,
            $scope.msg.hostChart['lowPercent'], $scope.msg.hostChart['recordPercent']], 'seriesData':[
            {value:335, name:$scope.msg.hostChart['highPercent']},
            {value:310, name:$scope.msg.hostChart['mediumPercent']},
            {value:234, name:$scope.msg.hostChart['lowPercent']},
            {value:135, name:$scope.msg.hostChart['recordPercent']}
        ]} : {'title':$scope.msg.hostRD,'legendData':[], 'seriesData':[]};

        var getHostDistribute = function(begin, end){
            var promise = service.getHostDistribute($rootScope.reportID);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    angular.forEach(obj.data.value, function(value, key){
                        option.legendData.push($scope.msg.hostChart[key]);
                        option.seriesData.push({value:value, name:$scope.msg.hostChart[key]});
                    });
                    chart.pie.init('host-chart');
                    chart.pie.show(option);
                }else{
                    util.consoleError(obj.data.value);
                }
            });
        };

        getHostDistribute(1, -1);
    }

    /**
     * 漏洞列表预览控制器
     */
    function leakOverviewController($rootScope, $scope, util, chart, service){
        $scope.bSwitchLeak = false; //切换

        /*获取漏洞列表*/
        $scope.leakOverviewList = {'total':'', 'lists':[]};
        $scope.init({'list':$scope.leakOverviewList, 'func':service.getLeakInfo,'selector':"a[href='#tab-overview-leak']"});
        $scope.show();

        /*获取漏洞折叠面板内容*/
        $scope.leakCollapse = $scope.DEBUG ? {'leakRiskDistribute':[{'threat':'High', 'result_count':'2', 'percent':'25%'},{'threat':'Medium', 'result_count':'2', 'percent':'25%'},
            {'threat':'Low', 'result_count':'2', 'percent':'25%'},{'threat':'Record', 'result_count':'2', 'percent':'25%'}],
            'leakHostDistribute':[{'ip':'8.7.8.5', 'high_count':'2'}, {'ip':'8.7.8.7', 'high_count':'4'}],
            'leakTop10':[{'name':'http', 'threat':'High','type':'tcp', 'host_count':1, 'cve':'22', 'exist_hosts':'8.7.52.1'}],
            'osHostDistribute':[{'os':'linux', 'host_count':'2',percent:'100%'},{'os':'windows', 'host_count':'2',percent:'100%'}],
            osLeakDistribute:[{'os':'linux', 'result_count':'2',percent:'100%'},{'os':'windows', 'result_count':'2',percent:'100%'}]}
             : {'leakRiskDistribute':[], 'leakHostDistribute':[], 'leakTop10':[], 'osHostDistribute':[], osLeakDistribute:[]};

        //获取漏洞Ｔop10
        var showTop10 = function(){
            service.getLeakTop10().then(function(obj){
                if(obj.data.status == 0){
                    $scope.leakCollapse.leakTop10 = obj.data.value;
                }
            });
        };

        //漏洞风险分布
        var showLeakRD = function(){
            var promise = service.getLeakRiskDistribute();
            promise.then(function(obj){
                if(obj.data.status == 0){
                    /*show list*/
                    $scope.leakCollapse.leakRiskDistribute = obj.data.value;

                    /*show chart*/
                     var option ={'title':$scope.msg.leakRD ,'legendData':[], 'seriesData':[]};
                     angular.forEach(obj.data.value, function(value, key){
                         option.legendData.push($scope.msg.threatArray[value.threat]);
                         option.seriesData.push({'value':value.result_count, 'name':$scope.msg.threatArray[value.threat]});
                     });

                    chart.pie.init('leakRD-pie');
                    chart.pie.show(option);
                }

            });
        };

        //高危漏洞主机分布
        var showLeakHD = function(){
            var promise = service.getLeakHostDistribute();
            promise.then(function(obj){
                if(obj.data.status == 0){
                    /*show list*/
                    $scope.leakCollapse.leakHostDistribute = obj.data.value;

                    /*show bar*/
                    var option ={'title':$scope.msg.highRiskHD,'xAxisData':[], 'seriesData':[]};
                    angular.forEach(obj.data.value, function(value, key){
                        option.xAxisData.push(value.ip);
                        option.seriesData.push({'value':value.high_count, 'name':value.ip});
                    });

                    /*
                     var option = $scope.DEBUG ? {'title':'','xAxisData':['8.7.8.5', '8.7.8.7'], 'seriesData':[
                     20,30]} : {'title':'','xAxisData':[], 'seriesData':[]};
                    /*/

                    chart.bar.init('leakHD-bar');
                    chart.bar.show(option);
                }
            });
        };

        var showOSHD = function(){
            var promise = service.getOSHostDistribute();
            promise.then(function(obj){
                if(obj.data.status == 0){
                    /*show list*/
                    $scope.leakCollapse.osHostDistribute = obj.data.value;

                    var option = $scope.DEBUG ? {'title':$scope.msg.osHD,'legendData':['linux','windows'], 'seriesData':[{'value':2, 'name':'linux'},{'value':2, 'name':'windows'}]}
                        : {'title':$scope.msg.osHD, 'legendData':[], 'seriesData':[]};

                    angular.forEach(obj.data.value, function(value, key){
                        option.legendData.push(value.os);
                        option.seriesData.push({'value':value.host_count, 'name':value.os});
                    });

                    chart.pie.init('osHD-pie');
                    chart.pie.show(option);
                }
            });
        };

        var showOSLD = function(){
            var promise = service.getOSLeakDistribute();
            promise.then(function(obj){
                if(obj.data.status == 0){
                    /*show list*/
                    $scope.leakCollapse.osLeakDistribute = obj.data.value;

                    var option = $scope.DEBUG ? {'title':$scope.msg.osLD,'xAxisData':['linux', 'windows'], 'seriesData':[
                        2,2]} : {'title':$scope.msg.osLD,'xAxisData':[], 'seriesData':[]};

                    angular.forEach(obj.data.value, function(value, key){
                        option.xAxisData.push(value.os);
                        option.seriesData.push({'value':value.result_count, 'name':value.os});
                    });

                    chart.bar.init('osLD-bar');
                    chart.bar.show(option);
                }
            });
        };

        var showCollapse = function(){
            showTop10();
            showLeakRD();
            showLeakHD();
            showOSHD();
            showOSLD();
        };

        showCollapse();
    }

    /**
     * 端口服务列表预览控制器
     */
    function portOverviewController($rootScope, $scope, util, chart, service){
        $scope.bSwitchPort = false;
        $scope.portOverviewList = {'total':'', 'lists':[]};

        //show list
        $scope.init({'list':$scope.portOverviewList, 'func':service.getPortInfo,'selector':"a[href='#tab-overview-port']"});
        $scope.show();

        //show barChart
        var option = $scope.DEBUG ? {'title':$scope.msg.portServiceTop,'xAxisData':[1,2], 'seriesData':[
            20,30]} : {'title':$scope.msg.portServiceTop,'xAxisData':[], 'seriesData':[]};

        var getPortInfoTop10 = function(){
            var promise = service.getPortInfoTop10($rootScope.reportID);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    angular.forEach(obj.data.value, function(value, key){
                        option.xAxisData.push(value['name']);
                        option.seriesData.push(value['host_count']);
                    });
                    chart.bar.init("port-chart");
                    chart.bar.show(option);
                }else{
                    util.consoleError(obj.data.value);
                }
            });
        };

        getPortInfoTop10();
    }

    /**
     * 账号列表预览控制器
     */
    function userOverviewController($rootScope, $scope, util,  service){
        $scope.userOverviewList = {'total':'', 'lists':[]};
        $scope.init({'list':$scope.userOverviewList, 'func':service.getUserInfo,'selector':"a[href='#tab-overview-user']"});
        $scope.show();
    }

    /**
     * 参考信息概览
     */
    function referenceOverviewController($rootScope, $scope, util,  service){
        $scope.gReportType = 'overview-task';

        $scope.referenceList = {'total':'', 'lists':{
            'leak':[{'level':'高危', 'area':'7.0 <= 漏洞风险值 <= 10.0', 'class':'danger',
                'description':'攻击者可以远程执行任意命令代码，或进行远程拒绝服务攻击', 'suggest':'需要紧急修补或安全加固'},
                {'level':'中危', 'area':'4.0 <= 漏洞风险值 < 7.0', 'class':'warning',
                    'description':'攻击者可以远程创建、修改、删除文件或数据，或对普通服务进行拒绝服务攻击', 'suggest':'建议修补或采取措施规避'},
                {'level':'低危', 'area':'0.0 <= 漏洞风险值 < 5.0', 'class':'info',
                    'description':'攻击者可以远程执行任意命令代码，或进行远程拒绝服务攻击', 'suggest':'推荐适当采取规避措施'},
                {'level':'记录', 'area':'漏洞风险值 = 0.0', 'class':'success',
                    'description':'为系统扫描信息类显示结果', 'suggest':'可以不处理'}],
            'host':[{'level':'非常危险', 'area':'7.0 <= 主机风险值 <= 10.0', 'class':'danger'},
                    {'level':'比较危险', 'area':'5.0 <= 主机风险值 < 7.0', 'class':'warning'},
                    {'level':'比较安全', 'area':'2.0 <= 主机风险值 < 5.0', 'class':'info'},
                    {'level':'非常安全', 'area':'0.0 <= 主机风险值 < 2.0', 'class':'success'}],
            'network':[{'level':'非常危险', 'area':'8.0 <= 网络风险值 <= 10.0','class':'danger'},
                        {'level':'比较危险', 'area':'5.0 <= 网络风险值 < 8.0', 'class':'warning'},
                        {'level':'比较安全', 'area':'1.0 <= 网络风险值 < 5.0', 'class':'info'},
                        {'level':'非常安全', 'area':'0.0 <= 网络风险值 < 1.0', 'class':'success'}],
            'scores':['可远程获取OS、应用版本信息',
                        '开放了不必要或危险的服务，可远程获取系统敏感信息',
                        '可远程进行受限的文件、数据读取',
                        '可远程进行重要或不受限文件、数据读取',
                        '可远程进行受限文件、数据修改',
                        '可远程进行受限重要文件、数据修改',
                        '可远程进行不受限的重要文件、数据修改，或对普通服务进行拒绝服务攻击',
                        '可远程以普通用户身份执行命令或进行系统、网络级的拒绝服务攻击',
                        '可远程以管理用户身份执行命令（受限、不太容易利用）',
                        '可远程以管理用户身份执行命令（不受限、容易利用）']
        }};
    }

    //main
    angular.module('mainApp').requires.push('ngRoute'); //给mainApp注入路由

    /*报表列表*/
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("taskReportCtrl", ['$rootScope', '$scope', 'util', 'service','$routeParams', taskReportController]);

    /*父控制器*/
    app.controller("parentCtrl", ['$rootScope', '$scope', 'util', 'service', '$routeParams', parentController]);

    /*报表结果*/
    app.controller("leakCtrl", ['$rootScope', '$scope', 'util', 'service', '$routeParams', leakController]);
    app.controller("hostCtrl", ['$rootScope', '$scope', 'util', 'service', hostController]);
    app.controller("userCtrl", ['$rootScope', '$scope', 'util', 'service', userController]);
    app.controller("portServiceCtrl", ['$rootScope', '$scope', 'util', 'service', portServiceController]);

    /*报表预览*/
    app.controller("taskOverviewCtrl", ['$rootScope', '$scope', 'util', 'service', taskOverviewController]);
    app.controller("hostOverviewCtrl", ['$rootScope', '$scope', 'util', 'chart','service', hostOverviewController]);
    app.controller("leakOverviewCtrl", ['$rootScope', '$scope', 'util','chart', 'service', leakOverviewController]);
    app.controller("portOverviewCtrl", ['$rootScope', '$scope', 'util', 'chart', 'service', portOverviewController]);
    app.controller("userOverviewCtrl", ['$rootScope', '$scope', 'util', 'service', userOverviewController]);
    app.controller("referenceOverviewCtrl", ['$rootScope', '$scope', 'util', 'service', referenceOverviewController]);

    //配置路由
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when("/taskReport",{                 //when(path,route)
            controller:'taskReportCtrl',
            templateUrl:'/template/route/report_list.html'
        }).when("/taskReport/:taskID/:reportType",{
            controller:'taskReportCtrl',
            templateUrl:'/template/route/report_list.html'
        }).when("/tab-leakResult",{                     //报表结果
            controller:'leakCtrl',
            templateUrl:'/template/route/report_result.html'
        }).when("/tab-leakResult/:reportID",{
            controller:'leakCtrl',
            templateUrl:'/template/route/report_result.html'
        }).when("/tab-hostResult", {
            controller:'hostCtrl',
            templateUrl:'/template/route/report_result.html'
        }).when('/tab-userResult', {
            controller:'userCtrl',
            templateUrl:'/template/route/report_result.html'
        }).when('/tab-portServiceResult', {
            controller:'portServiceCtrl',
            templateUrl:'/template/route/report_result.html'
        }).when('/tab-overview-task', {                 //报表预览
            controller:'taskOverviewCtrl',
            templateUrl:'/template/route/report_overview.html'
        }).when('/tab-overview-host', {
            controller:'hostOverviewCtrl',
            templateUrl:'/template/route/report_overview.html'
        }).when('/tab-overview-leak', {
            controller:'leakOverviewCtrl',
            templateUrl:'/template/route/report_overview.html'
        }).when('/tab-overview-port', {
            controller:'portOverviewCtrl',
            templateUrl:'/template/route/report_overview.html'
        }).when('/tab-overview-user', {
            controller:'userOverviewCtrl',
            templateUrl:'/template/route/report_overview.html'
        }).when('/tab-overview-reference', {
            controller:'referenceOverviewCtrl',
            templateUrl:'/template/route/report_overview.html'
        }).otherwise({
            redirectTo:'/taskReport'
        });
    }]);
})();
