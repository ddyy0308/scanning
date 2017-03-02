(function(){
    /**
     *证书控制器
     */
    function certificateController($rootScope, $scope, util,  service){
        /**
         * 删除证书
         */
        $scope.deleteCertificate = function(id){deleteCertificate(id)};

        /**
         * 点击模态框OK button
         */
        $scope.clickModalOk = function(modalType, id){submit(modalType, id)};

        /**
         * 初始化
         */
        var init = function(){
            /*证书列表*/
            $scope.certificateList = {'total':0, lists:[]};
        };

        /**
         * 显示
         */
        var show = function(){
            showCertificate(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 显示证书列表
         */
        var showCertificate = function(begin, end, curPage){
            service.getCertificateList(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.certificateList, curPage:curPage, cbFunc:showCertificate});
            });
        };

        /**
         * 提交新建、编辑证书表单
         */
        var submit = function(modalType, id){
            if(modalType == "new"){
                util.checkModalSubmit("#modal-new-certificate form", createCertificate);
            }else if(modalType == "edit"){
                util.checkModalSubmit("#modal-edit-certificate form", editCertificate, id);
            }
        };

        /**
         * 创建证书
         */
        var createCertificate = function(){
            var serializeData = $("#modal-new-certificate form").serialize();
            service.createCertificate({}, serializeData).then(function(obj){
                util.create({in:obj, msg_success:$scope.msg.createCFSuccess, msg_fail:$scope.msg.createCFFail, cbFunc:show});
            });
        };

        /**
         * 编辑证书
         */
        var editCertificate = function(id){
            var params = {id:id};
            var serializeData = $("#modal-edit-certificate form").serialize();
            service.editCertificate(params, serializeData).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editCFSuccess, msg_fail:$scope.msg.editCFFail, cbFunc:show});
            });

        };

        /**
         * 删除证书
         */
        var deleteCertificate = function(id){
            util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
                service.deleteCertificate(id).then(function(obj){
                    util.delete({in:obj, msg_success:$scope.msg.deleteCFSuccess, msg_fail:$scope.msg.deleteCFFail, cbFunc:show});
                })
            });
        };

        //entrance
        init();
        show();
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("certificateCtrl", ['$rootScope', '$scope', 'util', 'service', certificateController]); //创建certificateCtrl控制器  依赖$scope, service
})();