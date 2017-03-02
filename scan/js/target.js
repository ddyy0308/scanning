(function(){
    function targetController($rootScope, $scope, util, service){
        /**
         * 删除目标
         */
        $scope.deleteTarget = function(id){deleteTarget(id)};

        /**
         * 点击模态框OK button
         */
        $scope.clickModalOk = function(modalType, id){submit(modalType, id)};

        var init = function(){
            /*证书列表*/
            $scope.targetList = {'total':0, lists:[]};
        };

        /**
         * 显示目标列表
         * */
        var showTargetList = function(begin, end, curPage){
            service.getAllTarget(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.targetList, curPage:curPage, cbFunc:showTargetList});
            });
        };

        var show = function(){
            showTargetList(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 新建目标
         * */
        var createTarget = function(){
            var serializeData = $("#modal-new-target form").serialize();
            service.createTarget({}, serializeData).then(function(obj){
                util.create({in:obj, msg_success:$scope.msg.createTargetSuccess, msg_fail:$scope.msg.createTargetFail, cbFunc:show});
            });
        };

        /**
         * 编辑目标
         */
        var editTarget = function(id){
            var serializeData = $("#modal-edit-target form").serialize();
            service.editTarget({id:id},serializeData).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editTargetSuccess, msg_fail:$scope.msg.editTargetFail, cbFunc:show});
            });
        };

        /**
         * 删除目标
         */
        var deleteTarget = function(id){
            util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
                service.deleteTarget(id).then(function(obj){
                    util.delete({in:obj, msg_success:$scope.msg.deleteTargetSuccess, msg_fail:$scope.msg.deleteTargetFail, cbFunc:show});
                });
            });
        };

        /**
         * 提交表单数据 新建、编辑
         * */
        var submit = function(modalType, id){
            if(modalType == "new"){
                util.checkModalSubmit("#modal-new-target form", createTarget);
            }else if(modalType == "edit"){
                util.checkModalSubmit("#modal-edit-target form", editTarget, id);
            }
        };

        //entrance
        init();
        show();
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("targetCtrl", ['$rootScope', '$scope', 'util', 'service', targetController]); //创建targetController控制器  依赖$scope, service
})();