(function(){
    /**
     * 报告对比控制器
     */
    function reportCompareController($rootScope, $scope, util,  service){
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("reportCompareCtrl", ['$rootScope', '$scope', 'util', 'service', reportCompareController]);
});