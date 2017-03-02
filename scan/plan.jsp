<!DOCTYPE html>
<html ng-app="mainApp" ng-cloak>
<head>
    <title>{{msg.title}}</title>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <link href="/assets/global/plugins/custom/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/assets/global/plugins/custom/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/assets/global/plugins/custom/validation/css/jquery.validationEngine.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/component.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/base.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/style.css" rel="stylesheet" type="text/css"/>

    <script src="/assets/global/plugins/custom/jquery/jquery-1.11.2.js"></script>
    <script src="/assets/global/plugins/custom/jquery/jquery-migrate-1.2.1.js"></script>
    <script src="/assets/global/plugins/custom/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/assets/global/plugins/custom/plugin/jquery.twbsPagination.min.js"></script>
    <script src="/assets/global/plugins/custom/layer/layer.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular.1.4.3.min.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine-zh_CN.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine.js"></script>
</head>
<body ng-controller="planCtrl">
<div id="content" class="container-fluid page-content-wrapper">
    <div class="row">
        <div class="page-bar col-md-12">
            <ul class="page-breadcrumb list-inline">
                <li><i class="icon-clock"></i><span>{{msg.configManager}}</span><i class="fa fa-angle-right"></i></li>
                <li><span>{{msg.plan}}</span></li>
            </ul>
        </div>
    </div>
    <div class="row b-min-height"  ng-controller="modalCtrl">
        <div class="panel-info col-md-12 page-content">
            <div class="panel-heading custom-panel-heading">
                <ul class="nav nav-pills" role="tablist">
                    <li class="active b-pr50">
                        <a href="#">{{msg.plan}}<span class="badge pull-right" title={{msg.plan}}>{{planList.total}}</span></a>
                    </li>
                    <li>
                        <a href="#" class="glyphicon glyphicon-plus" ng-click="createPlanModal()" data-toggle="tooltip" title={{msg.newPlan}}></a>
                    </li>
                </ul>
            </div>
            <div class="panel-body b-p0">
                <table class="table table-hover table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>{{msg.name}}</th>
                        <th>{{msg.runInterval}}</th>
                        <th>{{msg.maintainTime}}</th>
                        <th>{{msg.firstRun}}</th>
                        <th>{{msg.nextRun}}</th>
                        <th>{{msg.operate}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="list in planList.lists">
                        <td><span>{{list.name}}</span><span ng-if="list.comment">&nbsp&nbsp({{list.comment}})</span></td>
                        <td>{{list.period}} {{msg.date[list.unit_period]}}</td>
                        <td>{{list.duration}} {{msg.date[list.unit_duration]}}</td>
                        <td>{{list.first_time}}</td>
                        <td>{{list.next_time}}</td>
                        <td class="action">
                            <div>
                                <a href="#" class="glyphicon glyphicon-eye-open" ng-click="lookPlanModal(list.id)" data-toggle="tooltip" title={{msg.lookPlan}}></a>
                                <a ng-if="list.writable == 1" href="#" class="glyphicon glyphicon-edit" ng-click="editPlanModal(list.id)" data-toggle="tooltip" title={{msg.editPlan}}></a>
                                <a ng-if="list.writable != 1" href="#" class="glyphicon glyphicon-edit custom-disabled"></a>
                                <a ng-if="list.in_use == 0" href="#" class="glyphicon glyphicon-remove" ng-click="deletePlan(list.id)" data-toggle="tooltip" title={{msg.deletePlan}}></a>
                                <a ng-if="list.in_use !=0"  href="#" class="glyphicon glyphicon-remove custom-disabled"></a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div ng-include="'/template/pagination.html'" onload="savePageComponent();"></div>
        <div class="modal-wrapper">
            <div ng-include="'/template/newPlanModal.html'"></div>
            <div ng-include="'/template/editPlanModal.html'"></div>
            <div ng-include="'/template/lookPlanModal.html'"></div>
            <div ng-include="'/template/lookTaskModal.html'"></div>
            <div ng-include="'/template/lookTargetModal.html'"></div>
        </div>
    </div>
</div><!-- content-->

<script src="/common/js/modal.js"></script>
<script src="/common/js/common.js"></script>
<script src="/common/js/AGCommon.js"></script>
<script src="/common/js/httpService.js"></script>

<script src="/js/app.js"></script>
<script src="/js/plan.js"></script>
</body>
</html>