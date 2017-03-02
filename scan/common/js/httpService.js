/**
 * 前后端交互接口
 */
function httpService(model){
    /* python interface */
    var _service_p = {
        requestURL:"./service/service.php?",
        downloadURL:'./service/download.php?',
        uploadURL:'./service/upload.php',

        /**
         ****************************************证书 API****************************************
         */

        /**
         * 获取证书列表
         */
        getCertificateList:function(begin, end){
            return model.post(this.requestURL, {cmd:'getlsc_credential_all',begin:begin, end:end});
        },

        /**
         * 新建证书
         * @param params(object)
         * @param serializeData(serialize form data)
         * @returns {*|HttpPromise}
         */
        createCertificate:function(params, serializeData){
            var obj = {cmd:'createlsc_credential'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 编辑证书
         */
        editCertificate:function(params, serializeData){
            var obj = {cmd:'modifylsc_credential'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 删除证书
         */
        deleteCertificate:function(id){
            return model.post(this.requestURL, {cmd:'deletelsc_credential', id:id});
        },

        /**
         * 获取证书
         */
        getCertificate:function(id){
            return model.post(this.requestURL, {cmd:'getlsc_credential', id:id});
        },

        /**
         ****************************************计划 API****************************************
         */

        /**
         * 获取计划列表
         */
        getPlanList:function(begin, end){
            return model.post(this.requestURL, {cmd:'getlsc_plan_all',begin:begin, end:end});
        },

        /**
         * 新建计划
         */
        createPlan:function(params, serializeData){
            var obj = {cmd:'createlsc_plan'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 编辑计划
         */
        editPlan:function(params, serializeData){
            var obj = {cmd:'modifylsc_plan'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 删除证书
         */
        deletePlan:function(id){
            return model.post(this.requestURL, {cmd:'deletelsc_plan', id:id});
        },

        /**
         * 获取证书
         */
        getCertificate:function(id){
            return model.post(this.requestURL, {cmd:'getlsc_credential', id:id});
        },

        /**
         ****************************************目标 API****************************************
         */

        /**
         * 获取目标列表
         */
        getAllTarget:function(begin, end){
            return model.get(this.requestURL, {cmd:'gettarget_all',begin:begin, end:end});
        },

        /**
         * 新建目标
         */
        createTarget:function(params, serializeData){
            var obj = {cmd:'createtarget'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 编辑目标
         */
        editTarget:function(params, serializeData){
            var obj = {cmd:'modifytargetsimple'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 删除目标
         */
        deleteTarget:function(id){
            return model.post(this.requestURL, {cmd:'deletetarget',id:id});
        },

        /**
         * 获取目标
         */
        getTarget:function(id){
            return model.post(this.requestURL, {cmd:'gettarget', id:id});
        },

        /**
         ****************************************端口列表 API**************************************
         */

        /**
         * 获取所有端口列表
         */
        getAllPortList:function(begin, end){
            return model.post(this.requestURL, {cmd:'getportlist_all',begin:begin, end:end});
        },

        /**
         * 获取端口列表 by id
         */
        getPortList:function(id){
            return model.post(this.requestURL, {cmd:'getportlist',id:id});
        },

        /**
         * 创建端口列表
         */
        createPortList:function(params, serializeData){
            var obj = {cmd:'createportlist'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 编辑端口列表
         */
        editPortList:function(params, serializeData){
            var obj = {cmd:'modifyportlist'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 删除端口列表
         */
        deletePortList:function(id){
            return model.post(this.requestURL, {cmd:'deleteportlist',id:id});
        },

        /**
         * 创建端口范围通过指定ID  --portListID
         */
        createPortRange:function(portListID, serializeData){
            return model.post(this.requestURL, {cmd:'createportrange',id:portListID}, serializeData);
        },

        /**
         * 删除端口范围通过指定rangeID  --rangeID
         */
        deletePortRange:function(rangeID){
            return model.post(this.requestURL, {cmd:'deleteportrange',id:rangeID});
        },

        /**
         ****************************************扫描配置 API**************************************
         */

        /**
         * 获取所有扫描配置列表
         */
        getAllConfig:function(begin, end){
            return model.post(this.requestURL, {cmd:'getconfig_all',begin:begin, end:end});
        },

        /**
         *新建扫描配置
         */
        createScanConfig:function(params, serializeData){
            var obj = {cmd:'create_strategy_config'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         *获取扫描配置byID-漏洞类型
         */
        getScanConfig:function(id){
            var obj = {cmd:'getfamily_edit', id:id};
            return model.post(this.requestURL, obj);
        },

        /**
         * 获取扫描配置-漏洞测试
         */
        getScanConfigByLeakTest:function(id, configname, familyName){
            var obj = {cmd:'getnvt_edit', id:id, configname:configname, family:familyName};
            return model.post(this.requestURL, obj);
        },

        /**
         *编辑扫描配置-漏洞类型
         */
        editScanConfig:function(params, serializeData){
            var obj = {cmd:'modify_strategy_config_family'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         *编辑扫描配置-漏洞测试
         */
        editScanConfigByLeakTest:function(params, serializeData){
            var obj = {cmd:'modify_strategy_config_nvt'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 删除扫描配置
         */
        deleteScanConfig:function(id){
            return model.post(this.requestURL, {cmd:'deleteconfig_strategy',id:id});
        },

        /**
         *获取配置详情
         */
        getConfigDetail:function(id){
            return model.post(this.requestURL, {cmd:'getconfig', id:id});
        },

        /**
         * 获取扫描配置漏洞详情
         */
        getLeakDetail:function(id, name){
            return model.post(this.requestURL, {cmd:'getconfig_family',id:id, family:name});
        },

        /**
         * 获取扫描配置测试用例详情
         */
        getTestCaseDetail:function(oid){
            return model.post(this.requestURL, {cmd:'getconfig_nvt',id:oid});
        },

        /**
         ****************************************字典策略 API**************************************
         */

        /**
         * 获取所有字典策略列表
         */
        getAllDict:function(begin, end){
            return model.post(this.requestURL, {cmd:"get_dict_all", begin:begin, end:end});
        },

        /**
         * 获取指定服务字典--id
         */
        getDict:function(id){
            return model.post(this.requestURL, {cmd:"get_dict", id:id});
        },

        /**
         * 编辑字典策略
         */
        editDict:function(id, serializeData){
            return model.post(this.requestURL, {cmd:"edit_dict", id:id}, serializeData);
        },

        /**
         * 提交下载数据
         */
        downloadDict:function(id, serializeData){
            return model.get(this.requestURL, {cmd:"download_custom_file", id:id}, serializeData);
        },

        /* 下载文件 -- string or array */
        downloadFile:function(file){
            var tmpFile='';
            if(file instanceof Array){
                for(var i=0; i< file.length; i++){
                    tmpFile = file[i];
                    if(tmpFile.length != 0){
                        location.href = this.downloadURL+'&id=' + tmpFile;
                    }
                }
            }else{
                location.href = this.downloadURL+'&id=' + file;
            }
        },

        /**
         * 查看字典文件内容 [[usercontent],[ passcontent]]
         */
        lookDict:function(id){
            return model.post(this.requestURL, {cmd:"read_custom_file", id:id});
        },

        /**
         ****************************************资产管理 API**************************************
         */

        /**
         * 获取所有资产列表
         */
        getAllAsset:function(begin, end){
            return model.post(this.requestURL, {cmd:"getasset_all", begin:begin, end:end});
        },

        /**
         * 获取主机资产详情-ip
         */
        getAsset:function(ip){
            return model.post(this.requestURL, {cmd:"getasset", host:ip});
        },

        /**
         ****************************************任务管理 API****************************************
         */

        /**
         * 获取所有任务列表
         */
        getAllTask:function(begin, end){
            return model.post(this.requestURL, {cmd:'gettask_all',begin:begin, end:end});
        },

        /**
         * 获取任务-id
         */
        getTask:function(id){
            return model.post(this.requestURL, {cmd:'gettask',id:id});
        },

        /**
         * 新建任务
         */
        createTask:function(params, serializeData){
            var obj = {cmd:'createtask'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 编辑任务
         */
        editTask:function(params, serializeData){
            var obj = {cmd:'modifytasksimple'};
            angular.extend(obj, params);
            return model.post(this.requestURL, obj, serializeData);
        },

        /**
         * 删除任务
         */
        deleteTask:function(id){
            return model.post(this.requestURL, {cmd:'deletetask',id:id});
        },

        /**
         * 启动任务
         */
        startTask:function(id){
            return model.post(this.requestURL, {cmd:'starttask',id:id});
        },

        /**
         * 停止任务
         */
        stopTask:function(id){
            return model.post(this.requestURL, {cmd:'stoptask',id:id});
        },

        /**
         * 获取扫描报告状态
         */
        getScanReportStatus:function(id){
            return model.post(this.requestURL, {cmd:'getreport_scan_status',id:id});
        },

        /**
         ****************************************报表管理 API****************************************
         */

        /**
         * 获取任务概览信息
         */
        getTaskOverview:function(id){
            return model.post(this.requestURL, {cmd:'gettask',id:id});
        },

        /**
         * 获取所有任务报告
         */
        getAllTaskReport:function(begin, end){
            return model.post(this.requestURL, {cmd:'getreport_all',begin:begin, end:end});
        },

        /**
         * 获取指定任务ID的报告
         */
        getReportByTaskID:function(id, begin, end, reportType){
            return model.post(this.requestURL, {cmd:'getreport_special_task',id:id, begin:begin, end:end, type:reportType});
        },

        /**
         * 删除任务报告
         */
        deleteTaskReport:function(id){
            return model.post(this.requestURL, {cmd:'deletereport',id:id});
        },

        /**
         * 获取漏洞列表
         */
        getAllLeak:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getleak_all',id:id, begin:begin, end:end});
        },

        /**
         * 获取所有主机
         */
        getAllHost:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getAllHost',id:id, begin:begin, end:end});
        },

        /**
         * 获取所有用户
         */
        getAllUser:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getAllUser',id:id, begin:begin, end:end});
        },

        /**
         * 获取所有端口服务
         */
        getAllPort:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getAllPort',id:id, begin:begin, end:end});
        },

        /*
         ***********************************报表预览API*************************
         */

         /**
         * 获取任务信息
         */
        getTaskInfo:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getTaskInfo',id:id, begin:begin, end:end});
        },

        /**
         * 获取目标信息
         */
        getTargetInfo:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getTargetInfo',id:id, begin:begin, end:end});
        },

        /**
         * 获取主机列表信息
         */
        getHostInfo:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getHostInfo',id:id, begin:begin, end:end});
        },

        /**
         * 获取漏洞列表信息
         */
        getLeakInfo:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getResultInfo',id:id, begin:begin, end:end});
        },

        /**
         * 获取端口服务列表信息
         */
        getPortInfo:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getPortInfo',id:id, begin:begin, end:end});
        },

        /**
         * 获取账号列表信息
         */
        getUserInfo:function(id, begin, end){
            return model.post(this.requestURL, {cmd:'getUserInfo',id:id, begin:begin, end:end});
        }

    };


    /* java interface */
    var _service_j = {
        requestURL : '',
        uploadURL:'/dict/uploadDictFile',
        downloadURL:'',

        /**
         ****************************************证书 API****************************************
         */

        /**
         * 获取证书列表
         */
        getCertificateList:function(begin, end){

            return model.post(_service_j.requestURL+'/credential/getAllCredentials', {begin:begin, end:end});
        },

        /**
         * 新建证书
         * url:/credential/createCredential
         */
        createCertificate:function(params, serializeData){
            return model.post(_service_j.requestURL+'/credential/createCredential', params, serializeData);
        },

        /**
         * 编辑证书
         */
        editCertificate:function(params, serializeData){
            return model.post(_service_j.requestURL+'/credential/updateCredential', params, serializeData);
        },

        /**
         * 删除证书
         */
        deleteCertificate:function(id){
            return model.post(_service_j.requestURL+'/credential/deleteCredential', {id:id});
        },

        /**
         * 获取证书
         */
        getCertificate:function(id){
            return model.post(_service_j.requestURL+'/credential/getCredential', {id:id});
        },

        /**
         ****************************************计划列表 API****************************************
         */

        /**
         * 获取计划列表
         * url: /plan/getAllPlans
         */
        getPlanList:function(begin, end){

            return model.post(_service_j.requestURL+'/plan/getAllPlans', {begin:begin, end:end});
        },

        /**
         * 新建计划
         */
        createPlan:function(params, serializeData){
            return model.post(_service_j.requestURL+'/plan/createPlan', params, serializeData);
        },

        /**
         * 编辑计划
         */
        editPlan:function(params, serializeData){
            return model.post(_service_j.requestURL+'/plan/editPlan', params, serializeData);
        },

        /**
         * 删除证书
         */
        deletePlan:function(id){
            return model.post(_service_j.requestURL+'/plan/deletePlan', {id:id});
        },

        /**
         * 获取计划
         */
        getPlan:function(id){
            return model.post(_service_j.requestURL+'/plan/getPlan', {id:id});
        },

        /**
         ****************************************目标 API****************************************
         */

        /**
         * 获取目标列表
         */
        getAllTarget:function(begin, end){
            return model.post(_service_j.requestURL+'/target/getAllTargets', {begin:begin, end:end});
        },

        /**
         * 新建目标
         */
        createTarget:function(params, serializeData){
            return model.post(_service_j.requestURL+'/target/createTarget', params, serializeData);
        },

        /**
         * 编辑目标
         */
        editTarget:function(params, serializeData){
            return model.post(_service_j.requestURL+'/target/updateTarget', params, serializeData);
        },

        /**
         * 删除目标
         */
        deleteTarget:function(id){
            return model.post(_service_j.requestURL+'/target/deleteTarget', {id:id});
        },

        /**
         * 获取目标
         */
        getTarget:function(id){
            return model.post(_service_j.requestURL+'/target/getTarget', {id:id});
        },

        /**
         ****************************************端口列表 API**************************************
         */

        /**
         * 获取所有端口列表
         */
        getAllPortList:function(begin, end){
            return model.post(_service_j.requestURL+'/portList/getAllPorts', {begin:begin, end:end});
        },

        /**
         * 获取端口列表 by id
         */
        getPortList:function(id){
            return model.post(_service_j.requestURL+'/portList/getPort', {id:id});
        },

        /**
         * 创建端口列表
         */
        createPortList:function(params, serializeData){
            return model.post(_service_j.requestURL+'/portList/createPort', params, serializeData);
        },

        /**
         * 编辑端口列表
         */
        editPortList:function(params, serializeData){
            return model.post(_service_j.requestURL+'/portList/updatePort', params, serializeData);
        },

        /**
         * 删除端口列表
         */
        deletePortList:function(id){
            return model.post(_service_j.requestURL+'/portList/deletePort', {id:id});
        },

        /**
         * 创建端口范围通过指定ID  --portListID
         * */
        createPortRange:function(portListID, serializeData){
            return model.post(_service_j.requestURL+'/portList/createPortRange', {id:portListID}, serializeData);
        },

        /**
         * 删除端口范围通过指定rangeID  --rangeID
         * */
        deletePortRange:function(rangeID){
            return model.post(_service_j.requestURL+'/portList/deletePortRange', {id:rangeID});
        },

        /**
         ****************************************扫描配置 API**************************************
         */

        /**
         * 获取所有扫描配置列表
         */
        getAllConfig:function(begin, end, menuType){
            var url = menuType == 'custom' ? '/scanConfig/getAllDefScanConfigs' : '/scanConfig/getAllScanConfigs';
            return model.post(_service_j.requestURL+url, {begin:begin, end:end});
        },

        /**
         *新建扫描配置
         */
        createScanConfig:function(params, serializeData){
            return model.post(_service_j.requestURL+'/scanConfig/createScanConfig', params, serializeData);
        },

        /**
         *获取扫描配置byID-漏洞类型
         */
        getScanConfig:function(id){
            return model.post(_service_j.requestURL+'/scanConfig/getFamilyEdit', {id:id});
        },

        /**
         * 获取扫描配置-漏洞测试
         */
        getScanConfigByLeakTest:function(id, configname, familyName){
            return model.post(_service_j.requestURL+'/scanConfig/getNvtEdit', {id:id, configname:configname, family:familyName});
        },

        /**
         *编辑扫描配置-漏洞类型
         */
        editScanConfig:function(params, serializeData){
            return model.post(_service_j.requestURL+'/scanConfig/updateScanConfigByFamily', params, serializeData);
        },

        /**
         *编辑扫描配置-漏洞测试
         */
        editScanConfigByLeakTest:function(params, serializeData){
            return model.post(_service_j.requestURL+'/scanConfig/updateScanConfigByNvt', params, serializeData);
        },

        /**
         * 删除扫描配置
         */
        deleteScanConfig:function(id){
            return model.post(_service_j.requestURL+'/scanConfig/deleteScanConfig', {id:id});
        },

        /**
         *获取配置详情
         */
        getConfigDetail:function(id){
            return model.post(_service_j.requestURL+'/scanConfig/getScanConfig', {id:id});
        },

        /**
         * 获取扫描配置漏洞详情
         */
        getLeakDetail:function(id, name){
            return model.post(_service_j.requestURL+'/scanConfig/getAllConfigFamily', {id:id, family:name});
        },

        /**
         * 获取扫描配置测试用例详情
         */
        getTestCaseDetail:function(oid){
            return model.post(_service_j.requestURL+'/scanConfig/getAllConfigNvt', {id:oid});
        },

        /**
         ****************************************字典策略 API**************************************
         */

        /**
         * 获取所有字典策略列表
         */
        getAllDict:function(begin, end){
            return model.post(_service_j.requestURL+'/dict/getAllDicts', {begin:begin, end:end});
        },

        /**
         * 获取指定服务字典--id
         * */
        getDict:function(id){
            return model.post(_service_j.requestURL+'/dict/getDict', {id:id});
        },

        /**
         * 编辑字典策略
         * */
        editDict:function(id, serializeData){
            return model.post(_service_j.requestURL+'/dict/updateDict', {id:id}, serializeData);
        },

        /**
         * 提交下载数据
         */
        downloadDict:function(id, serializeData){
            return model.get(_service_j.requestURL+'/dict/downloadCustomFile?', {id:id}, serializeData);
        },

        /**
         * 下载文件 -- string or array
         */
        downloadFile:function(file){
            var tmpFile='';
            if(file instanceof Array){
                for(var i=0; i< file.length; i++){
                    tmpFile = file[i];
                    if(tmpFile.length != 0){
                        location.href = this.downloadURL+'&id=' + tmpFile;
                    }
                }
            }else{
                location.href = this.downloadURL+'&id=' + file;
            }
        },

        /**
         * 查看字典文件内容 [[usercontent],[ passcontent]]
         */
        lookDict:function(id){
            return model.post(_service_j.requestURL+'/dict/readCustomFile', {id:id});
        },

        /**
         ****************************************资产管理 API**************************************
         */

        /**
         * 获取所有资产列表
         */
        getAllAsset:function(begin, end){
            return model.post(_service_j.requestURL+'/asset/getAllAssets', {begin:begin, end:end});
        },

        /**
         * 获取主机资产详情-ip
         */
        getAsset:function(ip){
            return model.post(_service_j.requestURL+'/asset/getAsset', {host:ip});
        },

        /**
         ****************************************任务管理 API****************************************
         */

        /**
         * 获取所有扫描任务列表--自定义，弱密码，端口，快速扫描
         * param: menuType(string) 任务管理类型
         */
        getAllTask:function(begin, end, menuType){
            var api = {'custom':'/task/getAllTasks', 'password':'/task/getAllWeakpwTasks',
                    'port':'/task/getAllPortTasks', 'fast':'/task/getAllFastTasks'};
            var url = menuType ? api[menuType] :  api['custom'];

            return model.post(_service_j.requestURL+url, {begin:begin, end:end});
        },

        /**
         * 获取任务-id
         */
        getTask:function(id){
            return model.post(_service_j.requestURL+'/task/getTask', {id:id});
        },

        /**
         * 新建任务
         */
        createTask:function(params, serializeData){
            return model.post(_service_j.requestURL+'/task/createTask', params, serializeData);
        },

        /**
         * 编辑任务
         */
        editTask:function(params, serializeData){
            return model.post(_service_j.requestURL+'/task/updateTask', params, serializeData);
        },

        /**
         * 删除任务
         */
        deleteTask:function(id){
            return model.post(_service_j.requestURL+'/task/deleteTask', {id:id});
        },

        /**
         * 启动任务
         */
        startTask:function(id){
            return model.post(_service_j.requestURL+'/task/startTask', {id:id});
        },

        /**
         * 停止任务
         */
        stopTask:function(id){
            return model.post(_service_j.requestURL+'/task/stopTask', {id:id});
        },

        /**
         * 获取扫描报告状态
         */
        getScanReportStatus:function(id){
            return model.post(_service_j.requestURL+'/report/getReportScanStatus', {id:id});
        },

        /**
         ****************************************报表管理 API****************************************
         */

        /**
         * 获取任务概览信息
         */
        getTaskOverview:function(id){
            return model.post(_service_j.requestURL+ '/report/getTaskDetail', {id:id});
        },

        /**
         * 获取所有任务报告
         */
        getAllTaskReport:function(begin, end){
            return model.post(_service_j.requestURL+'/report/getAllReports', {begin:begin, end:end});
        },

        /**
         * 获取指定任务ID的报告 --param:id(任务ID) param:rportType(all or complete)
         */
        getReportByTaskID:function(id, begin, end, reportType){
            return model.post(_service_j.requestURL+'/report/getReportSpecialTask', {id:id, begin:begin, end:end, type:reportType});
        },

        /**
         * 删除任务报告
         */
        deleteTaskReport:function(id){
            return model.post(_service_j.requestURL+'/report/deleteReport', {id:id});
        },

        /**
         * 获取漏洞列表 --param
         */
        getAllLeak:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getAllLeaks', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /**
         * 获取主机列表
         */
        getAllHost:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getAllHosts', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /**
         * 获取用户列表
         */
        getAllUser:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getAllUsers', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /**
         * 获取端口服务列表
         */
        getAllPort:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getAllPorts', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /*
         * **********************************报表预览API*************************
         * /
         /**
         * 获取所有报表结果数据--
         */
        getAllReportData:function(reportID){
            return model.post(_service_j.requestURL+'/report/getAllReportData  ', {id:reportID});
        },

         /**
         * 获取任务信息
         */
        getTaskInfo:function(reportID, begin, end){
            return model.post(_service_j.requestURL+'/report/getTaskInfo', {id:reportID, begin:begin, end:end});
        },

        /**
         * 获取目标信息
         */
        getTargetInfo:function(reportID, begin, end){
            return model.post(_service_j.requestURL+'/report/getTargetInfo', {id:reportID, begin:begin, end:end});
        },

        /**
         * 获取主机列表信息
         */
        getHostInfo:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getHostInfo', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /** 获取主机风险分布信息**/
        getHostDistribute:function(reportID){

            return model.post(_service_j.requestURL+'/report/getHostDistribution', {id:reportID});
        },

        /**
         * 获取漏洞列表信息
         */
        getLeakInfo:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getResultInfo', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /**
         * 获取报表预览所有数据--
         */
        getAllReportViewData:function(serializeData){
            return model.post(_service_j.requestURL+'/report/getAllReportViewData', {}, serializeData);
        },

        /**
         * 报表预览漏洞－获取漏洞风险分布
         */
        getLeakRiskDistribute:function(){
            return model.post(_service_j.requestURL+'/report/getResultDistributionByThreat', {});
        },

        /**
         * 报表预览漏洞－Top10 高危漏洞　
         */
        getLeakTop10:function(){
            return model.post(_service_j.requestURL+'/report/getResultTop10', {});
        },

        /**
         * 报表预览漏洞－获取高危漏洞主机分布
         */
        getLeakHostDistribute:function(){
            return model.post(_service_j.requestURL+'/report/getResultDistributionByHost', {});
        },

        /**
         * 报表预览漏洞－操作系统主机分布　　
         */
        getOSHostDistribute:function(){
            return model.post(_service_j.requestURL+'/report/getHostDistributionByOs', {});
        },

        /**
         * 报表预览漏洞－操作系统漏洞分布　　
         */
        getOSLeakDistribute:function(){
            return model.post(_service_j.requestURL+'/report/getResultDistributionByOs', {});
        },


        /**
         * 获取端口服务列表信息
         */
        getPortInfo:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getPortInfo', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /** 获取端口服务Top10**/
        getPortInfoTop10:function(reportID){

            return model.post(_service_j.requestURL+'/report/getPortInfoTop10', {id:reportID});
        },

        /**
         * 获取账号列表信息
         */
        getUserInfo:function(reportID, begin, end, filterParam){
            return model.post(_service_j.requestURL+'/report/getUserInfo', {id:reportID, begin:begin, end:end}, filterParam);
        },

        /**
         * 获取报表模板
         */
        getReportTemplate:function(){
            return model.post(_service_j.requestURL+'/report/getReportTemplate',{});
        },

        /**
         * 生成报表
         */
        generateReport:function(params, serializeData){
            return model.post(_service_j.requestURL+'/report/generateReport', params, serializeData);
        },

        /**
         * 检查是否已经添加
         */
        checkElementUniqueOmp:function(params, serializeData){
            return model.post(_service_j.requestURL+'/checkElementUniqueOmp', params, serializeData);
        },

        /**
         * 添加报表模板
         */
        addReportTemplate:function(params){
            return model.post(_service_j.requestURL+'/report/addReportTemplate', params);
        },

        /**
         * 删除报表模板
         */
        deleteReportTemplate:function(params){
            return model.post(_service_j.requestURL+'/report/deleteReportTemplate', params);
        },

        /*
         ***********************************报表下载API*************************
         */

         /**
         * 报表文件下载
         */
        getReportDownloadList:function(begin, end){
            return model.post(_service_j.requestURL+'/report/reportDownload', {begin:begin, end:end});
        },

        /*
         ***********************************辅助工具API*************************
         */

         /**
         * 开始101认证测试
         */
        start101Auth:function(params, serializeData){
            return model.post(_service_j.requestURL+'/sgtools/testIp101', params, serializeData);
        },

        /**
         * 开始101加密测试
         */
        start101Encrypt:function(params, serializeData){
            return model.post(_service_j.requestURL+'/sgtools/capture101', params, serializeData);
        },

        /**
         * 开始104认证测试
         */
        start104Auth:function(params, serializeData){
            return model.post(_service_j.requestURL+'/sgtools/testIp104', params, serializeData);
        },

        /**
         * 开始104加密测试
         */
        start104Encrypt:function(params, serializeData){
            return model.post(_service_j.requestURL+'/sgtools/capture104', params, serializeData);
        },

        /**
         * 开始交换机端口检查
         */
        startSwitchCheck:function(params, serializeData){
            return model.post(_service_j.requestURL+'/sgtools/switchIfConfigRead', params, serializeData);
        },

        /**
         * 接入检查-非授权设备单次执行
         */
        startAccessDevice:function(params, serializeData){
            return model.post(_service_j.requestURL+'/sgtools/unauthorizedDeviceCycle', params, serializeData);
        },

        /**
         * 接入检查-非授权设备执行-停止
         */
        stopAccessDevice:function(params){
            return model.post(_service_j.requestURL+'/sgtools/stopDeviceCycle',params);
        },

        /**
         * 接入检查-非授权终端循环执行
         */
        startAccessTerminal:function(params, serializeData){
            return model.post(_service_j.requestURL+'/sgtools/unauthorizedTerminalCycle', params, serializeData);
        },

        /**
         * 接入检查-非授权终端循环执行-停止
         */
        stopAccessTerminal:function(params){
            return model.post(_service_j.requestURL+'/sgtools/stopTerminalCycle',params);
        },
        /**
         * 下载终端设备白名单文件
         */
        downloadTerminalFile:function(params){
            return model.get(_service_j.requestURL+'/sgtools/downloadTerminalFile',params);
        },

        /**
         * 下载非授权设备白名单文件
         */
        downloadDeviceFile:function(params){
            return model.get(_service_j.requestURL+'/sgtools/downloadDeviceFile',params);
        }

    };

    return _service_j;
}

/**
 * http请求
 * @param $http
 * @param $q
 * @returns {{request: request, get: get, post: post}}
 * @constructor
 */
function AGModel ($http,$q){
    var _model = {
        /**
         * http asyn request --GET/POST, url(string), params(map object), serializeData by post or get
         */
        request:function(method, url, params, data){
            data = data || "";
            var config = {};
            if(method.toLocaleLowerCase() == 'get'){
                config = {method:'get', url:url+data, params: params}
            }else{
                config = {method:'post', url:url+data, data: $.param(params), headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}
            }

            var deferred = $q.defer();  // declare promise
            $http(config).success(function(json, status){
                deferred.resolve(json);   // request success
            }).error(function(json, status){
                deferred.reject(status);    // request fail
            });
            return deferred.promise;    // return promise
        },

        /**
         * http asyn get request --url(string),params(map object) --return HttpPromise object{data:'',status:''...}
         */
        get:function(url, params, serializeData){
            params = params || {};
            serializeData = serializeData || "";
            return $http.get(url+serializeData, {params:params}); // get方法 data参数无效
        },

        /**
         * http asyn post request --url(string),params(map object), data(serialize data) --return HttpPromise object{data:'',status:''...}
         */
        post:function(url, params, serializeData){
            params = params || {};
            serializeData = serializeData || "";

            /* 解决AG post 与 jquery post 提交方式不一样的bug */
            // url:url+serializeData
            return $http({method:'post', url:url, data: $.param(params) +'&'+serializeData,
                headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}});
        }
    };
    return _model;
}
