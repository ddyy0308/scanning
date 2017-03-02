/* *
 * Created by a on 15-6-15.
  */
    var tool = {
        /* 重新加载 */
        reloadPage:function(){
            window.location.reload();
        },

        /* 本地存储 */
        localStorage:{
          'set':function(key, value){return localStorage.setItem(key, value);},
          'get':function(key){return localStorage.getItem(key);},
          'clear':function(){localStorage.clear();}
        }
    };

    /* 配置文件 */
    var config = {
        get:function(key){
            var value;
            $.getJSON('../../../config/_config_.json', function(json){
                value = json[key];
            });
            return value;
        }
    };

    /* 翻页组件 */
    var pagination = {
            /* 翻页默认初始状态值 */
            curPage:'',
            begin:'',
            end:'',
            listNum:'',
            visiblePages:'',

        /* 保存翻页当前状态值 */
            page:{
                curPage:1,
                curBegin:1,
                curEnd:10
            },

        /* 翻页原始组件 */
        paginationOrgContent:undefined,

        /* 获取当前翻页状态 */
        getPageStatus: function () {
          return pagination.page;
        },

        /* 保存翻页组件元素原始控件状态 */
        savePageComponent:function(){
            pagination.paginationOrgContent = $("#custom-pagination").html();
        },

        /* 保存翻页状态 */
        setPageStatus:function(begin, end, page){
            /* 保存翻页状态 */
            pagination.page.curPage = page;
            pagination.page.curBegin = begin;
            pagination.page.curEnd = end;
        },

        /* 显示分页状态栏 */
        showPageList:function(totalNum, curPage, callbackFunc){
            /* 显示默认每页列表个数 */
            pagination._setSelected(pagination.listNum);

            if(totalNum <= 0 || totalNum == undefined)
            {
                /* 总数为0  隐藏分页状态栏 */
                $("#custom-pagination").css('display', 'None');
                return;
            }else{
                $("#custom-pagination").css('display', 'block');
            }

            var visiblePages = pagination.visiblePages;
            var listNum = pagination.listNum;

            var totalPages =totalNum%listNum? (totalNum/listNum +1):(totalNum/listNum);
            if(parseInt(totalPages) < visiblePages)
                visiblePages = totalPages;

            /* 显示当前页起始数 */
            var begin = (curPage-1)*listNum+1;
            var end = begin+listNum-1;
            end = end > totalNum ? totalNum : end;
            var str = begin+"-"+end+"/"+"共"+totalNum+"条";   //$str = 1-10/20
            $($("#pagination-start-end span")[0]).html(str);

            /* 显示页码标签 */
            $("#pagination").twbsPagination({
                totalPages:totalPages,
                visiblePages:visiblePages,
                startPage:curPage,
                first:"首页",
                last:"末页",
                prev:"前一页",
                next:"后一页",
                onPageClick:function(event, page){
                    var begin = (page-1)*listNum+1;
                    var end = begin+listNum-1;
                    callbackFunc(begin,end, page);

                    /* 保存翻页当前状态值 */
                    pagination.setPageStatus(begin,end, page);


                }
            });
        },

        /* 注册事件 */
        event:function(){
            $("#pagination-select-listNum").live('change', function(){
                /* 获取当前选中值 */
                var listNum = $("#pagination-select-listNum").val();
                tool.localStorage.set('listNum', parseInt(listNum));
                tool.localStorage.set('visiblePages', 5);
                tool.reloadPage();
            });
        },

        /* 设置翻页控件第一页默认值 */
        init:function(){
                /* 默认每页显示10条 显示5个页码 */
                var listNum = tool.localStorage.get('listNum') ? parseInt(tool.localStorage.get('listNum')) : 10;
                var visiblePages = tool.localStorage.get('visiblePages') ? parseInt(tool.localStorage.get('visiblePages')) : 5;

                /* 初始化翻页变量 */
                pagination.curPage = 1;
                pagination.begin = (pagination.curPage-1)* listNum +1;
                pagination.end = pagination.begin + listNum -1;
                pagination.listNum = listNum;
                pagination.visiblePages = visiblePages;

                /* 注册翻页监听事件 */
                pagination.event();

                /* 保存翻页当前状态值 */
                pagination.setPageStatus(pagination.begin, pagination.end, pagination.curPage);
        },

        /* 设置当前option值为listNum的选中状态 */
        _setSelected : function(listNum){
            $("#pagination-select-listNum").attr('value', listNum);
        }
    };

