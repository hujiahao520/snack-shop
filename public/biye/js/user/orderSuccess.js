$(function(){
  renderOrderNumber(getOrderListId());
 
})

/* 获取设计设的ID */
// function getDesignerId(){
//   var search = window.location.search;
//   var desId, designerId;
//   if(search) {
//     var urlData = search.split("?")[1].split("&");
//     for (var i=0; i<urlData.length; i++) {
//       if (urlData[i].split('=')[0] == 'desId') {
//         desId = urlData[i].split('=')[1];
//         designerId = Number(desId);
//       }
//     }
//   }
//   return designerId;
// }

/* 获取订单号 */
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

/* 查看订单 */
$(".check-out").on("click", function(){
  location.href ="orderList.html";
})

/* 继续购物 */
$(".continue-shopping").on("click", function(){
  location.href ="../index.html";
})

/* 商品推荐 */
// function getRecommend(id,start,len){
//   $.ajax({
//     url:"/product/getRecommend",
//     method:"GET",
//     data:{
//       des_id:id,
//       len:len,
//       start:start
//     }
//   })
//   .done(function(res){
//     console.log(res);
//     renderRecommend(res.data);
//   })
//   .fail(function(err){
//     console.log(err);
//   })
// }

/* 渲染订单号 */
function renderOrderNumber(num) {
  var orderNumber = num;
  console.log(orderNumber);
  $("#orderNumber").text(orderNumber);
}

/* 渲染设计师推荐函数 */
// function renderRecommend(arr){
//   var productArr = arr.map(function(item){
//     return `
//     <div class="layui-col-sm3  good_box recommend_box">
//       <a href="/public/to/productDetails?mid=${item.mer_id}">
//         <img src="${item.mer_img}" alt="造作星期天沙发" class="good_img">
//         <div class="good_layer recommend_layer">
//           <div>
//             <p class="good_layer_text">${item.mer_description}</p>
//           </div>
//         </div>
//       </a>
//       <div class="good_description">
//         <h3 class="good_name">
//           <a href="">${item.mer_name}</a>
//         </h3>
//         <p class="goods_price">￥<span class="es_font">${item.goo_price}</span>起</p>
//         <span class="goods_color">${item.color_num}色可选</span>
//       </div>
//       <div class="des_layer recommend_des_layer">
//         <span class="layer_txt es_font">Zelect</span>
//         <span class="layer_txt">中国 | 北京</span>
//       </div>
//     </div>
//     `
//   })
//   $('.recomends').html(productArr);
// }

