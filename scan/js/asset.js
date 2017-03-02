(function(){
    /**
     * 资产列表控制器
     */
    function assetController($rootScope, $scope, util, service){
        var init = function(){
            $scope.assetList = {total:'', lists:''};
        };

        var show = function(){
            showAssetList(pagination.begin, pagination.end, pagination.curPage);
        };

        var showAssetList = function(begin, end, curPage){
            service.getAllAsset(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.assetList, curPage:curPage, cbFunc:showAssetList});
            });
        };

        init();
        show();
    }

    /**
     * 资产主机详情控制器
     */
    function hostController($scope, util, service, $routeParams){
        var init = function(){
            $scope.detail = {};
        };

        var showHostDetail = function(ip){
            service.getAsset(ip).then(function(obj){
                obj.data.status == 0 ? ($scope.detail = obj.data.value[0]) : util.showLayerAlert(obj.data.value, util.iconID.FAIL)
            });
        };

        init();
        showHostDetail($routeParams.ip);
    }
    
    //main
    angular.module('mainApp').requires.push('ngRoute'); //给mainApp注入路由
    app.controller("assetCtrl", ['$rootScope', '$scope', 'util', 'service', assetController]);
    app.controller("hostCtrl", ['$scope', 'util', 'service', '$routeParams', hostController]);

    //配置路由
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when("/",{             //when(path,route)
            controller:'assetCtrl',
            templateUrl:'/template/route/asset_list.html'
        }).when("/host/:ip",{
            controller:'hostCtrl',
            templateUrl:'/template/route/asset_detail.html'
        }).otherwise({
            redirectTo:'/'
        });
    }]);
})();