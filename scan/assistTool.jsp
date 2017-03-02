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
    <script src="/assets/global/plugins/custom/angular/angular-file-upload.min.js"></script>
    <script src="/assets/global/plugins/custom/angular/angular-cookies.min.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine-zh_CN.js"></script>
    <script src="/assets/global/plugins/custom/validation/js/jquery.validationEngine.js"></script>
    <style>.b-min-height{min-height:1500px !important;}</style>
</head>
<body ng-controller="assistToolCtrl">
<div id="content" class="container-fluid page-content-wrapper">
    <div class="row">
        <div class="page-bar col-md-12">
            <ul class="page-breadcrumb list-inline">
                <li><i class="icon-tool"></i> <span>{{msg.taskManager}}</span><i class="fa fa-angle-right"></i></li>
                <li><span>{{msg.assistTool}}</span></li>
            </ul>
        </div>
    </div>
    <div class="row b-min-height">
        <div class="page-content">
            <ul class="nav nav-tabs" id="myTab">
                <li class="active"><a href="#tab-protocol-101" data-toggle="tab">101{{msg.protocolTest}}</a></li>
                <li><a href="#tab-protocol-104" data-toggle="tab">104{{msg.protocolTest}}</a></li>
                <li><a href="#tab-access-check" data-toggle="tab">{{msg.accessCheck}}</a></li>
                <li><a href="#tab-other-check" data-toggle="tab">{{msg.otherCheck}}</a></li>
            </ul>
            <div ng-controller="assistToolCtrl" class="tab-content">
                <div ng-controller="OZO_ToolCtrl" class="tab-pane fade in active" id="tab-protocol-101">
                    <div class="panel-group" id="accordion-101">
                        <div class="panel-gray col-md-12">
                            <div class="panel-heading ">
                                <h4 class="panel-title">
                                    <a class="" data-toggle="collapse" data-parent="#accordion-101" href="#collapseOne-101" >
                                        <i class="fa fa-fw fa-angle-double-down"></i>ip{{msg.messageAuth}}</a>
                                </h4>
                            </div><!--panel-heading -->
                            <div id="collapseOne-101" class="panel-collapse collapse in">
                                <div class="panel-body container-fluid col-md-10">
                                    <p></p>
                                    <form class="form-horizontal container-fluid col-md-12">
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.targetAddress}}(IPV4/IPv6)</label>
                                            <div class="col-md-5 ">
                                                <input name="ip" class="form-control validate[required, custom[ipv4]]">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.port}}</label>
                                            <div class="col-md-5 ">
                                                <input name="port" class="form-control validate[required, min[1], max[65535], custom[integer]]" value="2404">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.operate}}</label>
                                            <div class="col-md-5 ">
                                                <button class="btn btn-success" ng-click="startAuth();"
                                                        ng-class="{true:'disabled', false:''}[startAuthFlag]">{{msg.begin}}</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.executeResult}}</label>
                                            <div class="col-md-7">
                                                <textarea readonly rows="15" class="b-w100-p">{{resultAuth}}</textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div><!--panel-info-->
                        <div class="panel-gray col-md-12">
                            <div class="panel-heading  ">
                                <h4 class="panel-title">
                                    <a class="" data-toggle="collapse" data-parent="#accordion-101" href="#collapseTwo-101">
                                        <i class="fa fa-fw fa-angle-double-down"></i>ip{{msg.messageEncrypt}}</a>
                                </h4>
                            </div><!--panel-heading -->
                            <div id="collapseTwo-101" class="panel-collapse collapse">
                                <div class="panel-body container-fluid">
                                    <div class="panel-body container-fluid col-md-10">
                                        <p></p>
                                        <form class="form-horizontal container-fluid col-md-12">
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.netCard}}</label>
                                                <div class="col-md-5 ">
                                                    <select name="card">
                                                        <option value="eth0" selected>eth0</option>
                                                        <option value="eth1">eth1</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.targetAddress}}(IPV4/IPv6)</label>
                                                <div class="col-md-5 ">
                                                    <input name="ip" class="form-control validate[required, custom[ipv4]]">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.port}}</label>
                                                <div class="col-md-5 ">
                                                    <input name="port" class="form-control validate[required, min[1], max[65535], custom[integer]]" value="2404">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.captureTime}}</label>
                                                <div class="col-md-5 ">
                                                    <input name="time_stop" class="form-control validate[required, custom[integer]]" value="60">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.operate}}</label>
                                                <div class="col-md-5 ">
                                                    <button class="btn btn-success" ng-click="startEncrypt();"
                                                            ng-class="{true:'disabled', false:''}[startEncryptFlag]">{{msg.begin}}</button>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.executeResult}}</label>
                                                <div class="col-md-7">
                                                    <textarea readonly rows="15" class="b-w100-p">{{resultEncryp}}</textarea>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div><!--panel-info-->
                    </div>
                </div>
                <div ng-controller="OZF_ToolCtrl" class="tab-pane fade in" id="tab-protocol-104">
                    <div class="panel-group" id="accordion-104">
                        <div class="panel-gray col-md-12">
                            <div class="panel-heading ">
                                <h4 class="panel-title">
                                    <a class="" data-toggle="collapse" data-parent="#accordion-104" href="#collapseOne-104" >
                                        <i class="fa fa-fw fa-angle-double-down"></i>ip{{msg.messageAuth}}</a>
                                </h4>
                            </div><!--panel-heading -->
                            <div id="collapseOne-104" class="panel-collapse collapse in">
                                <div class="panel-body container-fluid col-md-10">
                                    <p></p>
                                    <form class="form-horizontal container-fluid col-md-12">
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.targetAddress}}(IPV4/IPv6)</label>
                                            <div class="col-md-5 ">
                                                <input name="ip" class="form-control validate[required, custom[ipv4]]">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.port}}</label>
                                            <div class="col-md-5 ">
                                                <input name="port" class="form-control validate[required, min[1], max[65535], custom[integer]]" value="2404">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.operate}}</label>
                                            <div class="col-md-5 ">
                                                <button class="btn btn-success" ng-click="startAuth();"
                                                        ng-class="{true:'disabled', false:''}[startAuthFlag]">{{msg.begin}}</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.executeResult}}</label>
                                            <div class="col-md-7">
                                                <textarea readonly rows="15" class="b-w100-p">{{resultAuth}}</textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div><!--panel-info-->
                        <div class="panel-gray col-md-12">
                            <div class="panel-heading  ">
                                <h4 class="panel-title">
                                    <a class="" data-toggle="collapse" data-parent="#accordion-104" href="#collapseTwo-104">
                                        <i class="fa fa-fw fa-angle-double-down"></i>ip{{msg.messageEncrypt}}</a>
                                </h4>
                            </div><!--panel-heading -->
                            <div id="collapseTwo-104" class="panel-collapse collapse">
                                <div class="panel-body container-fluid">
                                    <div class="panel-body container-fluid col-md-10">
                                        <p></p>
                                        <form class="form-horizontal container-fluid col-md-12">
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.netCard}}</label>
                                                <div class="col-md-5 ">
                                                    <select name="card">
                                                        <option value="eth0" selected>eth0</option>
                                                        <option value="eth1">eth1</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.targetAddress}}(IPV4/IPv6)</label>
                                                <div class="col-md-5 ">
                                                    <input name="ip" class="form-control validate[required, custom[ipv4]]">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.port}}</label>
                                                <div class="col-md-5 ">
                                                    <input name="port" class="form-control validate[required, min[1], max[65535], custom[integer]]" value="2404">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.captureTime}}</label>
                                                <div class="col-md-5 ">
                                                    <input name="time_stop" class="form-control validate[required, custom[integer]]" value="60">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.operate}}</label>
                                                <div class="col-md-5 ">
                                                    <button class="btn btn-success" ng-click="startEncrypt();"
                                                            ng-class="{true:'disabled', false:''}[startEncryptFlag]">{{msg.begin}}</button>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-5 b-taR">{{msg.executeResult}}</label>
                                                <div class="col-md-7">
                                                    <textarea readonly rows="15" class="b-w100-p">{{resultEncryp}}</textarea>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div><!--panel-info-->
                    </div>
                </div>
                <div ng-controller="accessToolCtrl" class="tab-pane fade in" id="tab-access-check">
                    <div class="panel-group" id="accordion-access">
                        <div class="panel-gray col-md-12">
                            <div class="panel-heading ">
                                <h4 class="panel-title">
                                    <a class="" data-toggle="collapse" data-parent="#accordion-access" href="#collapseAccess-terminal" >
                                        <i class="fa fa-fw fa-angle-double-down"></i>{{msg.invalidTerminalAccessCheck}}</a>
                                </h4>
                            </div><!--panel-heading -->
                            <div id="collapseAccess-terminal" class="panel-collapse collapse in">
                                <div class="panel-body container-fluid col-md-12">
                                    <p></p>
                                    <form class="form-horizontal container-fluid col-md-7 b-br-dash">
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.netCard}}</label>
                                            <div class="col-md-5 ">
                                                <select name="card">
                                                    <option value="eth0" selected>eth0</option>
                                                    <option value="eth1">eth1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.port}}</label>
                                            <div class="col-md-5 ">
                                                <input name="port" class="form-control validate[required, min[1], max[65535], custom[integer]]" value="2404">
                                                <input type="text" id="devicePid"  name="pid" value="" hidden/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.captureTime}}</label>
                                            <div class="col-md-5 ">
                                                <input name="time_stop" class="form-control validate[required, custom[integer]]">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.operate}}</label>
                                            <div class="col-md-5 ">
                                                <button class="btn btn-success" ng-click="startAccessTerminal();"
                                                        ng-class="{true:'disabled', false:''}[startTerminalFlag]">{{msg.begin}}
                                                </button>
                                                <button class="btn btn-primary" ng-click="stopAccessTerminal();"
                                                        ng-class="{false:'disabled', true:''}[startTerminalFlag]">{{msg.end}}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.executeResult}}</label>
                                            <div class="col-md-9">
                                                <textarea readonly rows="15" class="b-w100-p" id="terminalResult" style="font-family: simsun">{{resultTerminal}}</textarea>
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form-horizontal container-fluid col-md-4" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">
                                                {{msg.addFile}}
                                            </label>
                                            <div class="col-md-7">
                                                <a href="javascript:;" class="btn btn-warning uploader-add-file">
                                                    {{msg.browse}}
                                                    <input type="file" name="terminal-file"  nv-file-select="" uploader="uploader" ng-click="clearItems()">
                                                </a>
                                                <input type="text" readonly="readonly" ng-model="fileItem.name" value={{msg.currentUploadFile}}..>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.fileManager}}</label>
                                            <div class="col-md-7">
                                                <button class="btn btn-success" ng-click="uploadTerminalFile()"><i class="fa fa-fw fa-upload"></i>&nbsp{{msg.upload}}</button>
                                                <button class="btn btn-primary" ng-click="downloadTerminalFile()"><i class="fa fa-fw fa-download"></i>&nbsp{{msg.download}}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div><!--panel-info-->
                        <div class="panel-gray col-md-12">
                            <div class="panel-heading ">
                                <h4 class="panel-title">
                                    <a class="" data-toggle="collapse" data-parent="#accordion-access" href="#collapseAccess-device" >
                                        <i class="fa fa-fw fa-angle-double-down"></i>{{msg.invalidDeviceAccessCheck}}</a>
                                </h4>
                            </div><!--panel-heading -->
                            <div id="collapseAccess-device" class="panel-collapse collapse">
                                <div class="panel-body container-fluid col-md-12">
                                    <p></p>
                                    <form class="form-horizontal container-fluid col-md-7  b-br-dash">
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.targetAddress}}(ip or ips)</label>
                                            <div class="col-md-5 ">
                                                <input name="ip" class="form-control validate[required]">
                                                <input type="text" id="terminalPid"  name="pid" value="" hidden/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.scanCircle}}</label>
                                            <div class="col-md-5 ">
                                                <input name="period" class="form-control validate[required, custom[integer]]">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.operate}}</label>
                                            <div class="col-md-5 ">
                                                <button class="btn btn-success" ng-click="startAccessDevice();"
                                                        ng-class="{true:'disabled', false:''}[startDeviceFlag]">{{msg.begin}}
                                                </button>
                                                <button class="btn btn-primary" ng-click="stopAccessDevice();"
                                                        ng-class="{false:'disabled', true:''}[startDeviceFlag]">{{msg.end}}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 b-taR">{{msg.executeResult}}</label>
                                            <div class="col-md-9">
                                                <textarea readonly rows="15" class="b-w100-p" id="deviceResult" style="font-family: simsun">{{resultDevice}}</textarea>
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form-horizontal container-fluid col-md-4 " enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.addFile}}</label>
                                            <div class="col-md-7">
                                                <a href="javascript:;" class="btn btn-warning uploader-add-file">
                                                    {{msg.browse}}
                                                    <input type="file" name="device-file"  nv-file-select="" uploader="uploader1" ng-click="clearItems1()">
                                                </a>
                                                <input type="text" readonly="readonly" ng-model="fileItem1.name" value={{msg.currentUploadFile}}..>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.fileManager}}</label>
                                            <div class="col-md-7">
                                                <button class="btn btn-success" ng-click="uploadDeviceFile()"><i class="fa fa-fw fa-upload"></i>&nbsp{{msg.upload}}</button>
                                                <button class="btn btn-primary" ng-click="downloadDeviceFile()"><i class="fa fa-fw fa-download"></i>&nbsp{{msg.download}}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ng-controller="switchToolCtrl" class="tab-pane fade in" id="tab-other-check">
                    <div class="panel-group" id="accordion-other">
                        <div class="panel-gray col-md-12">
                            <div class="panel-heading ">
                                <h4 class="panel-title">
                                    <a class="" data-toggle="collapse" data-parent="#accordion-other" href="#collapseSwitch" >
                                        <i class="fa fa-fw fa-angle-double-down"></i>{{msg.switchPortCheck}}</a>
                                </h4>
                            </div><!--panel-heading -->
                            <div id="collapseSwitch" class="panel-collapse collapse in">
                                <div class="panel-body container-fluid col-md-10">
                                    <p></p>
                                    <form class="form-horizontal container-fluid col-md-12">
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">SNMP{{msg.version}}</label>
                                            <div class="col-md-5 ">
                                                <select name="version">
                                                    <option value="1">1</option>
                                                    <option value="2c">2c</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.targetAddress}}(IPV4/IPv6)</label>
                                            <div class="col-md-5 ">
                                                <input name="ip" class="form-control validate[required, custom[ipv4]]">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.user}}/{{msg.group}}</label>
                                            <div class="col-md-5 ">
                                                <input name="name" class="form-control validate[required]">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.operate}}</label>
                                            <div class="col-md-5 ">
                                                <button class="btn btn-success" ng-click="startSwitchCheck();"
                                                        ng-class="{true:'disabled', false:''}[startSwitchFlag]">{{msg.begin}}</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-5 b-taR">{{msg.executeResult}}</label>
                                            <div class="col-md-7">
                                                <textarea readonly rows="15" class="b-w100-p">{{resultSwitch}}</textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div><!--panel-info-->
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
<script src="/js/assistTool.js"></script>
</body>
</html>