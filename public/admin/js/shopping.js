$(function () {
    /*1.分类列表分页展示*/
    var currPage = 1;
    var render = function(){
        getqueryCarting({
            page: currPage,
            pageSize: 5
        }, function (data) {
            /*渲染页面*/
            console.log(data);
            $('tbody').html(template('shoppingList',data));
            setPaginator(data.page,Math.ceil(data.total/data.size),render);
        });
    }
    render();
    /*2.分页展示*/
    var setPaginator = function(pageCurr,pageSum,callback){
        /*获取需要初始的元素 使用bootstrapPaginator方法*/
        $('.pagination').bootstrapPaginator({
            /*当前使用的是3版本的bootstrap*/
            bootstrapMajorVersion:3,
            /*配置的字体大小是小号*/
            size:'small',
            /*当前页*/
            currentPage:pageCurr,
            /*一共多少页*/
            totalPages:pageSum,
            /*点击页面事件*/
            onPageClicked:function(event, originalEvent, type, page){
                /*改变当前页再渲染 page当前点击的按钮的页面*/
                currPage = page;
                callback && callback();
            }
        });
    }

    });

/*纯粹的获取数据*/
var getqueryCarting = function (params, callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryCarting',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
}
