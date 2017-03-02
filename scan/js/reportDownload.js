(function(){
    /**
     * 报告下载控制器
     */
    function reportDownloadController($rootScope, $scope, util,  service){

        $scope.downloadFile = function(href){
            location.href = href;
        };

        var init = function(){
            $scope.downloadList = {'total':1, lists:[{status:1, name:'报表名称1', type:'漏洞任务报表',
            time:'2016', unit:'null', creator:'admin', download:{html:"url", word:"url", pdf:""}}]};
        };

        var show = function(){
            showDownloadList(pagination.begin, pagination.end, pagination.curPage);
        };

        var showDownloadList = function(begin, end, curPage){
            service.getReportDownloadList(begin, end).then(function(obj){
                util.showList({in:obj, out:$scope.downloadList, curPage:curPage, cbFunc:showDownloadList});
            });
        };

        //
        init();
        show();
    }

    //main
    app.controller('modalCtrl', ['$rootScope','$scope', 'util', 'service', modalController]);
    app.controller("reportDownloadCtrl", ['$rootScope', '$scope', 'util', 'service', reportDownloadController]);
})();