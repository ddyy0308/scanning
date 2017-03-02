/*扫描管理中所有静态文本文件 */
function MSG(){
    var _scan = {
        /**
         * @start 扫描任务状态
         */
        'status':{Running:'正在扫描',Stopped:'停止',Done:'扫描完成',New:'新建',Canceled:'取消'},
        'hostOrder':{sequential:'顺序',random:'随机',reverse:'逆序'},
        'threatArray':{'High':'高危', 'Medium':'中危', 'Low':'低危', 'Record':'记录'},
        'safeArray':{'High':'非常危险', 'Medium':'比较危险', 'Low':'比较安全', 'Record':'非常安全'},
        'date':{'hour':'小时', 'day':'天', 'week':'周', 'month':'月'},
        'hostChart':{'highPercent':'非常危险主机', 'mediumPercent':'比较危险主机', 'lowPercent':'比较安全主机', 'recordPercent':'非常安全主机'},

        /**
         * @start common
         */
        'title':'配电监控系统信息安全专项检测工具',
        'confirmBtn':'确定',
        'restoreBtn':'还原',
        'cancelBtn':'取消',
        'closeBtn':'关闭',
        'saveBtn':'保存',
        'preBtn':'上一条',
        'nextBtn':'下一条',
        'confirmDelete':'确定删除',
        'operate':'操作',
        'search':'搜索',
        'add':'添加',
        'create':'创建',
        'createTime':'创建时间',
        'lastModifyTime':'最后修改时间',
        'scanManager':'扫描管理',
        'taskManager':'任务管理',
        'configManager':'配置管理',
        'reportManager':'报表管理',
        'assetsManager':'资产管理',
        'internalError':'内部错误',
        'resourceError':'找不到资源',
        'begin':'开始',
        'end':'结束',
        'protocol':'协议',
        'system':'系统',
        'custom':'自定义',
        'username':'用户名',
        'password':'密码',
        'config':'配置',
        'os':'操作系统',
        'number':'编号',
        'deleteSuccess':'删除成功',
        'deleteFail':'删除失败',
        'addSuccess':'添加成功',
        'addFail':'添加失败',

        /*****************guo-wang @start*******************/
        /**
         * @start 辅助工具
         */
        'assistTool':'协议安全策略分析工具',
        'protocolTest':'协议测试',
        'accessCheck':'接入检查',
        'otherCheck':'其它检查',
        'messageAuth':'报文认证',
        'messageEncrypt':'报文加密',
        'invalidDeviceCheck':'非法授权设备接入检查',
        'invalidTerminalCheck':'非法终端接入检查',
        'switchPortConfig':'交换机端口配置检查',
        'targetAddress':'目标地址',
        'executeResult':'执行结果',
        'operateCmdSuccess':'执行命令成功',
        'operateCmdFail':'执行命令失败',
        'captureTime':'抓包时间（秒）',
        'netCard':'网络接口',
        'switchPortCheck':'交换机端口配置检查',
        'group':'组',
        'version':'版本',
        'invalidDeviceAccessCheck':'非授权设备接入检查',
        'invalidTerminalAccessCheck':'非法终端接入检查',
        'scanCircle':'扫描周期(分)',
        'timeout':'超时(秒)',

        'invalidTerminalFile':'非法终端白名单文件',
        'invalidDeviceFile':'非授权设备白名单文件',
        'addFile':'添加文件',
        'browse':'浏览',
        'upload':'上传',
        'fileManager':'文件管理',
        'download':'下载',
        'currentUploadFile':'当前选中的文件为...',
        'selectUploadFile':'请先选择要上传的文件',

        /**
         * @start 任务管理扩展
         */
        'taskMenu':{'custom':'自定义扫描',
            'password':'弱密码扫描',
            'port':'端口扫描',
            'fast':'快速扫描'
        },
        /*****************guo-wang @end*******************/

        /**
         * @start 证书
         */
        'name':'名称',
        'comment':'注释',
        'loginName':'登录名',
        'certificate':'证书',
        'certificateName':'证书名称',
        'certificateCount':'证书数量',
        'newCertificate':'新建证书',
        'editCertificate':'编辑证书',
        'lookCertificate':'查看证书',
        'deleteCertificate':'删除证书',
        'createCFSuccess':'新建证书成功',
        'createCFFail':'新建证书失败',
        'editCFSuccess':'编辑证书成功',
        'editCFFail':'编辑证书失败',
        'deleteCFSuccess':'删除证书成功',
        'deleteCFFail':'删除证书失败',
        'useCFTarget':'使用该证书的目标',

        /**
         * @start 目标
         */
        'target':'目标',
        'host':'主机',
        'ipCount':'IP数',
        'portList':'端口列表',
        'smbCertificate':'SMB 证书',
        'sshCertificate':'SSH 证书',
        'newTarget':'新建目标',
        'editTarget':'编辑目标',
        'lookTarget':'查看目标',
        'deleteTarget':'删除目标',
        'excludeHost':'排除主机',
        'onlyReverseSearch':'仅逆向查询',
        'allReverseSearch':'归一逆向查询',
        'aliveTest':'存活测试',
        'defaultScanConfig':'默认扫描配置',
        'createTargetSuccess':'新建目标成功',
        'createTargetFail':'新建目标失败',
        'editTargetSuccess':'编辑目标成功',
        'editTargetFail':'编辑目标失败',
        'deleteTargetSuccess':'删除目标成功',
        'deleteTargetFail':'删除目标失败',
        'useTargetTask':'使用该目标的任务',

        /**
         * @start 端口列表
         */
        'newPortList':'新建端口列表',
        'editPortList':'编辑端口列表',
        'deletePortList':'删除端口列表',
        'lookPortList':'查看端口列表',
        'createPortListSuccess':'新建端口列表成功',
        'createPortListFail':'新建端口列表失败',
        'editPortListSuccess':'编辑端口列表成功',
        'editPortListFail':'编辑端口列表失败',
        'deletePortListSuccess':'删除端口列表成功',
        'deletePortListFail':'删除端口列表失败',
        'usePortListTarget':'使用该端口列表的目标',
        'portCount':'端口计数',
        'portRange':'端口范围',
        'portRangeList':'端口范围列表',
        'createPortRange':'创建端口范围',
        'deletePortRange':'删除端口范围',
        'createPortRangeSuccess':'创建端口范围成功',
        'createPortRangeFail':'创建端口范围失败',
        'deletePortRangeSuccess':'删除端口范围成功',
        'deletePortRangeFail':'删除端口范围失败',
        'totalize':'总计',

        /**
         * @start 扫描配置 SC
         */
        'scanStrategy':'扫描策略',
        'dictStrategy':'字典策略',
        'scanConfig':'扫描配置',
        'newScanConfig':'新建扫描配置',
        'editScanConfig':'编辑扫描配置',
        'deleteScanConfig':'删除扫描配置',
        'lookScanConfig':'查看扫描配置',
        'leakType':' 漏洞类型',
        'editLeakType':' 编辑漏洞类型',
        'testCase':'测试用例',
        'createSCSuccess':'新建扫描配置成功',
        'createSCFail':'新建扫描配置失败',
        'editSCSuccess':'编辑扫描配置成功',
        'editSCFail':'编辑扫描配置失败',
        'editLeakTestSuccess':'编辑漏洞测试成功',
        'editLeakTestFail':'编辑漏洞测试失败',
        'deleteSCSuccess':'删除扫描配置成功',
        'deleteSCFail':'删除扫描配置失败',
        'testCaseSelect':'测试用例选取',
        'select':'选择',
        'trend':'趋势',
        'scanParam':'扫描参数',
        'selectValue':'选项值',
        'configName':'配置名称',

        'lookSCLeakDetail':'查看扫描配置漏洞详情',
        'scanConfigDetail':'扫描配置详情',
        'scanConfigLeakDetail':'扫描配置漏洞详情',
        'scanConfigTestDetail':'扫描配置测试用例详情',

        'leakNum':'漏洞编号',
        'leakDescription':'漏洞描述',
        'influenceSoftware':'影响产品',
        'leakGrade':'漏洞评分',
        'threatGrade':'威胁评分',
        'solution':'解决方案',
        'referenceLink':'参考链接',


        // 字典
        'dictConfig':'字典配置',
        'serviceName':'服务名称',
        'dictUsage':'字典使用',
        'editDict':'编辑字典',
        'lookDict':'查看字典',
        'downloadDict':'下载字典文件',
        'uploadSuccess':'上传文件成功.',
        'uploadFail':'上传文件失败.',
        'downloadSuccess':'下载文件成功.',
        'downloadFail':'下载文件失败.',
        'editDictSuccess':'编辑字典成功',
        'editDictFail':'编辑字典失败',

        /**
         * @start 任务计划
         */
        'plan':'任务计划',
        'planName':'计划名称',
        'newPlan':'新建计划',
        'editPlan':'编辑计划',
        'lookPlan':'查看计划',
        'deletePlan':'删除计划',
        'firstRun':'首次运行时间',
        'nextRun':'下次运行时间',
        'runInterval':'运行间隔',
        'maintainTime':'持续时间',

        'createPlanSuccess':'新建计划成功',
        'createPlanFail':'新建计划失败',
        'editPlanSuccess':'编辑计划成功',
        'editPlanFail':'编辑计划失败',
        'deletePlanSuccess':'删除证书成功',
        'deletePlanFail':'删除计划失败',
        'usePlanTask':'使用该计划的任务',

        /**
         * @start 资产管理
         */
        'assetManager':'资产管理' ,
        'openPort':'开放端口',
        'openPortNumber':'开放端口数',
        'recentReportTime':'最近生成报告时间',
        'lookAssetDetail':'查看资产详情',
        'hostDescription':'主机描述',
        'macAddress':'MAC地址',
        'reportStatistics':'报告统计',
        'reportNumber':'报告数量',
        'leakThreatStatistics':'漏洞威胁统计',
        'highThreat':'高危',
        'mediumThreat':'中危',
        'lowThreat':'低危',
        'record':'记录',
        'hostDetail':'主机详情',

        /**
         * @start 任务管理
         */
        'task':"任务",
        'taskName':"任务名称",
        'riskGrade':'危险评分',
        'threatLevel':'危险级别',
        'taskOverview':"任务概览",
        'scanDetail':"扫描详情",
        'scanStatus':"扫描状态",
        'scanReport':"扫描报告",
        'lookTaskDetail':'查看任务详情',
        'createTaskSuccess':'新建任务成功',
        'createTaskFail':'新建任务失败',
        'editTaskSuccess':'编辑任务成功',
        'editTaskFail':'编辑任务失败',
        'startTask':"启动任务",
        'stopTask':"停止任务",
        'startTaskFail':"启动任务失败",
        'stopTaskFail':"停止任务失败",
        'newTask':"新建任务",
        'lookTask':"查看任务",
        'editTask':"编辑任务",
        'deleteTask':"删除任务",
        'leakNotChange':"漏洞未变化",
        'leakIncrease':"严重性增加",
        'reportTotalByComplete':"已完成扫描报告数量",
        'reportTotal':"所有报告数量",
        'deleteTaskSuccess':'删除任务成功',
        'deleteTaskFail':'删除任务失败',
        'scanTarget':'扫描目标',
        'scanOrder':'扫描顺序',
        'sequential':'顺序',
        'reverse':'逆序',
        'random':'随机',
        'sourceInterface':'网络源接口',
        'addResultInAsset':'添加结果到资产管理',
        'scanStrength':'扫描强度',
        'executeTestCaseNumber':'同时执行测试用例数量',
        'scanHostNumber':'同时扫描主机的数量',
        'targetUsageByTask':'该任务所使用的目标',
        'lookTargetDetail':'查看目标详情',
        'scanResult':'扫描结果',
        'scanResultStatistics':'扫描结果统计',
        'threatLeak':'危险漏洞',
        'highLeak':'高危漏洞',
        'mediumLeak':'中危漏洞',
        'lowLeak':'低危漏洞',
        'unRefresh':'不自动刷新',
        'refreshInterval':'刷新间隔',
        'taskDescription':'任务描述',
        'taskProgress':'任务进度',
        'taskStatus':'任务状态',

        /**
         * @start 报表管理
         */
        /* 报表中心 */
        'reportCenter':'报表中心',
        'taskReport':'任务报表',
        'compareReport':'对比报表',
        'trendReport':'趋势报表',
        'downloadReport':'报表下载',

        /* 任务报告 */
        'taskReportNum':'任务报表数量',
        'leak':'漏洞',
        'user':'用户',
        'portService':'端口服务',
        'lookTaskReportResult':'查看任务报表结果',
        'deleteTaskReport':'删除任务报表',
        'startScanTime':'扫描开始时间',
        'taskInfo':'任务信息',
        'type':'类型',
        'createUser':'创建者',
        'startTime':'开始时间',
        'endTime':'结束时间',
        'taskConsumeTime':'任务消耗时间',
        'lookTaskOverview':'查看任务概览',
        'deleteReportSuccess':'删除报告成功',
        'deleteReportFail':'删除报表失败',
        'leakName':'漏洞名称',
        'returnInfo':'返回信息',
        'lookLeakDetail':'查看漏洞详情',
        'firstOne':'到达第一条',
        'lastOne':'到达最后一条',
        'affectSoftware':'影响软件/操作系统',
        'reportOverview':'报表预览',
        'export':'导出',
        'filter':'过滤',
        'filterCondition':'过滤条件',
        'return':'返回',
        'domain':'域名',
        'workGroup':'工作组',
        'editHostInfo':'编辑主机信息',
        'hostIPFilter':'主机IP过滤',
        'hostArea':'主机范围',
        'containIP':'包含以下 ip/ips',
        'unContainIP':'不包含以下 ip/ips',
        'leakSafeLevel':'漏洞安全级别',
        'port':'端口',
        'description':'描述',
        'score':'分值',
        'position':'位置',

        /* 报表预览 */
        'targetInfo':'目标信息',
        'targetName':'目标名称',
        'hostList':'主机列表',
        'leakList':'漏洞列表',
        'highLeakHD':'高危漏洞主机分布',
        'portServiceList':'端口服务列表',
        'accountList':'账号分布',
        'referenceInfo':'参考信息',
        'leakTotal':'漏洞总数',
        'highLeakNumber':'高危漏洞数',
        'mediumLeakNumber':'中危漏洞数',
        'lowLeakNumber':'低危漏洞数',
        'recordNumber':'记录数',
        'portServiceNumber':'端口服务数',
        'userNumber':'用户数',
        'riskScore':'风险分值',
        'hostTotal':'主机数量',
        'existHost':'存在主机',
        'guessType':'猜测类型',
        'safeLevel':'安全级别',
        'generateReport':'生成报表',
        'switch':'切换',
        'leakRD':'漏洞风险分布',
        'highRiskHD':'高危漏洞主机分布',
        'hostRD':'主机风险分布',
        'osHD':'操作系统主机分布',
        'osLD':'操作系统漏洞分布',
        'portServiceTop':'端口服务TOP10',
        'highRiskLeakNumber':'高危漏洞数量',
        'leakNumber':'漏洞数量',
        'percent':'百分比',

        // 生成报表
        'selectTLCondition':'选择模板条件',
        'reportName':'报表名称',
        'createUnit':'创建单位',
        'creator':'创建人',
        'reportType':' 报表类型',
        'templateName':'模板名称',
        'addTemplate':'添加模板',
        'deleteTemplate':'删除模板',
        'generateReportSuccess':'生成报表成功',
        'generateReportFail':'生成报表失败',
        'addTemplateFail':'添加模板失败',
        'getTemplateFail':'获取报表模板失败',
        'reportTitle':'报表标题',
        'forbidDeleteST':'禁止删除标准模板',
        'existTemplateName':'模板名称已经存在',
        'GRCompany':'国家电网中国电力科学研究院',
        'GRTitle':'配电监控系统信息安全专项检查工具安全评估报告',

        /* 报表下载 */
        'state':'状态',
        'generateTime':'生成时间'
    };
    return {'scanManager':_scan};
}