$(function () {
  //返回登录页
  $('.back-login').on('click', function () {
    window.location.href = CT.loginUrl;
  });

  layui.use('layer', function () {
    //验证码判断
    $("#user-tel").on("input", function () {
      var text = $("#user-tel").val();
      var reCode = $.trim($('#getCode-btn').html())
      if (text && reCode == '获取验证码') {
        $("#getCode-btn").attr("disabled", false);
        $("#getCode-btn").addClass("active");
      } else {
        $("#getCode-btn").attr("disabled", true);
        $("#getCode-btn").removeClass("active");
      }
    });
    $('body').on('click', '#getCode-btn', function () {
      var text = $.trim($("#user-tel").val());
      if (!/^1\d{10}$/.test(text)) {
        tips = layer.tips("<span style='color:#fff;'>请输入合法手机号</span>", $("#user-tel"), { tips: [1, '#000'], time: 2000, area: 'auto', maxWidth: 500 });
        return false;
      }
      //判断手机号是否存在
      $.ajax({
        type: 'post',
        url: '/user/userphone',
        data: {
          mobile: text
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
            var btn = $('#getCode-btn');
            $.ajax({
              type: 'post',
              url: '/tel/get',
              data: {
                telphone: text
              },
              dataType: 'json',
              beforeSend: function () {
                btn.addClass('btn_disabled').html('正在发送中');
              },
              success: function (data) {
                console.log(data.vCode);
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
    //点击下一步，标亮
    $('body').on('input', '.yanInput', function () {
      var text = $.trim($("#user-tel").val());
      var code = $.trim($("#inputCode").val());
      if (text && code) {
        $("#next").attr("disabled", false);
        $("#next").addClass("active");
      } else {
        $("#next").attr("disabled", true);
        $("#next").removeClass("active");
      }
    })
    //点击下一步，判断验证码是否正确，跳转
    $('#next').on('click', function () {
      var text = $.trim($("#user-tel").val());
      var code = $.trim($("#inputCode").val());
      $.ajax({
        method: "POST",
        url: "/tel/confirm",
        data: {
          telphone: text,
          code: code
        }
      })
      .done(function (res) {
        console.log(res);
        if (res.msg == "验证成功") {
          $('.login-f').css('display','none');
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


    //显示手机号码也
    $('body').on('click', '.back-tel', function () {
      $('.login-f').css('display', 'block');
    })

    //失去焦点判断
    $('body').on('input', '.pwdInput', function () {
      var text = $("#user-pwd").val();
      var text2 = $("#user-newpwd").val();
      if (text && text2) {
        $("#register-btn").attr("disabled", false);
        $("#register-btn").addClass("active");
      } else {
        $("#register-btn").attr("disabled", true);
        $("#register-btn").removeClass("active");
      }
    })

    // 点击确认修改
    $("#register-btn").on("click", function () {
      var text = $("#user-pwd").val();
      var text2 = $("#user-newpwd").val();
      if (text2 != text) {
        tips = layer.tips("<span style='color:#fff;'>需与密码一致</span>", $("#user-newpwd"), { tips: [1, '#000'], time: 20000, area: 'auto', maxWidth: 500 });
        return false;
      }
      $.ajax({
        type: 'post',
        url: '/user/userphone',
        data: {
          mobile: $("#user-tel").val()
        },
        dataType: 'json',
      })
        .done(function (res) {
          $.ajax({
            type: 'post',
            url: '/user/updatePassword',
            data: {
              userid: res.data.id,
              password: $("#user-newpwd").val()
            },
            dataType: 'json',
            success: function (data) {
              window.loading = null;
              if (data.success) {
                layer.msg("修改成功", {
                  time: 20000, //20s后自动关闭
                  btn: ['知道了']                                
                });             
                location.href = CT.loginUrl;
              } 
            }
          })
        })
        .fail(function (err) {
          console.log(err);
        })
    })
    
  })
})




