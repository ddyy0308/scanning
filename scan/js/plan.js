(function(){
    /**
     *任务计划控制器
     */
    function planController($rootScope, $scope, $filter, util,  service){
        /**
         * 删除证书
         */
        $scope.deletePlan = function(id){deletePlan(id)};

        /**
         * 点击模态框OK button
         */
        $scope.clickModalOk = function(modalType, id){submit(modalType, id)};

        /**
         * 初始化
         */
        var init = function(){
            /*任务计划列表*/
            $scope.planList = $scope.DEBUG ? {'total':1, lists:[{
                'id':1234, 'name':'plan', 'first_time':'Mon May 16 21:00:00','next_time':'Mon May 18 21:00:00',
                'period':'10','unit_period':'day', 'duration':'10', 'unit_duration':'day', 'in_use':'0', 'writable':'1'
            }]} : {'total':0, lists:[]};

            /*transform 2016-03-03T00:00:00.000Z to 2016-03-03T00:00:00*/
            $scope.curTime = $filter('date')(new Date().toISOString(), 'yyyy-MM-ddTHH:mm:ss');
        };

        /**
         * 显示
         */
        var show = function(){
            showPlan(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 显示任务计划列表
         */
        var showPlan = function(begin, end, curPage){
            service.getPlanList(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.planList, curPage:curPage, cbFunc:showPlan});
            });
        };

        /**
         * 提交新建、编辑证书表单
         */
        var submit = function(modalType, id){
            if(modalType == "new"){
                util.checkModalSubmit("#modal-new-plan form", createPlan);
            }else if(modalType == "edit"){
                util.checkModalSubmit("#modal-edit-plan form", editPlan, id);
            }
        };

        /**
         * 创建任务计划
         */
        var createPlan = function(){
            var serializeData = $("#modal-new-plan form").serialize();
            service.createPlan({}, serializeData).then(function(obj){
                util.create({in:obj, msg_success:$scope.msg.createPlanSuccess, msg_fail:$scope.msg.createPlanFail, cbFunc:show});
            });
        };

        /**
         * 编辑证书
         */
        var editPlan = function(id){
            var serializeData = $("#modal-edit-plan form").serialize();
            service.editPlan({id:id}, serializeData).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editPlanSuccess, msg_fail:$scope.msg.editPlanFail, cbFunc:show});
            });
        };

        /**
         * 删除证书
         */
        var deletePlan = function(id){
            util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
                service.deletePlan(id).then(function(obj){
                    util.delete({in:obj, msg_success:$scope.msg.deletePlanSuccess, msg_fail:$scope.msg.deletePlanFail, cbFunc:show});
                });
            });
        };

        //entrance
        init();
        show();
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("planCtrl", ['$rootScope', '$scope', '$filter', 'util', 'service', planController]); //创建certificateCtrl控制器  依赖$scope, service
})();