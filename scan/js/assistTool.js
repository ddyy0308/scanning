(function(){
    /**
     *辅助工具控制器
     */
    function assistToolController($rootScope, $scope, util, service){

    }

    /**
     * 101协议控制器
     */
    function OZO_ToolController($rootScope, $scope, util, service){
        /********************101协议认证测试************************/
        var initAuth = function(){
            $scope.resultAuth = "please wait...";
            $scope.startAuthFlag = true;
        };

        var submitAuth = function(){
            initAuth();

            var serializeData = $("#collapseOne-101 form").serialize();
            var promise = service.start101Auth({}, serializeData);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.resultAuth = obj.data.value.join('\n');
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
                $scope.startAuthFlag = false;
            },function(obj){
                $scope.startAuthFlag = false;
            });
        };
        $scope.startAuth = function(){
            util.checkModalSubmit("#collapseOne-101 form", submitAuth);
        };

        /********************101协议加密测试************************/
        var initEncrypt = function(){
            $scope.resultEncryp = "please wait...";
            $scope.startEncryptFlag = true;
        };

        var submitEncrypt = function(){
            initEncrypt();

            var serializeData = $("#collapseTwo-101 form").serialize();
            var promise = service.start101Encrypt({}, serializeData);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.resultEncryp = obj.data.value.join('\n')
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
                $scope.startEncryptFlag = false;
            },function(obj){
                $scope.startEncryptFlag = false;
            });
        };

        $scope.startEncrypt = function(){
            util.checkModalSubmit("#collapseTwo-101 form", submitEncrypt);
        };
    }

    /**
     * 104协议控制器
     */
    function OZF_ToolController($rootScope, $scope, util, service){
        /********************104协议认证测试************************/
        var initAuth = function(){
            $scope.resultAuth = "please wait...";
            $scope.startAuthFlag = true;
        };

        var submitAuth = function(){
            initAuth();

            var serializeData = $("#collapseOne-104 form").serialize();
            var promise = service.start104Auth({}, serializeData);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.resultAuth = obj.data.value.join('\n');
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
                $scope.startAuthFlag = false;
            },function(obj){
                $scope.startAuthFlag = false;
            });
        };
        $scope.startAuth = function(){
            util.checkModalSubmit("#collapseOne-104 form", submitAuth);
        };

        /********************104协议加密测试************************/
        var initEncrypt = function(){
            $scope.resultEncryp = "please wait...";
            $scope.startEncryptFlag = true;
        };

        var submitEncrypt = function(){
            initEncrypt();

            var serializeData = $("#collapseTwo-104 form").serialize();
            var promise = service.start104Encrypt({}, serializeData);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.resultEncryp = obj.data.value.join('\n');
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
                $scope.startEncryptFlag = false;
            },function(obj){
                $scope.startEncryptFlag = false;
            });
        };

        $scope.startEncrypt = function(){
            util.checkModalSubmit("#collapseTwo-104 form", submitEncrypt);
        };
    }

    /**
     * 接入检查控制器
     */
    function accessToolController($rootScope, $scope, util, service, $cookies, FileUploader){
        /********************非法授权设备接入检查************************/

        //var sessionId = util.getCookie('sessionId');
        var sessionId = $cookies.get('sessionId');
        var initDevice = function(){
            angular.element("#deviceResult").val("please wait...");
        };

        var submitDevice = function(){
            initDevice();

            var serializeData = $("#collapseAccess-device form").serialize();
            var promise = service.startAccessDevice({}, serializeData);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.startDeviceFlag = true; //set gray
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
            });
        };

        /**
         * 开始
         */
        $scope.startAccessDevice = function(){
            util.checkModalSubmit("#collapseAccess-device form", submitDevice);
        };

        /**
         * 停止
         */
        $scope.stopAccessDevice = function(){
            var promise = service.stopAccessDevice({'sessionId':sessionId,'pid':$("#devicePid").val()});
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.startDeviceFlag = false;
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
            });
        };

        /**
         * 上传非授权设备白名单文件
         */
        $scope.uploadDeviceFile = function(){
            var deviceFileSelected = angular.element("input[name='device-file']").val();
            if(deviceFileSelected){    //true selected file
                $scope.uploader1.uploadAll();
            }else{
                util.showLayerAlert($scope.msg.selectUploadFile, util.iconID.FAIL);
            }
        };

        /**
         * 下载非授权设备白名单文件
         */
        $scope.downloadDeviceFile = function(){
            var obj = {};
            var promise = service.downloadDeviceFile(obj);
            promise.then(function(obj){
                if(obj.data.status == -1){  //downLoad fail
                    util.showLayerAlert($rootScope.msg.downloadFail +  obj.data.value, util.iconID.FAIL);
                }else{                      //default //downLoad success
                    location.href = location.origin+"/sgtools/downloadDeviceFile";
                }
            });
        };

        /********************非法授权终端接入检查*************************/
        var initTerminal = function(){
            angular.element("#terminalResult").val("please wait...");
        };

        var submitTerminal = function(){
            initTerminal();
            var serializeData = $("#collapseAccess-terminal form").serialize();
            var promise = service.startAccessTerminal({}, serializeData);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.startTerminalFlag = true;    //set start gray
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }

            });
        };

        /**
         * 开始
         */
        $scope.startAccessTerminal = function(){
            util.checkModalSubmit("#collapseAccess-terminal form", submitTerminal);
        };

        /**
         * 停止
         */
        $scope.stopAccessTerminal = function(){
            var promise = service.stopAccessTerminal({'sessionId':sessionId,'pid':$("#terminalPid").val()});
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.startTerminalFlag = false;
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }

            });
        };

        /**
         * 上传非法终端白名单文件
         */
        $scope.uploadTerminalFile = function(){
            var terminalFileSelected = angular.element("input[name='terminal-file']").val();
            if(terminalFileSelected){    //true selected file
                $scope.uploader.uploadAll();
            }else{
                util.showLayerAlert($scope.msg.selectUploadFile, util.iconID.FAIL);
            }
        };

        /**
         * 下载非法终端白名单文件
         */
        $scope.downloadTerminalFile = function(){
            var obj = {};
            var promise = service.downloadTerminalFile(obj);
            promise.then(function(obj){
                if(obj.data.status == -1){  //downLoad fail
                    util.showLayerAlert($rootScope.msg.downloadFail +  obj.data.value, util.iconID.FAIL);
                }else{                      //default //downLoad success
                    location.href = location.origin+"/sgtools/downloadTerminalFile";
                }
            });
        };

        //-------------//
        /**
         * 创建下载器
         * */
        var createUploader = function(){
            var uploader = $scope.uploader = new FileUploader({
                url:'/sgtools/uploadTerminalFile' ,
                method:'POST',
                queueLimit:1,
                removeAfterUpload:true
            });

            uploader.onSuccessItem = function(fileItem, response , status, headers){
                if(response.status == 0){
                    $scope.fileItem = {'name':$scope.msg.currentUploadFile};
                    util.showLayerAlert($scope.msg.uploadSuccess, util.iconID.SUCCESS);
                }
                else{
                    util.showLayerAlert(response.value, util.iconID.FAIL);
                }
            };

            uploader.onErrorItem = function(fileItem, response , status, headers){
                console.info('onErrorItem', fileItem, response, status, headers);
            };

            uploader.onAfterAddingFile = function(fileItem){
                $scope.fileItem = {'name':fileItem.file.name};
            };

            $scope.clearItems = function(){
                uploader.clearQueue();
            };

            var uploader1 = $scope.uploader1 = new FileUploader({
                url:'/sgtools/uploadDeviceFile' ,
                method:'POST',
                queueLimit:1,
                removeAfterUpload:true
            });

            uploader1.onSuccessItem = function(fileItem, response , status, headers){
                if(response.status == 0){
                    $scope.fileItem1 = {'name':$scope.msg.currentUploadFile};
                    util.showLayerAlert($scope.msg.uploadSuccess, util.iconID.SUCCESS);
                }
                else{
                    util.showLayerAlert(response.value, util.iconID.FAIL);
                }
            };

            uploader1.onErrorItem = function(fileItem, response , status, headers){
                console.info('onErrorItem', fileItem, response, status, headers);
            };

            uploader1.onAfterAddingFile = function(fileItem){
                $scope.fileItem1 = {'name':fileItem.file.name};
            };

            $scope.clearItems1 = function(){
                uploader1.clearQueue();
            };
        };

        createUploader();
    }

    /**
     * 交换机端口配置控制器
     */
    function switchToolController($rootScope, $scope, util, service){
        /********************交换机端口配置************************/
        var initSwitch = function(){
            $scope.resultSwitch = "please wait...";
            $scope.startSwitchFlag = true;
        };

        var submitSwitch = function(){
            initSwitch();

            var serializeData = $("#collapseSwitch form").serialize();
            var promise = service.startSwitchCheck({}, serializeData);
            promise.then(function(obj){
                if(obj.data.status == 0){
                    $scope.resultSwitch = obj.data.value.join('\n');
                }else{
                    util.showLayerAlert(obj.data.value, util.iconID.FAIL);
                }
                $scope.startSwitchFlag = false;
            },function(obj){
                $scope.startSwitchFlag = false;
            });
        };
        $scope.startSwitchCheck = function(){
            util.checkModalSubmit("#collapseSwitch form", submitSwitch);
        };

    }

    //
    angular.module('mainApp').requires.push('angularFileUpload', 'ngCookies'); //给mainApp注入文件上传模块
    app.controller("assistToolCtrl", ['$rootScope', '$scope', 'util', 'service', assistToolController]);
    app.controller("OZO_ToolCtrl", ['$rootScope', '$scope', 'util', 'service', OZO_ToolController]);
    app.controller("OZF_ToolCtrl", ['$rootScope', '$scope', 'util', 'service', OZF_ToolController]);
    app.controller("accessToolCtrl", ['$rootScope', '$scope', 'util', 'service', '$cookies', 'FileUploader', accessToolController]);
    app.controller("switchToolCtrl", ['$rootScope', '$scope', 'util', 'service', switchToolController]);
})();
