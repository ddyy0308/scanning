/*angular common service*/

/**
 * 公共服务
 */
function AGUtil() {
    var _util = {

        iconID: {'SUCCESS': 6, 'FAIL': 5, 'QUESTION': 3},  // layer attention icon
        direction: {'TOP': 1, 'RIGHT': 2, "DOWN": 3, "LEFT": 4},  // layer tips deirction

        /**
         * 控制台警告日志
         */
        consoleWarn: function (msg) {
            console.warn(msg);
        },

        /**
         * 控制台错误日志
         */
        consoleError: function (msg) {
            console.error(msg);
        },

        /**
         * 控制台断言  @param expression == false , outPut msg in console
         */
        consoleAssert: function (expression, msg) {
            console.assert(expression, msg);
        },

        /**
         * 显示layer 加载图标
         */
        showLayerLoading: function () {
            var index = layer.load(2);
            return index;
        },

        /**
         * 显示layer提示对话框
         */
        showLayerAlert: function (msg, iconID, callbackFunc) {
            layer.alert(msg, {icon: iconID}, function (index) {
                (callbackFunc || angular.noop)();
                layer.close(index);
            });
        },

        /**
         * 显示layer提示对话框
         */
        showLayerConfirm: function (msg, iconID, callBackFunc) {
            layer.confirm(msg, {icon: iconID}, function (index) {
                (callBackFunc || angular.noop)();
                layer.close(index);
            });
        },

        /**
         * 显示提示tips --消息，选择器(#id, .class), 1
         */
        showLayerTips: function (msg, select, direction) {
            layer.tips(msg, select, {tips: direction});
        },

        /**
         * 显示提示msg --消息
         */
        showLayerMsg: function (msg, iconID) {
            if (angular.isDefined(iconID)) {
                layer.msg(msg, {icon: iconID, timeout: 2000});
            } else {
                layer.msg(msg);
            }
        },

        /**
         * 显示输入对话框
         */
        showLayerPrompt: function (title, callBackFunc) {
            layer.prompt({
                title: title,
                value: 'name',
                formType: 0    // 0 text 1 password 2 multilText
            }, function (text, index) {
                (callBackFunc || angular.noop)(text);
                layer.close(index);
            });
        },

        /**
         * 激活bootstrap toolTip插件 --@param millisec: sleep millisec time
         */
        activeTooltip: function (millisec) {
            if (!millisec) {      // "", null, undefined, false, 0, NaN
                $("[data-toggle='tooltip']").tooltip();
            } else {
                millisec = $.isNumeric(parseInt(millisec)) ? parseInt(millisec) : 3000;
                setTimeout(function () {
                    $("[data-toggle='tooltip']").tooltip();
                }, millisec);
            }
        },
        /**
         * 初始化翻页控件
         */
        initPagination: function () {
            pagination.init();
        },

        /**
         * 显示翻页控件
         */
        showPagination: function (totalNum, curPage, callbackFunc) {
            _util.activeTooltip(1000);  // fix not active tooltip by page up/down
            _util.resetPagination(); // clear and reset pagination component or ng-include/ng-view --fix page bug
            pagination.showPageList(totalNum, curPage, callbackFunc);
        },

        /**
         * 重置翻页控件
         */
        resetPagination: function () {
            angular.isUndefined(pagination.paginationOrgContent) || $("#custom-pagination").html(pagination.paginationOrgContent);
        },

        /**
         * 获取当前页码
         */
        getPageStatus: function () {
            return pagination.getPageStatus();
        },

        /**
         * 初始化多语言静态文本 --@param language: 'cn' or 'en'
         */
        initLanguage: function (language, callbackFunc) {
            $.getScript("/common/language/" + language + ".js", callbackFunc);
        },

        /**
         * 弹出或隐藏模态对话框 --@param selector:selector(string), @param:isShow(bool)true or false
         */
        popupModal: function (selector, isShow) {
            var showFlag = isShow ? 'show' : 'hide';
            $(selector).modal(showFlag);
        },

        /**
         * 初始化
         */
        validateInit: function (select) {
            $(select).validationEngine({scroll: false});    // 启动表单验证
        },

        /**
         * 表单元素验证
         */
        validateForm: function (select) {
            return $(select).validationEngine('validate', {scroll: false})
        },

        /**
         * 重置表单数据
         */
        resetForm: function (form) {
            $(form)[0].reset();
        },

        /**************************************************************************/
        /**
         * 模态框表单验证并进行提交表单的判断操作
         */
        checkModalSubmit: function (form, callBackFunc, callBackParam) {
            this.validateInit(form);
            if (this.validateForm(form) == true) {    // 表单验证
                this.popupModal(".modal", false);// 关闭所有modal
                (callBackFunc || angular.noop)(callBackParam);
            }
        },
        /**
         * 显示tab标签
         */
        showTab: function (selector) {
            $(selector).tab('show');
        },

        /**
         * 事件监听
         */
        onEvent: function () {
            $(window).on('resize', function () {
                var height = $(window).height() + 'px';
                $(".b-min-height").css('height', height);
            }).trigger('resize');
        },

        /**
         * 设置cookie
         */
        setCookie: function (c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) +
                ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        },

        /**
         * 获取cookie
         */
        getCookie: function (c_name) {
            var c_start = "";
            var c_end = "";
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return ""
        },

        /**
         * 获取当前用户 --get from cookie
         */
        getUserInfo: function (key) {
            return this.getCookie(key) || 'unknown'
        },

        /**
         * 页面跳转
         */
        locationUrl: function (href) {
            window.location.href = href;
        },

        /**
         * 刷新当前标签页面
         */
        refreshTab: function (millisecond) {
            millisecond = angular.isDefined(millisecond) || 1000;
            window.setTimeout(function () {
                var hash = window.location.hash;
                window.location.href = "#top";
                window.location.href = hash;
            }, millisecond);
        }
    };
    // return _util;
    return $.extend(_util, new AGPageLogic());
}

