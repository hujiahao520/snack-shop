var imgUrl="";
getData()

layui.use('element', function(){
  var element = layui.element;
  //…
});

// 日期的组件
layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  //执行一个laydate实例
  laydate.render({
    elem: '#userbirth' //指定元素
  });
});

// 表单组件
layui.use('form', function(){
  var form = layui.form;
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    return false;
  });
});



// 文件上传组件
layui.use('upload', function(){
  var upload = layui.upload;
  //执行实例
  var uploadInst = upload.render({
    elem: '#avatar', //绑定元素
    url: '/user/upload', //上传接口
    accept:"images",
    bindAction:".alter-btn",
    choose:(obj)=>{
      var files = obj.pushFile();
      console.log(files);
      obj.preview((index, file, result)=>{
        $(".userImg-box").html(`<img src="${result}" alt="用户头像">`);
      })
    },
    done: function(res){
      imgUrl="img/photo/"+res.url;
    },
    error: function(){
      //请求异常回调
    }
  });
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

function loadData(list){
  imgUrl=list.u_img;
  ;
  $(".userImg-box").html(`<img src="../${imgUrl}" alt="用户头像">`);
  $("#username").val(list.u_name);
  if(list.u_sex){
    $("#usersex option[value="+list.u_sex+"]").attr("selected",true);
  }
  // $("#usersex option[value="+list.u_sex+"]").attr("selected",true);
  $("#userbirth").val(switchTimeFormat(list.u_birth));
}

// 修改信息
$(".alter-btn").on("click",function(){
  $.ajax({
    method:"POST",
    url:"/user/alterData",
    data:{
      img:imgUrl,
      name:$("#username").val(),
      sex:$("#usersex option[selected]").attr("value"),
      birth:$("#userbirth").val()
    }
  })
  .done(function(res) {
    console.log(res);
    window.location.href="index.html";
  })
  .fail(function(err) {
    console.log(err);
  });
})


function addZero (v) {
  return v < 10 ? '0' + v : v
}

function switchTimeFormat (time) {
  const dateTime = new Date(time)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const date = dateTime.getDate()
  return `${year}-${addZero(month)}-${addZero(date)}`;
}