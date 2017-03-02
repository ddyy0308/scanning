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
<body ng-controller="portListCtrl">
<div id="content" class="container-fluid page-content-wrapper">
    <div class="row">
        <div class="page-bar col-md-12">
            <ul class="page-breadcrumb list-inline">
                <li><i class="icon-globe"></i> <span>{{msg.configManager}}</span><i class="fa fa-angle-right"></i></li>
                <li><span>{{msg.portList}}</span></li>
            </ul>
        </div>
    </div>
    <div class="row b-min-height"  ng-controller="modalCtrl">
        <div class="panel-info col-md-12 page-content">
            <div class="panel-heading custom-panel-heading">
                <ul class="nav  nav-pills" role="tablist">
                    <li class="active b-pr50">
                        <a href="#">{{msg.portList}}<span class="badge pull-right" title={{msg.certificateNum}}>{{portList.total}}</span></a>
                    </li>
                    <li>
                        <a href="#" class="glyphicon glyphicon-plus" ng-click="createPortListModal()" data-toggle="tooltip" title={{msg.newPortList}}></a>
                    </li>
                </ul>
            </div>
            <div class="panel-body b-p0">
                <table class="table table-hover table-striped table-bordered ">
                    <thead>
                    <tr>
                        <th rowspan="2">{{msg.name}}</th>
                        <th colspan="3">{{msg.portCount}}</th>
                        <th rowspan="2">{{msg.operate}}</th>
                    </tr>
                    <tr>
                        <th>{{msg.totalize}}</th>
                        <th>TCP</th>
                        <th>UDP</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="port in portList.lists| orderBy:'name'">
                        <td>{{port.name}}<span ng-if="port.comment">&nbsp&nbsp({{port.comment}})</span></td>
                        <td>{{port.port_all}}</td>
                        <td>{{port.port_tcp}}</td>
                        <td>{{port.port_udp}}</td>
                        <td class="action">
                            <div>
                                <a href="#" class="glyphicon glyphicon-eye-open" data-toggle="tooltip" title={{msg.lookPortList}} ng-click="lookPortListModal(port.id)"></a>
                                <a ng-if="port.writable == 1" href="#" class="glyphicon glyphicon-edit" data-toggle="tooltip" title={{msg.editPortList}} ng-click="editPortListModal(port)"></a>
                                <a ng-if="port.writable != 1" href="#" class="glyphicon glyphicon-edit custom-disabled"></a>
                                <a ng-if="port.in_use == 0" href="#" class="glyphicon glyphicon-remove" data-toggle="tooltip" title={{msg.deletePortList}} ng-click="deletePortList(port.id)"></a>
                                <a ng-if="port.in_use != 0"  href="#" class="glyphicon glyphicon-remove custom-disabled"></a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div ng-include="'/template/pagination.html'" onload="savePageComponent();"></div>
        <div class="modal-wrapper">
            <div ng-include="'/template/newPortListModal.html'"></div>
            <div ng-include="'/template/editPortListModal.html'"></div>
            <div ng-include="'/template/lookPortListModal.html'"></div>
            <div ng-include="'/template/lookTargetModal.html'"></div>
            <div ng-include="'/template/lookTaskModal.html'"></div>
        </div>
    </div>
</div><!-- content-->

<script src="/common/js/modal.js"></script>
<script src="/common/js/common.js"></script>
<script src="/common/js/AGCommon.js"></script>
<script src="/common/js/httpService.js"></script>

<script src="/js/app.js"></script>
<script src="/js/portlist.js"></script>
</body>
</html>