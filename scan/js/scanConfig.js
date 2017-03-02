(function(){
    /**
     * 扫描配置控制器
     */
    function scanConfigController($rootScope, $scope, util,  service){
        /**
         * 删除
         */
        $scope.deleteScanConfig = function(id){deleteScanConfig(id);};

        /**
         * 点击模态框OK button
         */
        $scope.clickModalOk = function(modalType, id){submit(modalType, id);};

        var init = function(){
            /*扫描配置列表*/
            $scope.scanConfigList = {'total':0, lists:[]};
            util.showTab('#myTab li a:first');
        };

        var show = function(){
            showScanConfig(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 显示扫描配置列表
         */
        var showScanConfig = function(begin, end, curPage){
            service.getAllConfig(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.scanConfigList, curPage:curPage, cbFunc:showScanConfig});
            });
        };

        /**
         * 删除扫描配置列表 By id
         */
        var deleteScanConfig = function(id){
            util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
                service.deleteScanConfig(id).then(function(obj){
                    util.delete({in:obj, msg_success:$scope.msg.deleteSCSuccess, msg_fail:$scope.msg.deleteSCFail, cbFunc:show});
                });
            });
        };

        /**
         * 新建扫描配置
         */
        var createScanConfig = function(){
            var serializeData = $("#modal-new-scanConfig form").serialize();
            service.createScanConfig({}, serializeData).then(function(obj){
                util.create({in:obj, msg_success:$scope.msg.createSCSuccess, msg_fail:$scope.msg.createSCFail, cbFunc:show});
            });
        };

        /**
         * 编辑扫描配置列表-漏洞类型
         */
        var editScanConfig = function(id){
            var param = {};
            $.each($("#modal-table-leak-wrapper table tbody tr"), function(index, node){
                var key = $(node).find(".name").html();
                var value='';
                var checkboxNode = $(node).find(":checkbox");
                if(checkboxNode.length == 0){   //input[type=text]
                    value = $(node).find("input[type='text']").val();
                }else{  //input[type=checkbox]
                    if($(node).find("input[name='preference']").length == 0)
                        value = ($(node).find(":checkbox").attr("checked") == "checked") == true ? 1 : 0;
                    else
                        value = ($(node).find(":checkbox").attr("checked") == "checked") == true ? 'yes' : 'no';
                }

                param[key] = value;
            });

            param['config_name'] = $("#config_name").val();
            param['config_comment'] = $("#config_comment").val();

            var params = {id:id, value:angular.toJson(param)};
            var serializeData= '';
            service.editScanConfig(params, serializeData).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editSCSuccess, msg_fail:$scope.msg.editSCFail, cbFunc:show});
            });
        };

        /**
         * 编辑扫描配置列表-漏洞测试
         */
        var editScanConfigByLeakTest = function(id){
            var param = {};
            var name = $("#scanConfig-leakType").val();
            $.each($("#modal-table-leakTest table tbody tr"), function(index, node){
                var oid = $(node).find("#family-oid").html();
                var checkedValue = ($(node).find(":checkbox").attr("checked") == "checked") == true ? 1 : 0;
                param.familyname = name;
                param[oid] = checkedValue;
            });

            var params = {id:id, value:angular.toJson(param)};
            service.editScanConfigByLeakTest(params).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editLeakTestSuccess, msg_fail:$scope.msg.editLeakTestFail, cbFunc:show});
            });
        };

        /**
         * 提交新建、编辑扫描配置
         */
        var submit = function(modalType, id){
            if(modalType == "new"){
                util.checkModalSubmit("#modal-new-scanConfig form", createScanConfig);
            }else if(modalType == "editLeakType"){
                util.checkModalSubmit("#modal-edit-scanConfig-leakType form", editScanConfig, id);
            }else if(modalType == "editLeakTest"){
                util.checkModalSubmit("#modal-edit-scanConfig-leakTest form", editScanConfigByLeakTest, id);
            }
        };

        //entrance
        init();
        show();
    }

    /**
     * 扫描配置详情控制器
     */
    function configDetailController($scope, util,  service, $routeParams){
        var init = function(){
            /*扫描配置列表*/
            $scope.configDetail = {};
        };

        var showConfigDetail = function(id){
            var promise = service.getConfigDetail(id);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.configDetail = obj.data.value[0];
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
            });
        };

        init();
        showConfigDetail($routeParams.id);
    }

    /**
     * 扫描配置漏洞详情控制器
     */
    function leakDetailController($scope, util,  service, $routeParams){
        var init = function(){
            /*扫描配置漏洞详情*/
            $scope.leakDetail = {familyName:'', value:''};
        };

        var showLeakDetail = function(id, familyName){
            var promise = service.getLeakDetail(id, familyName);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.leakDetail.value = obj.data.value;
                    $scope.leakDetail.familyName = familyName;
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
            });
        };

        init();
        showLeakDetail($routeParams.id, $routeParams.familyName);
    }

    /**
     * 扫描配置测试用例详情控制器
     */
    function testCaseDetailController($scope, util,  service, $routeParams){
        var init = function(){
            /*扫描配置测试用例*/
            $scope.testDetail = {};
        };

        var showTestDetail = function(oid,familyName){
            var promise = service.getTestCaseDetail(oid);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    obj.data.value[0].family_name = familyName;
                    $scope.testDetail = obj.data.value[0];
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
            });
        };

        init();
        showTestDetail($routeParams.oid, $routeParams.familyName);
    }

    //main
    angular.module('mainApp').requires.push('ngRoute', 'angularFileUpload'); //给mainApp注入路由和文件上传模块
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("scanConfigCtrl", ['$rootScope', '$scope', 'util', 'service', scanConfigController]); //扫描配置控制器
    app.controller("configDetailCtrl", [ '$scope', 'util', 'service', '$routeParams', configDetailController]); //扫描配置详情控制器
    app.controller("leakDetailCtrl", ['$scope', 'util', 'service', '$routeParams', leakDetailController]); //漏洞详情控制器
    app.controller("testCaseDetailCtrl", ['$scope', 'util', 'service', '$routeParams', testCaseDetailController]); //测试用例控制器

    //配置路由
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when("/scanConfig",{             //when(path,route)
            controller:'scanConfigCtrl',
            templateUrl:'/template/route/sc_list.html'
        }).when("/scanStrategy/:id",{
            controller:'configDetailCtrl',
            templateUrl:'/template/route/sc_detail.html'
        }).when("/leak/:id/:familyName",{
            controller:'leakDetailCtrl',
            templateUrl:'/template/route/sc_leakDetail.html'
        }).when("/testCase/:oid/:familyName",{
            controller:'testCaseDetailCtrl',
            templateUrl:'/template/route/sc_testDetail.html'
        }).when('/tab-dict',{
            //do nothing
        }).otherwise({
            redirectTo:'/scanConfig'
        });
    }]);
})();