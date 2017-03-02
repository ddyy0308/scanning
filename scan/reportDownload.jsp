<!DOCTYPE html>
<html ng-app="mainApp" ng-cloak>
<head>
    <title>{{msg.title}}</title>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <link href="/assets/global/plugins/custom/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/assets/global/plugins/custom/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/component.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/base.css" rel="stylesheet" type="text/css"/>
    <link href="/common/css/style.css" rel="stylesheet" type="text/css"/>

    <script src="/assets/global/plugins/custom/jquery/jquery-1.11.2.js"></script>
    <script src="/assets/global/plugins/custom/jquery/jquery-migrate-1.2.1.js"></script>
    <script src="/assets/global/plugins/custom/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/assets/global/plugins/custom/plugin/jquery.twbsPagination.min.js"></script>
    <script src="/assets/global/plugins/custom/layer/layer.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular.1.4.3.min.js"></script>
</head>
<body ng-controller="reportDownloadCtrl">
<div id="content" class="container-fluid page-content-wrapper">
    <div class="row">
        <div class="page-bar col-md-12">
            <ul class="page-breadcrumb list-inline">
                <li><i class="icon-cloud-download"></i><span>{{msg.reportManager}}</span><i class="fa fa-angle-right"></i></li>
                <li><span>{{msg.downloadReport}}</span></li>
            </ul>
        </div>
    </div>
    <div class="row b-min-height">
        <div ng-controller="modalCtrl">
            <div class="panel-info col-md-12 page-content">
                <div class="panel-heading custom-panel-heading">
                    <ul class="nav  nav-pills" role="tablist">
                        <li class="active b-pr50">
                            <a>{{msg.taskReport}}<span class="badge pull-right">1</span></a>
                        </li>
                    </ul>
                </div>
                <div class="panel-body b-p0">
                    <table class="table table-hover table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>{{msg.state}}</th>
                            <th>{{msg.reportName}}</th>
                            <th>{{msg.reportType}}</th>
                            <th>{{msg.generateTime}}</th>
                            <th>{{msg.createUnit}}</th>
                            <th>{{msg.creator}}</th>
                            <th>{{msg.download}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="list in downloadList.lists">
                            <td class="b-w50-px"><i class="fa fa-fw " ng-class="{true:'fa-check-square-o', false:'fa-square-o'}[list.status==1]"></i></td>
                            <td>{{list.name}}</td>
                            <td>{{list.type}}</td>
                            <td>{{list.time}}</td>
                            <td>{{list.unit}}</td>
                            <td>{{list.creator}}</td>
                            <td class="action">
                                <div>
                                    <a href="javascript:void(0)" ng-if="list.download.html != ''" ng-click="downloadFile(list.download.html)">HTML{{msg.download}}</a>
                                    <a href="javascript:void(0)" ng-if="list.download.word != ''" ng-click="downloadFile(list.download.word)"> WORD{{msg.download}}</a>
                                    <a href="javascript:void(0)" ng-if="list.download.pdf != ''" ng-click="downloadFile(list.download.pdf)">PDF{{msg.download}}</a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div ng-include="'/template/pagination.html'"></div>
            <div class="modal-wrapper">

            </div>
        </div>
    </div>
</div><!-- content-->

<script src="/common/js/modal.js"></script>
<script src="/common/js/common.js"></script>
<script src="/common/js/AGCommon.js"></script>
<script src="/common/js/httpService.js"></script>

<script src="/js/app.js"></script>
<script src="/js/reportDownload.js"></script>
</body>
</html>