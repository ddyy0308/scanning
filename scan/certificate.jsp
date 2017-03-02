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
<body ng-controller="certificateCtrl">
    <div id="content" class="container-fluid page-content-wrapper">
        <div class="row">
            <div class="page-bar col-md-12">
                <ul class="page-breadcrumb list-inline">
                    <li><i class="icon-certificate"></i> <span>{{msg.configManager}}</span><i class="fa fa-angle-right"></i></li>
                    <li><span>{{msg.certificate}}</span></li>
                </ul>
            </div>
        </div>
        <div class="row b-min-height"  ng-controller="modalCtrl">
            <div class="panel-info col-md-12 page-content">
                <div class="panel-heading custom-panel-heading">
                    <ul class="nav  nav-pills" role="tablist">
                        <li class="active b-pr50">
                            <a href="#">{{msg.certificate}}<span class="badge pull-right" title={{msg.certificateNum}}>{{certificateList.total}}</span></a>
                        </li>
                        <li>
                            <a href="#" class="glyphicon glyphicon-plus" ng-click="createCFModal()" data-toggle="tooltip" title={{msg.newCertificate}}></a>
                        </li>
                    </ul>
                </div>
                <div class="panel-body b-p0">
                    <table class="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>{{msg.certificateName}}</th>
                                <th>{{msg.loginName}}</th>
                                <th>{{msg.operate}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="list in certificateList.lists">
                                <td><span>{{list.name}}</span><span ng-if="list.comment">&nbsp&nbsp({{list.comment}})</span></td>
                                <td>{{list.login}}</td>
                                <td class="action">
                                    <div>
                                        <a href="#" class="glyphicon glyphicon-eye-open" ng-click="lookCFModal(list.id)" data-toggle="tooltip" title={{msg.lookCertificate}}></a>
                                        <a ng-if="list.writable == 1" href="#" class="glyphicon glyphicon-edit" ng-click="editCFModal(list)" data-toggle="tooltip" title={{msg.editCertificate}}></a>
                                        <a ng-if="list.writable != 1" href="#" class="glyphicon glyphicon-edit custom-disabled"></a>
                                        <a ng-if="list.in_use == 0" href="#" class="glyphicon glyphicon-remove" ng-click="deleteCertificate(list.id)" data-toggle="tooltip" title={{msg.deleteCertificate}}></a>
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
                <div ng-include="'/template/newCertificateModal.html'"></div>
                <div ng-include="'/template/editCertificateModal.html'"></div>
                <div ng-include="'/template/lookCertificateModal.html'"></div>

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
    <script src="/js/certificate.js"></script>
</body>
</html>