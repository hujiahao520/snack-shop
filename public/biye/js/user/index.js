CT.loginAjax({
  type:'get',
  url:'/user/queryUserMessage',
  data:'',
  dataType:'json',
  success:function (data) {
      /*未登录的处理 {error: 400, message: "未登录！"}
      所有的需要登录的接口 没有登录返回这个数据*/
      console.log(data.error)
      if(data.error === 400){
          /*跳到登录页  把当前地址传递给登录页面  当登录成功按照这个地址跳回来*/
          window.location.href = CT.loginUrl + '?returnUrl=' + location.href;
          console.log(location.href)
          return false;
      }
     
      getData();
      getAddress();
      getLog();
      var aid;
      // 导航
      
      
      // layui.use('element', function(){
      //   var element = layui.element;
        
      //   //…
      // });
      
      
      //物流信息轮播
      layui.use('carousel', function(){
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
          elem: '#log-box'
          ,width: '1020px' //设置容器宽度
          ,height:'180px'
          ,arrow: 'hover' //始终显示箭头
          ,anim: 'updown' //切换动画方式
          ,indicator:'none'
          // ,autoplay:false
        });
      });
      
      
      // 模态框组件
      layui.use('layer', function(){
        var layer = layui.layer;
      
        // 弹出新增地址模态框
        $(".add").on("click",function(){
      
          $(".model-address h3").text("添加收货地址");
          $(".address-btn").addClass("add-ad-btn");
          $("#distpickerBox").html(`
          <div class="ad-input form-box" id="distpicker">
            <select class="province"></select>
            <select class="city"></select>
            <select class="district"></select>
          </div>
          `)
          $("#distpicker").distpicker();
          $(".model-address input").val("");
          layer.open({
            type: 1,
            title: false,
            content: $(".model-address"),
            area: ['870px'],
            cancel:function(){
              $(".address-btn").removeClass("add-ad-btn");
            }
          }); 
        });
      
      
      
        // 弹出修改地址模态框
        $(".ad-content").on("click",'.alter',function(){
          $("#distpickerBox").html(`
          <div class="ad-input form-box" id="distpicker">
            <select class="province"></select>
            <select class="city"></select>
            <select class="district"></select>
          </div>
          `)
          
          layer.open({
            type: 1,
            title: false,
            content: $(".model-address"),
            area: ['870px'],
            cancel:function(){
              $(".address-btn").removeClass("alter-ad-btn"); 
            }
          }); 
          $(".model-address h3").text("修改收货地址");
          $(".address-btn").addClass("alter-ad-btn");
          var id = $(this).parents("li").find("p").attr("ad-id");
          var pro = $(this).parents("li").find(".aPro").text();
          var city = $(this).parents("li").find(".aCity").text();
          var region = $(this).parents("li").find(".aReg").text();
          var detail = $(this).parents("li").find(".aDetail").text();
          var name = $(this).parents("li").find(".aName").text();
          var tel = $(this).parents("li").find(".aTel").text(); 
          $("#distpicker").distpicker({
            province: pro,
            city: city,
            district: region
          });
          $(".model-address .ad-detail").val(detail);
          $(".model-address .ad-name").val(name);
          $(".model-address .ad-tel").val(tel);
          aid=id;
        })
      
      
        // 新增地址
        $(".model-address").on("click",".add-ad-btn",function(){
          var pro = $(".model-address .province option:selected").attr("value");
          var city = $(".model-address .city option:selected").attr("value");
          var region = $(".model-address .district option:selected").attr("value");
          var detail = $(".model-address .ad-detail").val();
          var name = $(".model-address .ad-name").val();
          var tel = $(".model-address .ad-tel").val();
          console.log(pro);
          if(!pro){
            tips =layer.tips("<span style='color:#fff;'>请选择省</span>",$(".province"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!city){
            tips =layer.tips("<span style='color:#fff;'>请选择市</span>",$(".city"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!region){
            tips =layer.tips("<span style='color:#fff;'>请选择区</span>",$(".district"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!detail){
            tips =layer.tips("<span style='color:#fff;'>请输入详细地址</span>",$(".ad-detail"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!name){
            tips =layer.tips("<span style='color:#fff;'>请输入联系人姓名</span>",$(".ad-name"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!tel){
            tips =layer.tips("<span style='color:#fff;'>请输入电话号码</span>",$(".ad-tel"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!/^1\d{10}$/.test(tel)){
            tips =layer.tips("<span style='color:#fff;'>请输入合法电话号码</span>",$(".ad-tel"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else{
            layer.closeAll('tips');
            var address = pro + city + region;
            $.ajax({
              method:"POST",
              url:"/address/addAddress",
              data:{
               address: address,
                addressDetail: detail,
                mobile:tel,
                recipients:name,
                postcode:"637000"
              }
            })
            .done(function(res) {
              console.log(res);
              getAddress();
              layer.closeAll('page'); //关闭所有页面层
            })
            .fail(function(err) {
              console.log(err);
            });
          }
        })
      
        // 修改地址
        $(".model-address").on("click",".alter-ad-btn",function(){
          var pro = $(".model-address .province option:selected").attr("value");
          var city = $(".model-address .city option:selected").attr("value");
          var region = $(".model-address .district option:selected").attr("value");
          var detail = $(".model-address .ad-detail").val();
          var name = $(".model-address .ad-name").val();
          var tel = $(".model-address .ad-tel").val();
          if(!pro){
            tips =layer.tips("<span style='color:#fff;'>请选择省</span>",$(".province"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!city){
            tips =layer.tips("<span style='color:#fff;'>请选择市</span>",$(".city"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!region){
            tips =layer.tips("<span style='color:#fff;'>请选择区</span>",$(".district"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!detail){
            tips =layer.tips("<span style='color:#fff;'>请输入详细地址</span>",$(".ad-detail"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!name){
            tips =layer.tips("<span style='color:#fff;'>请输入联系人姓名</span>",$(".ad-name"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!tel){
            tips =layer.tips("<span style='color:#fff;'>请输入电话号码</span>",$(".ad-tel"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else if(!/^1\d{10}$/.test(tel)){
            tips =layer.tips("<span style='color:#fff;'>请输入合法电话号码</span>",$(".ad-tel"),{tips:[1,'#000'],time:20000,area: 'auto',maxWidth:500});
          }
          else{
              var address = pro + city + region;
            layer.closeAll('tips');
            $.ajax({
              method:"POST",
              url:"/address/updateAddress",
              data:{
                id:aid,
                address: address,
                addressDetail: detail,
                mobile:tel,
                recipients:name,
                postcode:"637000"
              }
            })
            .done(function(res) {
              console.log(res);
              getAddress();
              layer.closeAll('page'); //关闭所有页面层
            })
            .fail(function(err) {
              console.log(err);
            });
          }
        })
      
      
        // 弹出修改密码模态框
        $(".password").on("click",function(){
          $(".first").show();
          $(".next").hide();
          $(".send-code").attr("disabled",true);
          $(".send-code").removeClass("active");
          $(".model-btn").attr("disabled",true);
          $(".model.btn").removeClass("active");
          $("#alter-pwd input").val("");
          layer.open({
            type: 1,
            title: false,
            content: $("#alter-pwd"),
            area: ['500px']
          }); 
        });
      
      
        // 弹出修改手机号模态框
        $(".tel").on("click",function(){
          $(".first").show();
          $(".next").hide();
          $(".send-code2").attr("disabled",true);
          $(".send-code2").removeClass("active");
          $(".model-btn").attr("disabled",true);
          $(".model.btn").removeClass("active");
          $("#alter-tel input").val("");
          layer.open({
            type: 1,
            title: false,
            content: $("#alter-tel"),
            area: ['500px']
          }); 
        });
      });  
      
      
      
      // 地址栏的移入效果
      $(".addressList").on("mouseover",'li',function(){
        $(this).find('.defult-state').hide();
        $(this).find(".operation").show();
      });
      $(".addressList").on("mouseout",'li',function(){
        $(this).find('.defult-state').show();
        $(this).find(".operation").hide();
      });
      
      
      
      
      // 查找user信息
      function getData(){
        $.ajax({
          method: "GET",
          url: "/user/queryUserMessage",
        })
        .done(function(res) {
          loadData(res);
        })
        .fail(function(err) {
          console.log(err);
        });
      }
      
      // 查找地址
      function getAddress(){
        $.ajax({
          method: "GET",
          url: "/address/queryAddress"
        })
        .done(function(res) {
          console.log(res);
          loadAddress(res);
        })
        .fail(function(err) {
          console.log(err);
        });
        
      }
      getLog();
      //查找物流
      function getLog(){
        $.ajax({
          method:"GET",
          url:"/address/userlogis"
        })
        .done(function(res) {
          console.log(res);
          loadLog(res);
        })
        .fail(function(err) {
          console.log(err);
        });
      }
      
      // 动态渲染头像用户名、手机号、邮箱等信息
      function loadData(list){
        // 渲染头像和姓名
        setLocalStorage('userN', list.u_name||"昵称");
        setLocalStorage('userImg', list.u_img||"img/none.jpg");
        setLocalStorage('usertel', list.mobile);
        if(list.u_img){
          $(".user-img").html(`<img src="../${list.u_img}" alt="用户头像">`);
        }else{
          $(".user-img").html(`<img src="../img/none01.jpg" alt="用户头像">`);

        };
        if(list.u_name){
          $(".user-name").text(list.u_name);
        }else{
          $(".user-name").text("亲，还没有昵称");
        }
        
      
        // 渲染手机号
        if(list.mobile){
          var tel = getTel(list.mobile);
          console.log(tel);
          $(".tel .msg-text").text(tel);
        }
        else{
      
        }
      }
      
      // 动态渲染地址
      function loadAddress(list){
        $(".ad-content ul").html("");
        for(var i=0;i<list.length;i++){
          var defult='',setDefault='';
          if(list[i].ad_state){
            defult='<span class="defult-state">默认</span>'
          }
          else{
            setDefault='<div class="setDefault">设为默认地址</div>'
          }
          var $li = $(`
          <li class="clearfix ad-defult">
            <p ad-id="${list[i].id}">${i+1}.
              <span class="address">${list[i].address}</span>
              <span class="aDetail">${list[i].addressDetail}</span> /
              收货人：
              <span class="aName">${list[i].recipients}</span> /
              联系电话：
              <span class="aTel">${list[i].mobile}</span>
            </p>
            
            ${defult}
            <div class="operation">
              <div class="alter">
                <i class="layui-icon layui-icon-edit"></i>   
              </div>
              ${setDefault}
              <div class="delete">
                <i class="layui-icon layui-icon-close"></i>   
              </div>
            </div>
          </li>
          `);
          $(".ad-content ul").append($li);
        }
      }
      
      // 动态渲染物流
      function loadLog(list){
        
        $("#log-box>div").html("");
        if(list.length==0){
          var $node=$(`
          <div>
            <p class="notify">暂无物流数据哦！<a href="../index.html">前往购物</a></p>
          </div>
          `);
          $("#log-box>div").append($node);
        }
        for(var i=0;i<list.length;i++){
          console.log("aaa",list[i]);
          var state = "暂无状态";
          if(list[i].log_status == '1'){
            state = "已揽件";
          }
          else if(list[i].log_status == '2'){
            state = "运输中";
          }
          else if(list[i].log_status == '3'){
            state = "派送中";
          }
          else if(list[i].log_status == "4"){
            state = "已送达";
          }
          var $node = $(`
          <div>
            <a href="logistics.html?loid=${list[i].or_id}"  class="each-up-log clearfix">
              <div class="log-title clearfix">
                <p class="left">最新物流</p>
                <p class="log-time right">${switchTimeFormat(list[i].logDe_date)}</p>
              </div>
              <div class="log-content">
                <div class="log-img">
                  <img src="../${list[i].mer_img}" alt="">
                </div>
                <div class="log-info">
                  <p class="log-state">${state}</p>
                  <p class="log-local">【${list[i].logDe_position}】${list[i].logDe_message}</p>
                </div>
              </div>
            </a>
          </div>
          `);
          $("#log-box>div").append($node);
        }
      }
      
      // 修改手机号
      function alterTel(tel){
        $.ajax({
          method:"POST",
          url:"/tel/alter",
          data:tel
        })
        .done(function(res) {
          console.log(res);
          loadData(res.data[0]);
        })
        .fail(function(err) {
          console.log(err);
        });
      }
      
      
      //密码验证
      $("#pwd2").on("input",function(){
        var text = $("#pwd2").val();
        if(text){
          $(".next-step2").attr("disabled",false);
          $(".next-step2").addClass("active"); 
        }
        else{
          $(".next-step2").attr("disabled",true);
          $(".next-step2").removeClass("active");
        }
      });
      
      $(".next-step2").on("click",function(){
        $.ajax({
          type:"POST",
          url:"/user/getPwd",
          data:{
            password : $("#pwd2").val()
          },
          dataType: 'json',
      
        })
        .done(function (res) {
          if (res.msg == "密码验证成功") {
            $(".first").hide();
            $(".next").show();
          }
          else{
            layer.msg('密码验证失败！！！', {
              time: 20000, //20s后自动关闭
              btn: ['知道了']
            });
          }
        })
        .fail(function (err) {
          console.log(err);
        })
      })
      
      
      // 当手机号输入框失去焦点判断
      $("#tel2").on("input",function(){
        $(".send-code").text("获取验证码")
        var text = $.trim($("#tel2").val());
        if(!text){
          tips =layer.tips("<span style='color:#fff;'>请输入手机号</span>",$("#tel2"),{tips:[1,'#000'],time:2000,area: 'auto',maxWidth:500});
          $(".send-code").attr("disabled",true);
          $(".send-code").removeClass("active");
          $(".alter-tel-btn").attr("disabled",true);
          $(".alter-tel-btn").removeClass("active");
        }
        else if(!/^1\d{10}$/.test(text)){
          tips =layer.tips("<span style='color:#fff;'>请输入合法手机号</span>",$("#tel2"),{tips:[1,'#000'],time:2000,area: 'auto',maxWidth:500});
          $(".send-code").attr("disabled",true);
          $(".send-code").removeClass("active");
          $(".alter-tel-btn").attr("disabled",true);
          $(".alter-tel-btn").removeClass("active");
        }
        else{
          layer.closeAll('tips');
          $(".send-code").attr("disabled",false);
          $(".send-code").addClass("active");
          if($.trim($("#code").val())){
            $(".alter-tel-btn").attr("disabled",false);
            $(".alter-tel-btn").addClass("active");
          }
        }
      });
      
      // 验证码失去焦点判断
      $("#code2").on("input",function(){
        var text = $.trim($("#code2").val());
        if(!text){
          tips =layer.tips("<span style='color:#fff;'>请输入验证码</span>",$(this),{tips:[1,'#000'],time:2000,area: 'auto',maxWidth:500});
          $(".alter-tel-btn").attr("disabled",true);
          $(".alter-tel-btn").removeClass("active");
        }
        else{
          layer.closeAll('tips');
          $(".alter-tel-btn").attr("disabled",false);
          $(".alter-tel-btn").addClass("active");
        }
      });
      
      // 点击发送验证码
      $("#alter-tel .send-code").on("click",function(){ 
        var btn = $('.send-code');
        $.ajax({
          type: 'get',
          url: '/user/vCode',
          data: '',
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
      });
      
      // 修改手机号
      $(".alter-tel-btn").on("click",function(){
        var telphone = $("#tel").val();
        $.ajax({
          type: 'post',
          url: '/user/confirm',
          data: {
            vCode: $.trim($("#code2").val())
          },
          dataType: 'json',
          success: function (data) {
            if (data.success) {
               $.ajax({
                  type:'post',
                  url:'/user/alterTel',
                  data:{
                    username : telphone,
                    mobile : telphone
                  },
                  dataType:'json'
               })
               .done(function (res) {
                console.log(res);
                layer.closeAll('page'); //关闭所有页面层
                // getData();
              })
              .fail(function (err) {
                console.log(err);
              });
            } 
          }
        })
      
        
      })
      
      
      
      // 手机号加密
      function getTel(oldTel){
        return oldTel.substr(0,3)+"****"+oldTel.substr(7,4);
      }
      
      // 邮箱加密
      function getEmail(email){
        return email.split("@")[0]+'@****';
      }
      
      // 设置默认地址
      $(".ad-content").on("click",".setDefault",function(){
        $.ajax({
          method:"POST",
          url:"/address/setDefault",
          data:{
            id:Number($(this).parents("li").find("p").attr("ad-id"))
          }
        })
        .done(function(res) {
          console.log(res);
          getAddress();
        })
        .fail(function(err) {
          console.log(err);
        });
      });
      
      
      // 删除地址
      $(".ad-content").on("click",".delete",function(){
        console.log($(this).parents("li").find("p").attr("ad-id"));
        $.ajax({
          method:"POST",
          url:"/address/deleteAddress",
          data:{
            id:$(this).parents("li").find("p").attr("ad-id")
          }
        })
        .done(function(res) {
          console.log(res);
          getAddress();
        })
        .fail(function(err) {
          console.log(err);
        });
      });
      
      // 时间格式化
      function addZero (v) {
        return v < 10 ? '0' + v : v
      }
      function switchTimeFormat (time) {
        const dateTime = new Date(time)
        const year = dateTime.getFullYear()
        const month = dateTime.getMonth() + 1
        const date = dateTime.getDate()
        const hour = dateTime.getHours()
        const minute = dateTime.getMinutes()
        const second = dateTime.getSeconds()
        return `${year}-${addZero(month)}-${addZero(date)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
      }
      
      
      // 当手机号输入框失去焦点判断
      $("#tel").on("input",function(){
        $(".send-code").text("获取验证码");
        var text = $.trim($("#tel").val());
        var reCode = $.trim($('.send-code').html());
        if (text && reCode == '获取验证码') {
          $(".send-code").attr("disabled", false);
          $(".send-code").addClass("active");
        } else {
          $(".send-code").attr("disabled", true);
          $(".send-code").removeClass("active");
        }
      });
      
      //判断手机号是否正确
      $('body').on('click','.send-code',function(){
          var text = $.trim($("#tel").val());
          if (!/^1\d{10}$/.test(text)) {
            tips = layer.tips("<span style='color:#fff;'>请输入合法手机号</span>", $("#tel"), { tips: [1, '#000'], time: 2000, area: 'auto', maxWidth: 500 });
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
                  var btn = $('.send-code');
                  $.ajax({
                    type: 'get',
                    url: '/user/vCode',
                    data: '',
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
        var text = $.trim($("#tel").val());
        var code = $.trim($("#code").val());
        if (text && code) {
          $(".next-step").attr("disabled", false);
          $(".next-step").addClass("active");
        } else {
          $(".next-step").attr("disabled", true);
          $(".next-step").removeClass("active");
        }
      })
      //点击下一步，判断验证码是否正确，跳转
      $('.next-step').on('click', function () {
          $.ajax({
            type: 'post',
            url: '/user/confirm',
            data: {
              vCode: $.trim($("#code").val())
            },
            dataType: 'json',
            success: function (data) {
              if (data.success) {
                  $(".first").css('display', 'none');
                  $(".next").css('display', 'block');
              } else {
                layer.msg(data.message, {
                  time: 20000, //20s后自动关闭
                  btn: ['知道了']
                });
              }
            }
          })
        })
        //失去焦点判断
        $('body').on('input', '.pwdInput', function () {
          var text = $("#pwd").val();
          var text2 = $("#cpwd").val();
          if (text && text2) {
            $(".alter-pwd-btn").attr("disabled", false);
            $(".alter-pwd-btn").addClass("active");
          } else {
            $(".alter-pwd-btn").attr("disabled", true);
            $(".alter-pwd-btn").removeClass("active");
          }
        })
      
        // 点击确认修改
        $(".alter-pwd-btn").on("click", function () {
          var text = $("#pwd").val();
          var text2 = $("#cpwd").val();
          if (text2 != text) {
            tips = layer.tips("<span style='color:#fff;'>需与密码一致</span>", $("#cpwd"), { tips: [1, '#000'], time: 20000, area: 'auto', maxWidth: 500 });
            return false;
          }
          $.ajax({
            type: 'post',
            url: '/user/userphone',
            data: {
              mobile: $("#tel").val()
            },
            dataType: 'json',
          })
            .done(function (res) {
              $.ajax({
                type: 'post',
                url: '/user/updatePassword',
                data: {
                  userid: res.data.id,
                  password: $("#cpwd").val()
                },
                dataType: 'json',
                success: function (data) {
                  window.loading = null;
                  if (data.success) {
                    layer.msg("修改成功", {
                      time: 20000, //20s后自动关闭
                      btn: ['知道了']                                
                    });             
                    layer.closeAll('page'); //关闭所有页面层
                  } 
                }
              })
            })
            .fail(function (err) {
              console.log(err);
            })
        })
      
      
      
      //取出图片和名字
      function setLocalStorage(key,val){
        window.localStorage.setItem(key,JSON.stringify(val));
      };
      

  },
})













