
/* layui */
layui.use('form', function(){
  var form = layui.form;

  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    return false;
  });
});

/* 获取订单Id */
function getOrderListId(){
  var search = window.location.search;
  var orderId, orderListId;
  if(search) {
    var urlData = search.split("?")[1].split("&");
    for (var i=0; i<urlData.length; i++) {
      if (urlData[i].split('=')[0] == 'orderId') {
        orderId = urlData[i].split('=')[1];
        orderListId = Number(orderId);
      }
    }
  }
  return orderListId;
}

/* 二维码渲染 */
function renderCode(url){
  var $img=`<img id="twoDimension-code" src="${url}" alt="">`;
  $(".code-img").html($img);
}

/* 二维码判断 */
function whichWay(){
  if($("#zhifubao-radio").attr("checked")){
    var url = $("#zhifubao-radio").attr("data-url");
    console.log(url);
    renderCode(url);
    console.log($("#pay-notice").children().html());
    $("#pay-notice").children().html("支付宝");
  }
}
whichWay();

/* 点击支付宝或者微信，局部渲染下面的二维码的图和文字 */
$(".layui-form").on("click",".layui-form-radioed",function(){
  var url = $(this).prev().attr("data-url");
  renderCode(url);
  var way = $(this).prev().attr("value");
  $("#pay-notice").children().html(way);
})


/* 获取订单号的请求 */
$.ajax({
  method: "GET",
  url: "/order/getDetail",
  data:{
    id: getOrderListId()   //将id值传过去
  }
})
.done(function(res){
  console.log(res);
  console.log(res.data);
  renderOrderDetails(res.data);
})
.fail(function(err){
  console.log(err);
})


/* 渲染订单详情 */
function renderOrderDetails(arr) {
  var productArr = arr.map(function(item){
    return `
    <div class="single-good clear">
      <div class="good-img">
        <img src="../${item.mer_img}" class="goodImg" alt="">
      </div>
      <div class="infor-detailes">
        <p>${item.mer_name}</p>
        <p>x<span id="good-amount">${item.orDe_amount}</span></p>
      </div>
    </div>
    `
  })
  $(".inner-box").html(productArr);
}

/* 请求订单价格，地址，备注信息 */
$.ajax({
  method: "POST",
  url: "/order/getOtherOrderDetails",
  data:{
    id: getOrderListId()
  }
})
.done(function(res){
  console.log(res.data);
  renderOtherDetails(res.data);
})
.fail(function(err){
  console.log(err);
})

// 渲染函数
function renderOtherDetails(arr) {
  console.log("aaa");
  for(var i=0; i<arr.length; i++){
    var price = arr[i].or_price;
    orderNumber = arr[i].or_number;
    var remark = arr[i].or_msg;
    var name = arr[i].or_people;
    var phoneNumber = arr[i].or_telephone;
    var address = arr[i].or_address;
    $(".number-2").text(orderNumber);
    $(".total-price").text("￥"+ price);
    $(".address").text(name + "/" + phoneNumber + "/" + getRightAddress(address));
    $(".remark").text(getRightRemark(remark));
  }
}

/* 获得正确的地址格式 */
function getRightAddress(string){
  if(string) {
    var rightAddress = string.replace("/"," ");
    return rightAddress;
  }
}

/* 获得正确的备注消息 */
function getRightRemark(string) {
  if(string) {
    return string;
  } else{
    var a = "无";
    return a;
  }
}

/* 获得设计师ID */
function getDesignerId(arr){
  for(var i=0;i<arr.length;i++){
    return arr[i].des_id;
  }
}

/* 获得当前时间 */
function getTime(){
  var myDate = new Date();      
  var year = myDate.getFullYear();        //获取当前年
  var month = myDate.getMonth()+1;   //获取当前月
  var date = myDate.getDate();            //获取当前日
  var rightTime = year + "-" + month + "-" + date;
  console.log(rightTime);
  return rightTime;
}

/* 点击支付 */
$(".zhifubao-code-block").on("click",".code-img", function(){
    /* 发请求将未支付的状态值修改成已支付 */
    $.ajax({
      method: "POST",
      url: "/order/topay",
      data: {
        time: getTime(),
        id: getOrderListId()
      }
    })
    .done(function(res){
      console.log(res);
      location.href ="orderSuccess.html"+"?orderId="+orderNumber;
    })
    .fail(function(err){
      console.log(err);
    }) 
  
})
