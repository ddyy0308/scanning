(function(){

    /**
     *字典策略控制器
     */
    function dictStrategyController($rootScope, $scope, util,  service, FileUploader){

        $scope.lookDict = function(id){lookDict(id);};

        $scope.downloadDict = function(id, userDict, passDict){downloadDict(id, userDict, passDict);};

        $scope.clickModalOk = function(modalType, id){submit(modalType, id);};


        var init = function(){
            $scope.dictList = {'total':0, lists:[]};

            $scope.uploader = "";

            createUploader();
        };

        /**
         * 创建下载器
         * */
        var createUploader = function(){
            var uploader = $scope.uploader = new FileUploader({
                url:service.uploadURL ,
                method:'POST'
            });

            uploader.onSuccessItem = function(fileItem, response , status, headers){
                console.info('onSuccessItem', fileItem, response, status, headers);
                if(response.status == 0)
                    $scope.formEditDictData.user_custom_file = fileItem.file.name;
                else
                    util.showLayerAlert($rootScope.msg.uploadFail + response.value, util.iconID.FAIL);
            };

            uploader.onErrorItem = function(fileItem, response , status, headers){
                console.info('onErrorItem', fileItem, response, status, headers);
            };

            var uploader1 = $scope.uploader1 = new FileUploader({
                url:service.uploadURL ,
                method:'POST'
            });

            uploader1.onSuccessItem = function(fileItem, response , status, headers){
                if(response.status == 0)
                    $scope.formEditDictData.pass_custom_file = fileItem.file.name;
                else
                    util.showLayerAlert($rootScope.msg.uploadFail + response.value, util.iconID.FAIL);
            };

            uploader1.onErrorItem = function(fileItem, response , status, headers){
                console.info('onErrorItem', fileItem, response, status, headers);
            };
        };

        var show = function(){
            showDictList(pagination.begin, pagination.end, pagination.curPage);
        };

        /**
         * 显示字典策略列表
         */
        var showDictList = function(begin, end, curPage){
            service.getAllDict(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.dictList, curPage:curPage, cbFunc:null});
            });
        };

        /**
         * 显示layer tab
         * */
        var showLayerTab = function(tabStr1, tabStr2){
            layer.tab({
                area:['600px', '300px'],
                tab:[{
                    title:'自定义用户名字典',
                    content:tabStr1
                },{
                    title:'自定义密码字典',
                    content:tabStr2
                }]
            });
        };

        /**
         * 查看自定义字典文件
         */
        var lookDict = function(id){
            var userDict = "", passDict = "";
            service.lookDict(id).then(function(obj){
                if(obj.data.status == 0){
                    var dictArray = obj.data.value;
                    userDict = dictArray[0] instanceof Array ? dictArray[0].join('<br>') : '';
                    passDict = dictArray[1] instanceof Array ? dictArray[1].join('<br>') : '';
                    showLayerTab(userDict, passDict);
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }

            });
        };

        /**
         * 下载自定义字典文件
         * */
        var downloadDict = function(id, userDict, passDict){
            var userNode = userDict == '1'? "<input type='radio' name='downloadDict' value='user_custom' checked>&nbsp用户名字典<br>":'';
            var passNode = passDict == '1'?  "<input type='radio' name='downloadDict' value='pass_custom' checked>&nbsp密码字典<br>":''
            var userCheckbox =  userNode + passNode   ;
            layer.confirm(userCheckbox, {btn:['下载','取消']}, function(){
                var downLoadObj = {user_custom:'0', pass_custom:'0'};
                var key='';
                var checkedVal = angular.element("input[name='downloadDict']:checked").val();
                if(checkedVal){
                    downLoadObj[checkedVal] = '1';
                    var serializeData = angular.element.param(downLoadObj);
                    var promise = service.downloadDict(id, serializeData);
                    promise.then(function(obj){
                        if(obj.data.status == -1){  //downLoad fail
                            util.showLayerAlert($rootScope.msg.downloadFail +  obj.data.value, util.iconID.FAIL);
                        }else{                      //default //downLoad success
                            //service.downloadFile(obj.data.value);
                            location.href = location.origin+"/dict/downloadCustomFile?" +
                            "user_custom="+downLoadObj['user_custom']+"&pass_custom="+downLoadObj['pass_custom']+"&id="+id;
                        }
                    });
                }
            });
        };

        /**
         * 编辑字典
         */
        var editDictStrategy = function(id){
            var serializeData = angular.element.param($scope.formEditDictData);
            service.editDict(id, serializeData).then(function(obj){
                util.edit({in:obj, msg_success:$scope.msg.editDictSuccess, msg_fail:$scope.msg.editDictFail, cbFunc:show});
            });
        };

        /**
         * 提交编辑字典策略
         */
        var submit = function(modalType, id){
            if(modalType == "edit"){
                /*获取选中的文件*/
                var userFileSelected = angular.element("input[name='user_custom_file']").val();
                var passFileSelected = angular.element("input[name='pass_custom_file']").val();

                /*解决checkbox由选中到取消状态 ng-modal 数据变量不改变的问题 AG-BUG*/
                $scope.formEditDictData.user_system = angular.element("input[name='user_system']").attr('checked') == 'checked'? '1': '0';
                $scope.formEditDictData.pass_system = angular.element("input[name='pass_system']").attr('checked') == 'checked' ? '1': '0';
                $scope.formEditDictData.user_custom = angular.element("input[name='user_custom']").attr('checked') == 'checked' ? '1': '0';
                $scope.formEditDictData.pass_custom = angular.element("input[name='pass_custom']").attr('checked') == 'checked' ? '1': '0';

                if(userFileSelected){    //true selected file
                    $scope.uploader.uploadAll();
                }
                if(passFileSelected){
                    $scope.uploader1.uploadAll();
                }

                util.popupModal("#modal-edit-dictStrategy", false);

                setTimeout(function(){
                    editDictStrategy(id);
                },1000);

            }
        };

        init();
        show();
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("dictStrategyCtrl", ['$rootScope', '$scope', 'util', 'service', 'FileUploader', dictStrategyController]); //创建certificateCtrl控制器  依赖$scope, service
})();
