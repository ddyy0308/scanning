(function(){
    function portListController($rootScope, $scope, util,  service){
        /**
         * 删除端口列表
         */
        $scope.deletePortList = function(id){deletePortList(id);};

        /**
         * 点击模态框OK button
         */
        $scope.clickModalOk = function(modalType, id){submit(modalType, id);};

        /**
         * 创建端口范围
         */
        $scope.createPortRange = function(portListID){createPortRange(portListID);};

        /**
         * 删除端口范围
         */
        $scope.deletePortRange = function(portRangeID, index){deletePortRange(portRangeID, index);};

        /**
         * 初始化
         */
        var init = function(){
            /*端口列表*/
            $scope.portList = {'total':0, lists:[]};
        };

        /**
         * 显示
         */
        var show = function(){
            showPortList(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 显示端口列表列表
         */
        var showPortList = function(begin, end, curPage){
            service.getAllPortList(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.portList, curPage:curPage, cbFunc:showPortList});
            });
        };

        /**
         * 提交新建、编辑端口列表表单
         */
        var submit = function(modalType, id){
            if(modalType == "new"){
                util.checkModalSubmit("#modal-new-portList form", createPortList);
            }else if(modalType == "edit"){
                util.checkModalSubmit("#modal-edit-portList form", editPortList, id);
            }
        };

        /**
         * 创建端口列表
         */
        var createPortList = function(){
            var serializeData = $("#modal-new-portList form").serialize();
            service.createPortList({}, serializeData).then(function(obj){
                util.create({in:obj, msg_success:$scope.msg.createPortListSuccess, msg_fail:$scope.msg.createPortListFail, cbFunc:show});
            });
        };

        /**
         * 获取端口列表
         */
        var updatePortRange = function(portListID){
            service.getPortList(portListID).then(function(obj){
                if(obj.data.status == 0){
                    var data = obj.data.value[0];
                    $rootScope.curPortlist.port_range = angular.copy(data.port_range);   //更新端口范围数据
                }
            });
        };

        /**
         * 创建端口范围
         */
        var createPortRange = function(portListID){
            var selector = "#modal-edit-portList form";
            util.validateInit(selector);
            if(util.validateForm(selector)){
                var serializeData = angular.element.param($rootScope.formPortRangeData);
                var promise = service.createPortRange(portListID, serializeData);
                promise.then(function(obj){
                    if(obj.data.status == 0){
                        util.showLayerAlert($scope.msg.createPortRangeSuccess, util.iconID.SUCCESS);
                        updatePortRange(portListID);
                        //$rootScope.curPortlist.port_range.splice(0, 0, angular.copy($rootScope.formPortRangeData)); //添加新增节点到首部
                    }else{
                        util.showLayerAlert($scope.msg.createPortRangeFail, util.iconID.FAIL);
                    }
                });
            }
        };

        /**
         * 删除端口范围
         */
        var deletePortRange = function(portRangeID, index){
            var show = function(){
                $rootScope.curPortlist.port_range.splice(index, 1); //删除指定index dom节点
                $scope.$apply();
            };
            service.deletePortRange(portRangeID).then(function(obj){
                util.delete({in:obj, msg_success:$scope.msg.deletePortRangeSuccess, msg_fail:$scope.msg.deletePortRangeFail, cbFunc:show});
            });
        };

        /**
         * 编辑端口列表
         */
        var editPortList = function(id){
            var serializeData = angular.element.param($rootScope.formData);
            var params = {}; //formData has include id
            service.editPortList(params, serializeData).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editPortListSuccess, msg_fail:$scope.msg.editPortListFail, cbFunc:show});
            });
        };

        /**
         * 删除端口列表
         */
        var deletePortList = function(id){
            util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
                service.deletePortList(id).then(function(obj){
                    util.delete({in:obj, msg_success:$scope.msg.deletePortListSuccess, msg_fail:$scope.msg.deletePortListFail, cbFunc:show});
                });
            });
        };

        //entrance
        init();
        show();
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("portListCtrl", ['$rootScope', '$scope', 'util', 'service', portListController]); //创建PortListCtrl控制器  依赖$scope, service

})();