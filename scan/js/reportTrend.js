(function(){
    /**
     * 报告趋势控制器
     */
    function reportTrendController($rootScope, $scope, util,  service){
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("reportTrendCtrl", ['$rootScope', '$scope', 'util', 'service', reportTrendController]);
});