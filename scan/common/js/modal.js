 /**
  * 模态框控制器
  */
function modalController($rootScope, $scope, util, service){

     /*************模态框公共**************/
    var resetFormEditData = function(){
        $scope.formDataEdit = {};
    };

    var init = function(){
         /* 特定模态框ID */
        var modalID = '';

         /* 动态绑定模态框数据 */
        $scope.formDataEdit = {};   // 用于编辑与查看模态框动态数据填充
        $scope.certificate = {}; // 查看证书变量

         /* modalCtrl和portListCtrl控制器共享表单提交数据 */
        $rootScope.formData = {};
        $rootScope.formPortRangeData = {};

         /* scanConfig 扫描配置  */
        $scope.leakType = {};   // 漏洞类型
        $scope.leakTest = {};   // 漏洞测试

         /* 编辑字典策略 */
        $scope.formEditDictData = {'name':'', 'id':'', 'user_system':'1', 'user_custom':'1', 'pass_custom':'1', 'pass_custom':'1',
            "user_custom_file":'',"pass_custom_file":''
        };

         /* 端口范围数据 */
        $rootScope.curPortlist = {};

         /* 扫描任务 */
        $scope.configLists = [];    // 扫描策略
        $scope.targetLists = [];    // 扫描目标
    };

     /**
     * 所有模态框的身份ID
     */
    var modalIDS = {
        // 证书
        'newCertificate':'#modal-new-certificate',
        'editCertificate':'#modal-edit-certificate',
        'lookCertificate':'#modal-look-certificate',

        // 计划
        'newPlan':'#modal-new-plan',
        'editPlan':'#modal-edit-plan',
        'lookPlan':'#modal-look-plan',

        // 目标
        'newTarget':'#modal-new-target',
        'editTarget':'#modal-edit-target',
        'lookTarget':'#modal-look-target',

        // 端口列表
        'newPortList':'#modal-new-portList',
        'editPortList':'#modal-edit-portList',
        'lookPortList':'#modal-look-portList',

        // 扫描配置
        'newScanConfig':'#modal-new-scanConfig',
        'editScanConfig':'#modal-edit-scanConfig-leakType',
        'editScanConfigLeakTest':'#modal-edit-scanConfig-leakTest',
        'lookScanConfig':'#modal-look-scanConfig',
        'editDictStrategy':'#modal-edit-dictStrategy',

        // 任务管理
        'newTask':'#modal-new-task',
        'editTask':'#modal-edit-task',
        'lookTask':'#modal-look-task',

        // 报表管理
        'lookTaskOverview':'#modal-look-task-overview',
        'lookLeak':'#modal-look-leak',
        'editHost':'#modal-edit-host',
        'reportFilter':'#modal-report-filter',
        'generateReport':'#modal-generate-report'

    };

     /**
     * 初始化modal @param selector(string): #id or .class
     */
    var initModal = function(selector){
        modalID = selector;
    };

     /**
     * 设置modal类型
     */
    var setModalType = function(modalType){
        $rootScope.modalType = modalType;
    };

     /**
     * 显示Modal
     */
    var showModal = function(){
        hideModal(".modal");    // hide all modal first
        $(modalID).modal("show");
    };

     /**
     * 隐藏Modal
     */
    var hideModal = function(selector){
        $(selector).modal("hide");
    };

     /**
     * 关闭模态框
     */
    $scope.clickModalClose = function(selector){
        $(selector).modal("hide");
    };

     /************证书模态框 **************/
     /**
     * certificate--CF
     */

     /**
     * 新建证书
     */
    $scope.createCFModal = function(){
        util.resetForm(modalIDS.newCertificate+" form");    // 清空表单

        initModal(modalIDS.newCertificate);
        showModal();
    };

     /**
     * 编辑证书
     */
    $scope.editCFModal = function(list){
        initModal(modalIDS.editCertificate);
        showModal();

         /* 更新编辑证书模态框 */
        $scope.formDataEdit = angular.copy(list);   // 解决两个formData和list同时刷新的bug
        $scope.formDataEdit['password'] = '********';   // 默认值表示密码未修改
    };

     /**
     * 查看证书 @param id: certificate id
     */
    $scope.lookCFModal = function(id){
        initModal(modalIDS.lookCertificate);
        showModal();

         /* 更新查看证书模态框 */
        updateCFModal(id, modalIDS.lookCertificate);
    };

     /**
     * 更新模态框数据
     */
    var updateCFModal = function(id, modalID){
        service.getCertificate(id).then(function(obj){
            if(obj.data.status == 0){
                $scope.certificate = obj.data.value[0];
            }else{
                util.popupModal(modalID, false);
                util.showLayerAlert(obj.data.value, util.iconID.FAIL);
            }
        });

    };

     /************计划模态框 **************/
     /**
     * 新建计划
     */
    $scope.createPlanModal = function(){
        util.resetForm(modalIDS.newPlan+" form");    // 清空表单

        initModal(modalIDS.newPlan);
        showModal();
    };

     /**
     * 编辑计划
     */
    $scope.editPlanModal = function(id){
        initModal(modalIDS.editPlan);
        showModal();

         /* 更新编辑计划模态框 */
        updatePlanModal(id);

    };

     /**
     * 更新模态框数据
     */
    var updatePlanModal = function(id){
        service.getPlan(id).then(function(obj){
            if(obj.data.status == 0){
                $scope.formDataEdit = obj.data.value[0];
            }else{
                util.popupModal(".modal", false);
                util.showLayerAlert(obj.data.value, util.iconID.FAIL);
            }
        });
    };

     /**
     * 查看计划 @param id: plan id
     */
    $scope.lookPlanModal = function(id){
        initModal(modalIDS.lookPlan);
        showModal();

         /* 更新查看计划模态框 */
        updatePlanModal(id);
    };

     /***********目标模态框 **************/
     /**
      * 新建目标
      */
    $scope.createTargetModal = function(){
        util.resetForm(modalIDS.newTarget+" form");    // 清空表单

        initModal(modalIDS.newTarget);
        updateTargetModalByCreate();
        showModal();
    };

    var updateTargetModalByCreate = function(){
        $scope.modal = {};
        $scope.modal.certificateLists = [];
        $scope.modal.portLists = [];

        service.getCertificateList(1, -1).then(function(obj){
            obj.data.status == 0 ? ($scope.modal.certificateLists = obj.data.value) : util.consoleError(obj.data.value);
        });

        service.getAllPortList(1, -1).then(function(obj){
            obj.data.status == 0 ? ($scope.modal.portLists = obj.data.value) : util.consoleError(obj.data.value);
        });
    };

     /**
      * 编辑目标
      */
    $scope.editTargetModal = function(id){
        initModal(modalIDS.editTarget);
        updateTargetModalByEdit(id);
        showModal();
    };

    var updateTargetModalByEdit = function(id){
        service.getTarget(id).then(function(obj){
            if(obj.data.status == 0){
                $scope.formDataEdit = obj.data.value[0];

                updateTargetModalByCreate();    // get certificateLists and portLists
            }else{
                util.consoleError(obj.data.value);
            }
        });
    };

     /**
      * 查看目标
      */
    $scope.lookTargetModal = function(id){
        initModal(modalIDS.lookTarget);
        updateTargetModalByEdit(id);
        showModal();
    };

     /***********端口列表模态框 **************/
     /**
      * 新建端口列表
      */
    $scope.createPortListModal = function(){
        util.resetForm(modalIDS.newPortList+" form");    // 清空表单

        initModal(modalIDS.newPortList);
        showModal();
    };

     /**
      * 编辑端口列表
      */
    $scope.editPortListModal = function(list){
        initModal(modalIDS.editPortList);
        showModal();

        updatePortListModalByEdit(list.id);
    };

     /**
      * 更新编辑端口列表数据 与 portListCtrl共享方法
      */
    var updatePortListModalByEdit = function(portListID){
        service.getPortList(portListID).then(function(obj){
            if(obj.data.status == 0){
                var data = obj.data.value[0];
                $rootScope.curPortlist = data;   // 更新端口范围数据
                $rootScope.formData = {'name':data['name'], 'comment':data['comment'], 'id':data['id']};   // 
            }else{
                util.consoleError(obj.data.value);
            }
        });
    };

    /**
     * 查看端口列表
     */
    $scope.lookPortListModal = function(id){
        initModal(modalIDS.lookPortList);
        updatePortListModalByEdit(id);
        showModal();
    };

     /***********扫描配置模态框 **************/
     /**
     * 新建扫描配置
     */
    $scope.createSCModal = function(){
        initModal(modalIDS.newScanConfig);
        showModal();
    };

     /**
     * 更新扫描配置漏洞类型
     */
    var updateSCModalByEdit = function(id){
        service.getScanConfig(id).then(function(obj){
            obj.data.status == 0 ? ($scope.leakType = obj.data.value[0]) : util.consoleError(obj.data.value);
        });
    };

     /**
     * 编辑扫描配置-漏洞类型
     */
    $scope.editSCModal = function(id){
        initModal(modalIDS.editScanConfig);
        updateSCModalByEdit(id);
        showModal();
    };

     /**
     * 更新扫描配置漏洞测试
     */
    var updateSCModalByLeakTest = function(id, configname, familyName){
        service.getScanConfigByLeakTest(id, configname, familyName).then(function(obj){
            obj.data.status == 0 ? ($scope.leakTest = obj.data.value[0]) : util.consoleError(obj.data.value);
        });
    };

     /**
     * 编辑扫描配置-漏洞测试
     */
    $scope.editSCLeakTestModal = function(id, configname, familyName){
        hideModal(modalIDS.editScanConfig);

        initModal(modalIDS.editScanConfigLeakTest);
        updateSCModalByLeakTest(id,configname, familyName);
        showModal();
    };

    var updateDictStrategyByEdit = function(id){
        service.getDict(id).then(function(obj){
            if(obj.data.status == 0){
                var data = obj.data.value[0];
                angular.extend($scope.formEditDictData, data);  // 更新zi
                // $scope.$apply();
                 /* 设置checkbox选中状态 */
                angular.element("input[name='user_system']").attr('checked', data.user_system == '1')
                angular.element("input[name='pass_system']").attr('checked', data.pass_system == '1');
                angular.element("input[name='user_custom']").attr('checked', data.user_custom == '1');
                angular.element("input[name='pass_custom']").attr('checked', data.pass_custom == '1');
            }else{
                util.consoleError(obj.data.value);
            }
        });
    };

     /**
     * 编辑字典策略
     */
    $scope.popupEditDict = function(id){
        initModal(modalIDS.editDictStrategy);
        updateDictStrategyByEdit(id);
        showModal();
    };

     /***********任务管理模态框 **************/
    var updateTaskModalByNew = function(){
         /* 更新扫描策略 */
        service.getAllConfig(1,-1, $rootScope.taskMenuType).then(function(obj){
            obj.data.status == 0 ? ($scope.configLists = obj.data.value) : util.consoleError(obj.data.value);
        });

         /* 更新扫描目标 */
        service.getAllTarget(1,-1).then(function(obj){
            obj.data.status == 0 ? ($scope.targetLists = obj.data.value) : util.consoleError(obj.data.value);
        });

         /* 更新计划 */
        service.getPlanList(1,-1).then(function(obj){
            obj.data.status == 0 ? ($scope.planLists = obj.data.value) : util.consoleError(obj.data.value);
        });
    };

     /**
      * 新建任务
      */
    $scope.createTaskModal = function(){
        util.resetForm(modalIDS.newTask+" form");

        initModal(modalIDS.newTask);
        updateTaskModalByNew();
        showModal();
    };

    var updateTaskModalByEdit = function(id){
         /* 更新扫描策略 */
        service.getTask(id).then(function(obj){
            if(obj.data.status == 0){
                $scope.formDataEdit = obj.data.value[0];

                updateTaskModalByNew(); // get scanConfig , plan ...
            }else{
                util.consoleError(obj.data.value);
            }
        });
    };

     /**
     *  编辑任务
     */
    $scope.editTaskModal = function(id){
        initModal(modalIDS.editTask);
        updateTaskModalByEdit(id);
        showModal();
    };

     /**
     * 查看任务
     */
    $scope.lookTaskModal = function(id){
        initModal(modalIDS.lookTask);
        updateTaskModalByEdit(id);
        showModal();
    };

     /***********报表管理模态框 **************/
    var updateTaskOverviewModal = function(id){
        service.getTaskOverview(id).then(function(obj){
            obj.data.status == 0 ? ($scope.formDataEdit = obj.data.value[0]) : util.consoleError(obj.data.value);
        });
    };

     /**
     * 查看任务概览
     */
    $scope.lookTaskOverviewModal = function(id){
        initModal(modalIDS.lookTaskOverview);
        updateTaskOverviewModal(id);
        showModal();
    };

    $scope.leakDetail = {};
    var updateLeakModal = function(leak){
        $scope.leakDetail = leak;
    };

     /**
     * 查看漏洞详情 @param index(int): 当前漏洞索引
     */
    $scope.lookLeakModal = function(index){
        $scope.leakList.curIndex = index;   // 保存漏洞信息索引
        var curLeak = $scope.leakList.lists[index];

        initModal(modalIDS.lookLeak);
        updateLeakModal(curLeak);
        showModal();
    };

     /**
     * 查看漏洞详情上一条
     */
    $scope.lookPreLeakModal = function(){
        if(0 < $scope.leakList.curIndex){
            var index = --$scope.leakList.curIndex; // 保存漏洞信息索引-1
            var curLeak = $scope.leakList.lists[index];
            updateLeakModal(curLeak);
        }else{
            util.showLayerAlert($scope.msg.firstOne, util.iconID.SUCCESS);
        }
    };

     /**
     * 查看漏洞详情下一条
     */
    $scope.lookNextLeakModal = function(){
        if($scope.leakList.lists.length-1 > $scope.leakList.curIndex){
            var index = ++$scope.leakList.curIndex; // 保存漏洞信息索引+1
            var curLeak = $scope.leakList.lists[index];
            updateLeakModal(curLeak);
        }else{
            util.showLayerAlert($scope.msg.lastOne, util.iconID.SUCCESS);
        }
    };

    var updateHostByEdit = function(id){

    };

     /**
     * 编辑主机-操作系统名称
     */
    $scope.editHostModal = function(id){
        initModal(modalIDS.editHost);
        updateHostByEdit(id);
        showModal();
    };

     /**
     *   编辑报表过滤模态框--reportFilter
     *   @param:type[result or overview]
     */
    $scope.editRFModal = function(type){
        initModal(modalIDS.reportFilter);
        showModal();
    };


     /**
     * 报表模板树 数据 --save
     */
    var staticData = {
        'report':true,
            'coverSummary':true,
            'chapters':false,
        'taskSummary':true,
            'taskInfo':true,
            'targetInfo':true,
        'hostSummary':true,
            'hostList':true,
            'hostRD':true,
        'statisticsInfo':true,
            'leakList':true,
            'portList':true,
        'weakAccount':true,
        'leakDetail':true,
        'referenceInfo':true,
            'leakRiskES':true,
            'hostRiskES':true,
            'netRiskES':true,
        'safeConclusion':false
    };

     /**
     * 获取bootstrap-treeView 数据源用于构建数菜单
     */
    var getTreeData = function(tData){
        var treeData = [
            {text:'报表',name:'report', state:{checked:tData.report}, nodes:[
                {
                    text:'封面摘要',name:'coverSummary', state:{checked:tData.coverSummary}
                },{
                    text:'章节目录',name:'chapters', state:{checked:tData.chapters}
                },
                {
                    text:'任务概述',name:'taskSummary', state:{checked:tData.taskSummary}, nodes:[
                    {text:'任务信息', name:'taskInfo', state:{checked:tData.taskInfo}},
                    {text:'目标信息', name:'targetInfo', state:{checked:tData.targetInfo}}]
                },{
                    text:'主机概述',name:'hostSummary', state:{checked:tData.hostSummary}, nodes:[
                        {text:'主机列表', name:'hostList', state:{checked:tData.hostList}},
                        {text:'主机风险分布', name:'hostRD', state:{checked:tData.hostRD}}]
                },{
                    text:'统计信息',name:'statisticsInfo', state:{checked:tData.statisticsInfo}, nodes:[
                        {text:'漏洞列表', name:'leakList', state:{checked:tData.leakList}},
                        {text:'端口服务列表', name:'portList', state:{checked:tData.portList}}]
                },{
                    text:'脆弱账号',name:'weakAccount', state:{checked:tData.weakAccount}
                },{
                    text:'漏洞详情',name:'leakDetail', state:{checked:tData.leakDetail}
                },{
                    text:'参考信息',name:'referenceInfo', state:{checked:tData.referenceInfo} /* , nodes:[
                        {text:'漏洞风险等级评定标准', name:'leakRiskES', state:{checked:tData.leakRiskES}},
                        {text:'主机风险等级评定标准', name:'hostRiskES', state:{checked:tData.hostRiskES}},
                        {text:'网络风险等级评定标准', name:'netRiskES', state:{checked:tData.netRiskES}}] */
                },{
                    text:'安全结论',name:'safeConclusion', state:{checked:tData.safeConclusion}
                }
            ]}
        ];
        return treeData;
    };

     /**
     * 获取报表模板数据
     */
    $scope.reportTemplates = [{name:'标准模板', id:1, treeData:{
        'report':true,
        'coverSummary':true,
        'chapters':false,
        'taskSummary':true,
        'taskInfo':true,
        'targetInfo':true,
        'hostSummary':true,
        'hostList':true,
        'hostRD':true,
        'statisticsInfo':true,
        'leakList':true,
        'portList':true,
        'weakAccount':true,
        'leakDetail':true,
        'referenceInfo':true,
        'leakRiskES':true,
        'hostRiskES':true,
        'netRiskES':true,
        'safeConclusion':true
    }},{name:'标准模板2', id:2, treeData:{
        'report':false,
        'coverSummary':false,
        'chapters':false,
        'taskSummary':true,
        'taskInfo':true,
        'targetInfo':true,
        'hostSummary':true,
        'hostList':true,
        'hostRD':true,
        'statisticsInfo':true,
        'leakList':true,
        'portList':true,
        'weakAccount':true,
        'leakDetail':true,
        'referenceInfo':true,
        'leakRiskES':true,
        'hostRiskES':true,
        'netRiskES':true,
        'safeConclusion':true
    }}]; // 报表模板树-数据

     /**
     * 绘制模板树
     * @param refreshFlag(bool) false:first render, true: refresh tree
     */
    var showTemplateTree = function(refreshFlag, tData){
        if(!angular.isObject(tData))
            return ;

        refreshFlag && $("#template-tree").treeview(true).remove()

        $("#template-tree").treeview({data:getTreeData(tData), showCheckbox:true}).on('nodeChecked', function(event, node){
            for(var i in node.nodes){
                var child = node.nodes[i];
                $(this).treeview(true).checkNode(child.nodeId);
            }
        }).on('nodeUnchecked', function(event, node){
            for(var j in node.nodes){
                var child = node.nodes[j];
                $(this).treeview(true).uncheckNode(child.nodeId);
            }
        });
    };

     /**
     * 获取模板数据
     */
    var getReportTemplate = function(cbFunc, param){
        service.getReportTemplate().then(function(obj) {
            if(obj.data.status == 0){
                $scope.reportTemplates = obj.data.value;
                (cbFunc || angular.noop)(param, $scope.reportTemplates[0].treeData);
            }else{
                util.showLayerAlert($scope.msg.getTemplateFail, util.iconID.FAIL);
            }
        });
    };

     /**
     * 生成报表模态框
     */
    $scope.generateReportModal = function(){
        initModal(modalIDS.generateReport);
        showModal();

        if($scope.DEBUG){
            var tData = $scope.reportTemplates[0].treeData;
            // show tree
            showTemplateTree(false, tData);
            return;
        }

        // get report template data
        getReportTemplate(showTemplateTree, false);
    };

     /**
     * 点击生成报表
     */
    $scope.generateReport = function(){
        var param={};
        var dataArray = $("#template-tree").treeview(true).getEnabled();
        angular.forEach(dataArray, function(value, key){
            param[value.name] = value.state.checked;
        });

        var serializeData = $("#modal-generate-report form").serialize();
        service.generateReport({treeData:angular.toJson(param)}, serializeData).then(function(obj) {
            if(obj.data.status == 0){
                util.showLayerAlert($scope.msg.generateReportSuccess, util.iconID.SUCCESS);
            }else{
                util.showLayerAlert($scope.msg.generateReportFail, util.iconID.FAIL);
            }
        });
    };

     /**
     * 重新加载报表模板树
     */
    $scope.reloadTemplateTree = function(index){

        // show tree
        var tData = $scope.reportTemplates[index];  // $(".select-template :selected").val()
        showTemplateTree(true, tData.treeData);
    };

     /**
     * 添加模板
     */
    $scope.addReportTemplate = function(){
        util.showLayerPrompt($scope.msg.templateName, function(text){
            service.checkElementUniqueOmp({elementName:text, tableKey:'reportTemplateName'}).then(function (obj) {
                if(obj.data.code == -1){
                    util.showLayerMsg(obj.data.existTemplateName, util.iconID.FAIL);
                    return ;
                }

                // add report template
                var param={};
                var dataArray = $("#template-tree").treeview(true).getEnabled();
                angular.forEach(dataArray, function(value, key){
                    param[value.name] = value.state.checked;
                });

                service.addReportTemplate({name:text, treeData:angular.toJson(param)}).then(function(obj) {
                    if(obj.data.status == 0){
                        util.showLayerMsg($scope.msg.addSuccess, util.iconID.SUCCESS);
                        getReportTemplate(showTemplateTree, true);
                    }else{
                        util.showLayerAlert($scope.msg.addFail, util.iconID.FAIL);
                    }
                });
            });
        });
    };

     /**
     * 删除模板
     */
    $scope.deleteReportTemplate = function(id){
        if(id==1){  // 1 menas standard template
            util.showLayerMsg($scope.msg.forbidDeleteST);
            return;
        }

        util.showLayerConfirm($scope.msg.confirmDelete,  util.iconID.QUESTION, function(){
            service.deleteReportTemplate({id:id}).then(function(obj){
                if(obj.data.status == 0){
                    util.showLayerMsg($scope.msg.deleteSuccess, util.iconID.SUCCESS);
                    getReportTemplate(showTemplateTree, false);
                }else{
                    util.showLayerAlert($scope.msg.deleteFail, util.iconID.FAIL);
                }
            });
        });
    };

    // main
    init();
}
