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
    <script src="/assets/global/plugins/custom/angular/angular-route.min.js"></script>
</head>
<body>
<div id="content" class="container-fluid page-content-wrapper">
    <div class="row">
        <div class="page-bar col-md-12">
            <ul class="page-breadcrumb list-inline">
                <li><i class="icon-diamond"></i> <span>{{msg.assetManager}}</span> <i class="fa fa-angle-right"></i></li>
                <li><span>{{msg.host}}</span></li>
            </ul>
        </div>
    </div>
    <div class="row b-min-height">
        <div ng-view></div>
    </div>
</div><!-- content-->

<script src="/common/js/common.js"></script>
<script src="/common/js/AGCommon.js"></script>
<script src="/common/js/httpService.js"></script>

<script src="/js/app.js"></script>
<script src="/js/asset.js"></script>
</body>
</html>