/**
 * 页面公共业务逻辑
 */
function AGPageLogic() {
    var _logic = {
        /**
         *显示列表
         */
        showList: function (param) {
            var obj = param.in;
            if (obj.data.status == 0) {
                param.out.total = obj.data.totalline;
                param.out.lists = obj.data.value;

                param.cbFunc ? this.showPagination(obj.data.totalline, param.curPage, param.cbFunc) : '';  // 显示分页
            } else {
                this.showLayerAlert(obj.data.value, this.iconID.FAIL);
            }
        },

        /**
         *新建
         */
        create: function (param) {
            var obj = param.in;
            if (obj.data.status == 0) {
                this.showLayerAlert(param.msg_success, this.iconID.SUCCESS);
                (param.cbFunc || angular.noop)();
            } else {
                this.showLayerAlert(param.msg_fail, this.iconID.FAIL);
            }
        },

        /**
         *编辑
         */
        edit: function (param) {
            this.create(param);
        },

        /**
         *删除
         */
        delete: function (param) {
            this.create(param);
        }
    };
    return _logic;
}

/**
 *图表服务
 */
function AGChart() {
    var _chart = {
        pie: {
            pieChart: '',
            option: {
                title: {
                    text: 'title',
                    x: 'center',
                    textStyle: {fontSize: 20},
                    padding: [30, 0, 0, 0]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ['#D03E3E', '#D9C426', '#455A9C', '#5CA483'],
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'center',
                    itemWidth: 22,
                    itemHeight: 16,
                    textStyle: {color: '#000', fontSize: 15},
                    data: ['high', 'medium']
                },
                calculable: true,
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{b} : {c} ({d}%)",
                                    textStyle: {fontSize: 15}
                                }
                            }
                        },
                        data: [
                            {value: 335, name: 'high'},
                            {value: 310, name: 'medium'}
                        ]
                    }
                ]
            },

            _updateOption: function (option) {
                this.option.title.text = option.title;
                this.option.legend.data = option.legendData;
                this.option.series[0].data = option.seriesData;
            },

            init: function (id) {
                this.pieChart = echarts.init(document.getElementById(id));
            },

            /**
             *
             * @param option={'title':,'legendData':[], 'seriesData':'' }
             */
            show: function (option) {
                this._updateOption(option);
                this.pieChart.setOption(this.option);
            }
        },
        bar: {
            barChart: '',
            option: {
                title: {
                    text: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月'],
                        axisLabel: {interval: 0, rotate: 10, textStyle: {fontSize: 14}}
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {textStyle: {fontSize: 15}}
                    }
                ],
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        itemStyle: {normal: {label: {show: true}}},
                        data: [10, 20]
                    }
                ]
            },

            _updateOption: function (option) {
                this.option.title.text = option.title;
                this.option.xAxis[0].data = option.xAxisData;
                this.option.series[0].data = option.seriesData;
            },

            init: function (id) {
                this.barChart = echarts.init(document.getElementById(id));
            },

            /**
             *
             * @param option={'title':,'xAxisData':[], 'seriesData':''}
             */
            show: function (option) {
                this._updateOption(option);
                this.barChart.setOption(this.option);
            }
        }
    };
    return _chart;
}

/**
 * http拦截请求服务
 */
function AGHttpInterceptor($rootScope, $q, util) {
    var interceptor = {
        'request': function (config) { // 请求成功的响应方法
            return config;
        },
        'response': function (res) {   // 响应成功的响应方法
            return $q.resolve(res); // bypass返回承诺的成功回调
        },
        'requestError': function (res) {
            return $q.reject(res);
        },
        'responseError': function (res) {    // http status code != 200
            util.consoleError("http response status code:" + res.status);
            if (res.status == 500) {
                util.showLayerAlert($rootScope.msg.internalError, util.iconID.FAIL);
            } else if (res.status == 404) {
                util.showLayerAlert($rootScope.msg.resourceError + ':' + res.config.url, util.iconID.FAIL);
            }
            return $q.reject(res);  // bypass 返回承诺的失败回调
        }
    };

    return interceptor;
}



