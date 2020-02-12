CT.loginAjax({
    type:'get',
    url:'/user/queryUserMessage',
    data:'',
    dataType:'json',
    success:function (data) {
        /*未登录的处理 {error: 400, message: "未登录！"}
        所有的需要登录的接口 没有登录返回这个数据*/
        console.log(data.error)
        if(!data.error === 400){
            $(".huanMing").children().remove();
            $(".huanMing").html(
                '<li><img src="../img/mao2.jpg" class="tou" style="margin: 6px"></li>' +
                '<li><a href="../user/index.html" class="tide">13258298208</a></li>'
            );
            return false;
        }
    },
})
