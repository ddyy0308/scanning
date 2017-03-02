<!DOCTYPE html>
<html ng-app="mainApp" ng-cloak>
<head>
    <title>{{msg.title}}</title>
    <meta charset="utf-8">
    <link href="/assets/global/plugins/custom/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/assets/global/plugins/custom/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/assets/global/plugins/custom/validation/css/jquery.validationEngine.css" rel="stylesheet" type="text/css"/>
    <link href="/assets/global/plugins/custom/animate/animate.min.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/component.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/base.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/style.css" rel="stylesheet" type="text/css"/>

    <script src="/assets/global/plugins/custom/jquery/jquery-1.11.2.js"></script>
    <script src="/assets/global/plugins/custom/jquery/jquery-migrate-1.2.1.js"></script>
    <script src="/assets/global/plugins/custom/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/assets/global/plugins/custom/plugin/jquery.twbsPagination.min.js"></script>
    <script src="/assets/global/plugins/custom/radialIndicator/js/radialIndicator.js"></script>
    <script src="/assets/global/plugins/custom/countUp/countUp.min.js"></script>
    <script src="/assets/global/plugins/custom/layer/layer.js"></script>
    <script src="/assets/global/plugins/custom/underscore/underscore-min.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular.1.4.3.min.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular-file-upload.min.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular-route.min.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine-zh_CN.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine.js"></script>

