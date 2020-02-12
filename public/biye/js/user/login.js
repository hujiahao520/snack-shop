/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
$(function () {
    layui.use('layer', function () {
        $('body').on('input', 'input', function () {
            var params = {
                tel: $.trim($('[name="name"]').val()),
                pwd: $.trim($('[name="password"]').val())
            };
            if (params.tel && params.pwd) {
                $('#login-btn').css('background-color', 'black');
                $('#login-btn').attr('disabled', false);
            } else {
                $('#login-btn').attr('disabled', true);
                $('#login-btn').css('background-color', '#ccc');
            }
        });

        $('body').on('tap', '.btn_login', function () {
            var params = {
                tel: $.trim($('[name="name"]').val()),
                password: $.trim($('[name="password"]').val())
            };
            if (!/^1\d{10}$/.test(params.tel)) {
                var tel = $('[name="name"]')
                tips = layer.tips("<span style='color:#fff;'>请输入合法手机号</span>", tel, { tips: [1, '#000'], time: 2000, area: 'auto', maxWidth: 500 });
                return false;
            }
            getLoginData(params, function (data) {
                if (data.success) {
                    var returnUrl = CT.userUrl;
                    if (location.search) {
                        returnUrl = location.search.replace('?returnUrl=', '');
                    }
                    location.href = returnUrl;
                } else if (data.error) {
                    layer.msg(data.message, {
                        time: 20000, //20s后自动关闭
                        btn: ['知道了']
                      });
                }
                $('.btn_login').html('登录');
            });
        });
    });
})

var getLoginData = function (data, callback) {
    $.ajax({
        type: 'post',
        url: '/user/login',
        data: data,
        dataType: 'json',
        beforeSend: function () {
            $('.btn_login').html('正在登录...');
        },
        success: function (data) {
            callback && callback(data);
        }
    });
};

