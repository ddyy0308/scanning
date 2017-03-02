<!DOCTYPE html>
<html ng-app="mainApp" ng-cloak>
<head>
    <title>{{msg.title}}</title>
    <meta charset="utf-8">
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
    <script>layer.config({extend:['extend/layer.ext.js', 'skin/layer.css','skin/layer.ext.css']}); </script>
    <script src="/assets/global/plugins/custom/angular/angular.1.4.3.min.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular-file-upload.min.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular-route.min.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine-zh_CN.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine.js"></script>
</head>
<body >
<div id="content" class="container-fluid page-content-wrapper">
    <div class="row">
        <div class="page-bar col-md-12">
            <ul class="page-breadcrumb list-inline">
                <li><i class="icon-tongji"></i> <span>{{msg.configManager}}</span><i class="fa fa-angle-right"></i></li>
                <li><span>{{msg.scanConfig}}</span></li>
            </ul>
        </div>
    </div>
    <div class="row b-min-height">
        <div>
            <ul class="nav nav-tabs" id="myTab">
                <li><a href="#tab-scanConfig" data-toggle="tab">{{msg.scanStrategy}}</a></li>
                <li><a href="#tab-dict" data-toggle="tab">{{msg.dictStrategy}}</a></li>
            </ul>
            <div class="tab-content" ng-controller="modalCtrl">
                <div class="tab-pane fade in" id="tab-scanConfig" >
                    <div ng-view></div>
                </div>
                <div class="tab-pane fade" id="tab-dict" ng-controller="dictStrategyCtrl">
                    <div>
                        <div class="panel-info col-md-12 page-content">
                            <div class="panel-heading custom-panel-heading">
                                <ul class="nav nav-pills" role="tablist">
                                    <li id="summary" class="active b-pr50">
                                        <a href="#">{{msg.dictConfig}}<span class="badge pull-right" title={{msg.totalCount}}>{{dictList.total}}</span></a>
                                    </li>
                                </ul>
                            </div><!--panel-heading -->
                            <div class="panel-body b-p0">
                                <table class="table table-bordered table-hover table-striped">
                                    <thead>
                                    <tr>
                                        <th rowspan="2">{{msg.serviceName}}</th>
                                        <th colspan="2">{{msg.dictUsage}}({{msg.system}})</th>
                                        <th colspan="2">{{msg.dictUsage}}({{msg.custom}})</th>
                                        <th rowspan="2">{{msg.operate}}</th>
                                    </tr>
                                    <tr>
                                        <th>{{msg.username}}</th>
                                        <th>{{msg.password}}</th>
                                        <th>{{msg.username}}</th>
                                        <th>{{msg.password}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr ng-repeat ="dict in dictList.lists">
                                        <td class="custom-td-height">{{dict.name}}</td>
                                        <td><i class="fa " ng-class="{true:'fa-check-square-o', false:'fa-square-o'}[dict.user_system == '1']"></i></td>
                                        <td><i class="fa " ng-class="{true:'fa-check-square-o', false:'fa-square-o'}[dict.pass_system == '1']"></i></td>
                                        <td><i class="fa " ng-class="{true:'fa-check-square-o', false:'fa-square-o'}[dict.user_custom == '1']"></i></td>
                                        <td><i class="fa " ng-class="{true:'fa-check-square-o', false:'fa-square-o'}[dict.pass_custom == '1']"></i></td>
                                        <td class="action">
                                            <div>
                                                <a href="javascript:;" class="glyphicon glyphicon-edit" data-toggle="tooltip" title={{msg.editDict}} ng-click="popupEditDict(dict.id)"></a>
                                                <a href="javascript:;" class="glyphicon glyphicon-eye-open" data-toggle="tooltip" title={{msg.lookDict}} ng-click="lookDict(dict.id)"></a>
                                                <a href="javascript:;" class="glyphicon glyphicon-download-alt"
                                                   ng-if="(dict.pass_custom == '1' || dict.user_custom =='1') == '1' " ng-click="downloadDict(dict.id, dict.user_custom, dict.pass_custom)">
                                                </a>
                                                <a href="javascript:;" ng-if="(dict.pass_custom == '0' && dict.user_custom =='0') == '1' "  class="glyphicon glyphicon-download-alt custom-disabled"></a>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div><!--panel-info-->
                        <div ng-include="'/template/pagination.html'" onload="savePageComponent();"></div>
                        <div class="modal-wrapper">
                            <div ng-include="'/template/editDictStrategyModal.html'"></div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    </div>
</div><!-- content-->

<script src="/common/js/common.js"></script>
<script src="/common/js/AGCommon.js"></script>
<script src="/common/js/httpService.js"></script>

<script src="/js/app.js"></script>
<script src="/common/js/modal.js"></script>
<script src="/js/scanConfig.js"></script>
<script src="/js/dictStrategy.js"></script>
</body>
</html>