</head>
<body ng-controller="parentCtrl">
<div id="content" class="container-fluid page-content-wrapper">
    <div class="row">
        <div class="page-bar col-md-12">
            <ul class="page-breadcrumb list-inline">
                <li><i ng-class="navIcon"></i> <span>{{msg.taskManager}}</span><i class="fa fa-angle-right"></i></li>
                <li><span>{{msg.taskMenu[taskMenuType]}}</span></li>
            </ul>
        </div>
    </div>
    <div class="row b-min-height">
        <div>
            <ul class="nav nav-tabs" id="myTab">
                <li><a href="#tab-taskOverview" data-toggle="tab">{{msg.taskOverview}}</a></li>
                <li><a href="#tab-scanDetail" data-toggle="tab">{{msg.scanDetail}}</a></li>
            </ul>
            <div class="tab-content"  ng-controller="modalCtrl">
                <div class="tab-pane fade in" id="tab-taskOverview" ng-controller="scanCtrl">
                    <div class="panel-info col-md-12 page-content">
                        <div class="panel-heading custom-panel-heading">
                            <ul class="nav nav-pills" role="tabist">
                                <li id="summary" class="active b-pr50">
                                    <a href="#">{{msg.task}}<span class="badge pull-right">{{taskList.total}}</span></a>
                                </li>
                                <li>
                                    <a href="#" class="glyphicon glyphicon-plus" ng-click="createTaskModal()" data-toggle="tooltip" title={{msg.newTask}}></a>
                                </li>
                                <li>
                                <li>
                                    <select class="form-control" ng-change="changeTaskTimer(value)" ng-model="value">
                                        <option value="0" ng-selected="true">{{msg.unRefresh}}</option>
                                        <option value="5">{{msg.refreshInterval}}--5s</option>
                                        <option value="15">{{msg.refreshInterval}}--15s</option>
                                        <option value="30">{{msg.refreshInterval}}--30s</option>
                                        <option value="60">{{msg.refreshInterval}}--60s</option>
                                    </select>
                                </li>
                            </ul>
                        </div><!--panel-heading -->
                        <div class="panel-body b-p0">
                            <table class="table table-bordered table-hover table-striped">
                                <thead>
                                <tr>
                                    <th rowspan="2">{{msg.taskName}}</th>
                                    <th rowspan="2">{{msg.scanStatus}}</th>
                                    <th colspan="2">{{msg.scanReport}}</th>
                                    <th rowspan="2">{{msg.riskGrade}}</th>
                                    <th rowspan="2">{{msg.trend}}</th>
                                    <th rowspan="2">{{msg.operate}}</th>
                                </tr>
                                <tr>
                                    <th>{{msg.totalize}}</th>
                                    <th>{{msg.recentReportTime}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr ng-repeat ="task in taskList.lists">
                                    <td><a href="#" ng-click="showScanDetail(task.id)">{{task.name}}</a><span ng-if="task.comment">&nbsp&nbsp({{task.comment}})</span></td>
                                    <td style="width:220px;">
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-info progress-bar-striped"
                                                 ng-class="{true:'active',false:''}[task.status == 'Running']" ng-style={'width':"{{task.progress}}%"}></div>
                                            <div class="table-progress-status" style="position: absolute;padding-left: 50px;">
                                                <span>{{task.progress}}%</span>&nbsp&nbsp<span>({{msg.status[task.status]}})</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><a href="reportTask#/taskReport/{{task.id}}/complete" data-toggle="tooltip" title="{{msg.reportTotalByComplete}}">{{task.finished}}</a>
                                        <a href="reportTask#/taskReport/{{task.id}}/all" data-toggle="tooltip" title="{{msg.reportTotal}}">({{task.report_count}})</a>
                                    </td>
                                    <td>{{task.scan_end_time}}</td>
                                    <td>{{task.severity}}</td>
                                    <td class="trend">
                                        <a ng-if="task.trend == 'same'" class='glyphicon glyphicon-arrow-right' data-toggle="tooltip" title="{{msg.leakNotChange}}"></a>
                                        <a ng-if="task.trend != 'same'" class='glyphicon glyphicon-arrow-up' data-toggle="tooltip" title="{{msg.leakIncrease}}"></a>
                                    </td>
                                    <td class="action">
                                        <div>
                                            <a href="#" ng-if="task.status != 'Running'" ng-click="startTask(task.id)" class="glyphicon glyphicon-play" data-toggle="tooltip" title={{msg.startTask}}></a>
                                            <a href="#" ng-if="task.status == 'Running'" ng-click="stopTask(task.id)" class="glyphicon glyphicon-stop" data-toggle="tooltip" title={{msg.stopTask}}></a>
                                            <a href="#" class="glyphicon glyphicon-eye-open" ng-click="lookTaskModal(task.id)" data-toggle="tooltip" title={{msg.lookTask}}></a>
                                            <a ng-if="task.status != 'Running'" href="#" class="glyphicon glyphicon-edit" ng-click="editTaskModal(task.id)" data-toggle="tooltip" title={{msg.editTask}}></a>
                                            <a ng-if="task.status == 'Running'" href="#" class="glyphicon glyphicon-edit custom-disabled"></a>
                                            <a ng-if="task.status != 'Running'" href="#" class="glyphicon glyphicon-remove" ng-click="deleteTask(task.id)" data-toggle="tooltip" title={{msg.deleteTask}}></a>
                                            <a ng-if="task.status == 'Running'"  href="#" class="glyphicon glyphicon-remove custom-disabled"></a>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!--panel-info-->
                    <div ng-include="'/template/pagination.html'" onload="savePageComponent();"></div>
                    <div class="modal-wrapper">
                        <div ng-include="'/template/newTaskModal.html'"></div>
                        <div ng-include="'/template/editTaskModal.html'"></div>
                        <div ng-include="'/template/lookTaskModal.html'"></div>
                        <div ng-include="'/template/lookTargetModal.html'"></div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab-scanDetail" ng-controller="scanDetailCtrl">
                    <section class="b-mt20 b-ml15">
                        <div id="left" class="col-md-7">
                            <div id="top" class="row">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <strong>{{msg.taskDescription}}</strong>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-md-6"><strong>{{msg.taskName}}:&nbsp&nbsp</strong><span>{{summary.task_name}}</span></div>
                                            <div class="col-md-6"><strong>{{msg.scanTarget}}:&nbsp&nbsp</strong><span>{{summary.target_name}}</span></div>
                                        </div>
                                        <div class="row b-mt10">
                                            <div class="col-md-6"><strong>{{msg.taskStatus}}:&nbsp&nbsp</strong><span>{{msg.status[summary.task_status]}}</span></div>
                                            <div class="col-md-6 action"><strong>{{msg.operate}}:&nbsp&nbsp</strong>
                                                <a href="#" ng-if="summary.task_status != 'Running'" ng-click="startTask()" class="glyphicon glyphicon-play" data-toggle="tooltip" title={{msg.startTask}}></a>
                                                <a href="#" ng-if="summary.task_status == 'Running'" ng-click="stopTask()" class="glyphicon glyphicon-stop" data-toggle="tooltip" title={{msg.stopTask}}></a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="middle" class="row">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <strong>{{msg.scanStatus}}</strong>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="row col-md-9 device-img">
                                                <div class="col-md-3">
                                                    <img class="device-img-top" src='/common/img/industry/crane.png'>
                                                    <img src='/common/img/industry/oil.png'>
                                                </div>
                                                <div class="col-md-6">
                                                    <span><img id="industry-device" src='/common/img/industry/factory.png'></span>
                                                    <span><img id="mirror-device" src='/common/img/industry/mirror.png'></span>
                                                </div>
                                                <div class="col-md-3">
                                                    <img class="device-img-top" src='/common/img/industry/machinery.png'>
                                                    <img src='/common/img/industry/petrol.png'>
                                                </div>
                                            </div>
                                            <div class="indicatorContainerWrap col-md-3">
                                                <div id="radial-scan-percent" class="b-mt20"></div>
                                                <p id="radial-percent-num" class="radial-leak-num" style="display: none">0</p>
                                                <p class="b-ml60 b-mt10 b-fwBold">{{msg.taskProgress}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="bottom" class="row">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <strong>{{msg.scanResultStatistics}}</strong>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="indicatorContainerWrap col-md-3 text-center">
                                                <div class="indicatorContainer rotateIn"></div>
                                                    <p id="radial-leak-num-total" class="radial-leak-num animated">0</p>
                                                    <p id="radial-leak-description-first" class="radial-leak-description b-fwBold">{{msg.totalize}}</p>
                                            </div>

                                            <div class="indicatorContainerWrap col-md-2 text-center">
                                                <div class="indicatorContainer pulse"></div>
                                                <p id="radial-leak-num-high" class="radial-leak-num">10</p>
                                                <p class="radial-leak-description b-fwBold">{{msg.highLeak}}</p>

                                            </div>
                                            <div class="indicatorContainerWrap col-md-2 text-center">
                                                <div class="indicatorContainer pulse"></div>
                                                <p id="radial-leak-num-medium" class="radial-leak-num">0</p>
                                                <p class="radial-leak-description b-fwBold">{{msg.mediumLeak}}</p>
                                            </div>

                                            <div class="indicatorContainerWrap col-md-2 text-center">
                                                <div class="indicatorContainer pulse"></div>
                                                <p id="radial-leak-num-low" class="radial-leak-num">0</p>
                                                <p class="radial-leak-description b-fwBold">{{msg.lowLeak}}</p>
                                            </div>
                                            <div class="indicatorContainerWrap col-md-2 text-center">
                                                <div class="indicatorContainer pulse"></div>
                                                <p id="radial-leak-num-record" class="radial-leak-num">0</p>
                                                <p class="radial-leak-description b-fwBold">{{msg.record}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div id="right" class="col-md-5">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <strong>{{msg.scanResult}}<span class="badge b-ml10">{{detailLists.length}}</span></strong>
                                </div>
                                <div class="panel-body">
                                    <div class="col-md-12">
                                        <div id="table-roll">
                                            <table class="table table-hover table-striped table-bordered table-align-left">
                                                <thead><tr><th>IP</th><th>{{msg.name}}</th><th>{{msg.threatGrade}}</th></tr></thead>
                                                <tbody>
                                                <tr ng-repeat="detail in detailLists">
                                                    <td><i class='fa fa-desktop'></i>&nbsp{{detail.host}}</td>
                                                    <td>{{detail.name}}</td>
                                                    <td>{{detail.cvss_base}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div><!-- content-->

    <script src="/common/js/common.js"></script>
    <script src="/common/js/AGCommon.js"></script>
    <script src="/common/js/httpService.js"></script>

    <script src="/js/app.js"></script>
    <script src="/common/js/modal.js"></script>
    <script src="/js/task.js"></script>
</div>
</body>
</html>