/* *
 * 创建mainApp模块
 */
var app = angular.module("mainApp", []);

/* *
 * 创建服务
 */
app.factory('util', [AGUtil]);
app.factory('chart', [AGChart]);
app.factory('model',['$http','$q', AGModel]);   // 创建model服务, 注册$http, $q依赖
app.factory('service',['model', httpService]);   // 创建service，并注册model依赖
app.factory('httpInterceptor', ['$rootScope', '$q', 'util', AGHttpInterceptor]);

/* *
 * 创建自定义过滤器 convertTime @param(str) 00:00:00
 */
app.filter('convertTime', function(){   // covert 00:00:00 to 00时00分00秒
    return function(input){
        if(typeof(input) == "string" && input.search(/\d*:\d*:\d */) >=0){
            var data = input.split(":");
            var ret = data[0]+"时"+data[1]+"分"+data[2]+"秒";
            return ret;
        }
    }
});

/* *
 * 创建自定义指令 --必须以驼峰方式命名并以my-number使用
 */
app.directive('myNumber', ['util', function(util){   // 列表编号,
    return {
        restrict: 'EA',
        replace: true,
        link:function($scope, $element, $attrs){
            var index = parseInt($attrs.index) + parseInt(util.getPageStatus().curBegin);
            $scope.number = index;
        },
        template:'<p>{{number}}</p>'
    }
}]);

/* *
 * 创建应用全局配置 --配置块
 */
app.config(function($httpProvider, $provide){
    /* 定义应用配置服务 */
    $provide.constant('APP_CONFIG',{
        'DEBUG':false
    });

    /* http请求拦截器 */
    $httpProvider.interceptors.push('httpInterceptor');
});

/* *
 * 应用入口 类似main函数 ----运行块
 */
app.run(function($rootScope, util, APP_CONFIG){
    $rootScope.msg={};
    $rootScope.DEBUG=APP_CONFIG.DEBUG;

    /* 待翻页组件加载后，保存翻页组件原始状态 */
    $rootScope.savePageComponent = function(){ // 解决删除、编辑等功能翻页组件问题
        /* 初始化翻页 */
        pagination.savePageComponent();
    };

    /* 获取当前用户 */
    $rootScope.getUserInfo = function(key){
        return util.getUserInfo(key);
    };

    /* 初始化多语言静态文本 */
    util.initLanguage('cn', function(){
        $rootScope.msg = new MSG().scanManager;
        $rootScope.$apply();

    });

    /* 初始化翻页 */
    util.initPagination();

    /* 激活bootstrap Tooltip插件 */
    util.activeTooltip(3000);

    /* 监听全局事件，如window.resize */
    util.onEvent();
});
