window.CT = {};
CT.getParamsByUrl = function () {
    /*已对象存储地址栏信息*/
    var params = {};
    var search = location.search;
    console.log(location)
    if (search) {
        search = search.replace('?', '');
        /*如果有多个键值对*/
        var arr = search.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];
        });
    };
    
    return params;
};

CT.serialize2object = function (serializeStr) {
    var obj = {};
    /*key=value&k=v*/
    if(serializeStr){
        var arr = serializeStr.split('&');
        arr.forEach(function (item,i) {
            var itemArr = item.split('=');
            obj[itemArr[0]] = itemArr[1];
        })
    }
    return obj;
}
CT.getItemById = function (arr,id) {
    var obj = null;
    arr.forEach(function (item,i) {
        if(item.id == id){
            obj = item;
        }
    });
    return obj;
};
/*
 * 根据数组中对象数据ID获取索引
 * */
CT.getObjectFromId = function(arr,id){
    var object = null;
    for(var i = 0 ; i < arr.length ; i++){
        var item = arr[i];
        if(item && item.id == id){
            object = item;
            break;
        }
    }
    return object;
};
/*
* 根据数组中对象数据获取索引
* */
CT.getIndexFromId = function(arr,id){
    var index = null;
    for(var i = 0 ; i < arr.length ; i++){
        var item = arr[i];
        if(item && item.id == id){
            index = i;
            break;
        }
    }
    return index;
};
/*需要登录的ajax请求*/
CT.loginUrl ='/biye/user/login.html';
CT.cartUrl = '/biye/user/cart.html';
CT.cartUrl02 = '/biye/user/cart02.html';
CT.userUrl = '/biye/user/index.html';
CT.loginAjax = function (params) {
    /*params====> {} */
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success:function (data) {
            /*未登录的处理 {error: 400, message: "未登录！"}
            所有的需要登录的接口 没有登录返回这个数据*/
            console.log(data.error)
            if(data.error === 400){
                /*跳到登录页  把当前地址传递给登录页面  当登录成功按照这个地址跳回来*/
              window.location.href = CT.loginUrl + '?returnUrl=' + location.href;
                console.log(location.href)
                return false;
            }else{
                params.success && params.success(data);
            }
        },
        error:function () {
            mui.toast('服务器繁忙');
        }
    });
};
$(".xiaoguo").on("click",function () {
    var imgId = $(this).children("img").eq(0).attr("src").split("/");
    console.log(imgId)
    if(imgId.length>2){
         id = imgId[2].split(".")[0];
        console.log(id)
    }else{
        id = imgId[1].split(".")[0];
        console.log(id)
    }
    ;
    window.location.href ="/biye/html/product.html?productId="+id;
});
$(".con-bgc").on("click",function () {
    var imgId = $(this).children("img").eq(0).attr("src").split("/");
    console.log(imgId)
    if(imgId.length>2){
        id = imgId[2].split(".")[0];
        console.log(id)
    }else{
        id = imgId[1].split(".")[0];
        console.log(id)
    }
    ;
    window.location.href ="/biye/html/product.html?productId="+id;
});

var b = getLocalStorage("userN");
var c = getLocalStorage("userImg");
var d = getLocalStorage("usertel");


    /*如果有多个键值对*/
    // var arr = search.split('&');
    // arr.forEach(function (item, i) {
    //     var itemArr = item.split('=');
    //     params[itemArr[0]] = itemArr[1];
    // });

    var biaoji = $('.shangshop').html();
huan();
function huan() {
    if(d !=null){
        if(biaoji){
            $(".huanMing").children().remove();
            var dingbu = $(`
            <li><img src="${c}" class="tou"  width="50px";
            height="50px;"></li> 
            <li><a href="user/index.html" class="tide">${b}</a></li>
            <li><a href="user/orderList.html" class="tide">我的订单</a></li>
            <li><a href="#" class="tide btn_outLogin">退出</a></li>
            `);
            $(".huanMing").html(dingbu);
        }else{
            $(".huanMing").children().remove();
            var dingbu = $(`
            <li><img src="../${c}" class="tou"  width="50px";
            height="50px;"></li> 
            <li><a href="../user/index.html" class="tide">${b}</a></li>
            <li><a href="../user/orderList.html" class="tide">我的订单</a></li>
            <li><a href="#" class="tide btn_outLogin">退出</a></li>
            `);
            $(".huanMing").html(dingbu);
        }
       
    }
}

$('body').on('click','.btn_outLogin',function(){
    getLoginOutData(function(data){
        if(data.success){
            localStorage.removeItem("userN")
            localStorage.removeItem("usertel")
            location.href = CT.loginUrl;
        }
    });
});

function getLocalStorage(key){
    let val = JSON.parse(window.localStorage.getItem(key));
    return val;
};

var getLoginOutData = function(callback){
    $.ajax({
        type:'get',
        url:'/user/logout',
        data:'',
        dataType:'json',
        beforeSend:function(){
            $('.btn_login').html('正在退出...');
        },
        success:function(data){
            callback && callback(data);
        }
    });
};