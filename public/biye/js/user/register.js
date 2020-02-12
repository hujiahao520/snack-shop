

$(function () {
    console.log($.trim($('#getCode-btn').html()));
    layui.use('layer', function () {
        $('body').on('input', '.inpu', function () {
            var data = {
                username: $.trim($('[name=mobile]').val()),
                password: $.trim($('[name=pass]').val()),
                rePass: $.trim($('[name=rePass]').val()),
                reCode:$.trim($('#getCode-btn').html())
            }

            if (data.username && data.password && data.rePass && data.reCode=='获取验证码') {
                $('#getCode-btn').css('background-color', 'black');
                $('#getCode-btn').attr('disabled', false);
            } else {
                $('#getCode-btn').attr('disabled', true);
                $('#getCode-btn').css('background-color', '#ccc');
            }
        })

        $('#getCode-btn').on('click', function () {
            var data = {
                username: $.trim($('[name=mobile]').val()),
                password: $.trim($('[name=pass]').val()),
                rePass: $.trim($('[name=rePass]').val()),
                vCode: $.trim($('[name=code]').val())
            }
            if (!/^1\d{10}$/.test(data.username)) {
                tips = layer.tips("<span style='color:#fff;'>请输入合法手机号</span>", $('[name=mobile]'), { tips: [1, '#000'], time: 2000, area: 'auto', maxWidth: 500 });
                return false;
            }
            if (data.password != data.rePass) {
                tips = layer.tips("<span style='color:#fff;'>密码需要一致</span>", $('[name=rePass]'), { tips: [1, '#000'], time: 2000, area: 'auto', maxWidth: 500 });
                return false;
            }
            $.ajax({
                type: 'post',
                url: '/user/usertel',
                data: {
                    mobile: $.trim($('[name=mobile]').val())
                },
                dataType: 'json',
                success: function (data) {
                    window.loading = null;
                    if (!data.success) {
                        layer.msg(data.message, {
                            time: 20000, //20s后自动关闭
                            btn: ['知道了']
                        });
                    } else {
                        var btn = $('.btn_getCode');
                        $.ajax({
                            type: 'post',
                            url: '/tel/get',
                            data: {
                                telphone: $.trim($('[name=mobile]').val())
                            },
                            dataType: 'json',
                            beforeSend: function () {
                                btn.addClass('btn_disabled').html('正在发送中');
                            },
                            success: function (data) {
                                var time = 60;
                                btn.html(time + '秒后再获取');
                                btn.attr('disabled', true);
                                btn.css('background-color', '#ccc');
                                var timer = setInterval(function () {
                                    time--;
                                    btn.html(time + '秒后再获取');
                                    if (time <= 0) {
                                        clearInterval(timer);
                                        btn.html('获取验证码');
                                        btn.css('background-color', 'black');
                                        btn.attr('disabled', false);
                                    }
                                }, 1000);
                            }
                        });
                    }
                }
            })


        })

        $('body').on('input', 'input', function () {
            var data = {
                username: $.trim($('[name=mobile]').val()),
                password: $.trim($('[name=pass]').val()),
                rePass: $.trim($('[name=rePass]').val()),
                vCode:$.trim($('[name=code]').val())
            }
            if (data.username && data.password && data.rePass && data.vCode) {
                $('.register-btn').css('background-color', 'black');
                $('.register-btn').attr('disabled', false);
            } else {
                $('.register-btn').attr('disabled', true);
                $('.register-btn').css('background-color', '#ccc');
            }
        })
        $('body').on('click','.register-btn',function(){
            var telphone = $.trim($('[name=mobile]').val());
            var code = $.trim($('[name=code]').val());
            var data = {
                username: $.trim($('[name=mobile]').val()),
                password: $.trim($('[name=pass]').val()),
                rePass: $.trim($('[name=rePass]').val())
            }
            if (!/^1\d{10}$/.test(data.username)) {
                tips = layer.tips("<span style='color:#fff;'>请输入合法手机号</span>", $('[name=mobile]'), { tips: [1, '#000'], time: 2000, area: 'auto', maxWidth: 500 });
                return false;
            }
            if (data.password != data.rePass) {
                tips = layer.tips("<span style='color:#fff;'>密码需要一致</span>", $('[name=rePass]'), { tips: [1, '#000'], time: 2000, area: 'auto', maxWidth: 500 });
                return false;
            } 
            if(!$('.check').is(':checked')){
                layer.msg("需要同意协议", {
                    time: 20000, //20s后自动关闭
                    btn: ['知道了']
                });
                return false;
            };
            data.mobile = data.username;
            $.ajax({
                method: "POST",
                url: "/tel/confirm",
                data: {
                  telphone: telphone,
                  code: code
                }
              })
              .done(function (res) {
                console.log(res);
                if (res.msg == "验证成功") {
                    $.ajax({
                        type:'post',
                        url:'/user/register2',
                        data:data,
                        dataType:'json',
                        beforeSend:function(){
                            window.loading = 1;
                            $('.btn_register').html('正在提交...');
                        },
                        success:function(data){
                            window.loading = null;
                            if(data.success){
                                layer.msg("注册成功", {
                                    time: 2000, //20s后自动关闭
                                });
                                location.href = CT.loginUrl;
                            }else{
                                layer.msg(data.message, {
                                    time: 20000, //20s后自动关闭
                                    btn: ['知道了']
                                });
                                $('.btn_register').html('注册');
                            }
                        }
                    });
                }
                else{
                  layer.msg('验证码错误！！！', {
                    time: 20000, //20s后自动关闭
                    btn: ['知道了']
                  });
                }
              })
              .fail(function (err) {
                console.log(err);
              });
        
   
        })





    })


    // $('body').on('tap','.btn_register',function(){

    //     if(window.loading) return false;
    //     var data = {
    //         username:$.trim($('[name=mobile]').val()),
    //         password:$.trim($('[name=pass]').val()),
    //         rePass:$.trim($('[name=rePass]').val()),
    //         vCode:$.trim($('[name=code]').val())
    //     }

    //     if(!data.username){
    //         mui.toast('请输入手机号');
    //         return false;
    //     }

    //     if(!/^1\d{10}$/.test(data.username)){
    //         mui.toast('请输入合法手机号');
    //         return false;
    //     }

    //     if(!data.password){
    //         mui.toast('请输入密码');
    //         return false;
    //     }

    //     if(!data.rePass){
    //         mui.toast('请再次输入密码');
    //         return false;
    //     }

    //     if(data.password != data.rePass){
    //         mui.toast('密码需要一致');
    //         return false;
    //     }

    //     if(!data.vCode){
    //         mui.toast('请输入验证码');
    //         return false;
    //     }

    //     if(!/^\d{6}$/.test(data.vCode)){
    //         mui.toast('请输入合法验证码');
    //         return false;
    //     }

    //     data.mobile = data.username;

    //     $.ajax({
    //         type:'post',
    //         url:'/user/register',
    //         data:data,
    //         dataType:'json',
    //         beforeSend:function(){
    //             window.loading = 1;
    //             $('.btn_register').html('正在提交...');
    //         },
    //         success:function(data){
    //             window.loading = null;
    //             if(data.success){
    //                 mui.toast('注册成功！');
    //                 location.href = CT.loginUrl;
    //             }else{
    //                 mui.toast(data.message);
    //                 $('.btn_register').html('注册');
    //             }
    //         }
    //     });
    // }).on('tap','.btn_getCode',function(){
    //     var btn = $('.btn_getCode');
    //     if(btn.hasClass('btn_disabled')) return false;
    //     $.ajax({
    //         type:'get',
    //         url:'/user/vCode',
    //         data:'',
    //         dataType:'json',
    //         beforeSend:function(){
    //             btn.addClass('btn_disabled').html('正在发送...');
    //         },
    //         success:function(data){
    //             console.log(data.vCode);
    //             var time = 60;
    //             btn.html(time+'秒后再获取');
    //             var timer = setInterval(function(){
    //                 time --;
    //                 btn.html(time+'秒后再获取');
    //                 if(time <= 0) {
    //                     clearInterval(timer);
    //                     btn.removeClass('btn_disabled').html('获取认证码');
    //                 }
    //             },1000);
    //         }
    //     });
    // })
})
