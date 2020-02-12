

// 判断是否是从购物车页面跳转来的，是的话执行购物车页面跳转的渲染函数
if (location.search.split("?").join().split("=")[0] == ",mer_id") {
  
} else { //是从商品页面跳转来的
  // 获得购物车id

  // search处理
  var shopId1 = location.search.split("?").join().split("=");
  console.log(shopId1[1]);
  var shop1 = shopId1[1].split(",")
  console.log(shop1)
  console.log(shopId1[2])
  var newshopId = [];
  for (var i = 0; i < shop1.length - 1; i++) {
    newshopId.push(shop1[i])
  }
  // 购物车id数组
  var shopId = newshopId.map(function (item) {
    return item
  });
  // 总价
  var account = shopId1[shopId1.length - 1];

  $(function () {

    function shoDom() {
      // 发送请求获取地址并渲染
      $(function () {

        // 获得购物车id

        // search处理
        var shopId1 = location.search.split("?").join().split("=");
        console.log(shopId1[1]);
        var shop1 = shopId1[1].split(",")
        console.log(shop1)
        console.log(shopId1[2])
        var newshopId = [];
        for (var i = 0; i < shop1.length - 1; i++) {
          newshopId.push(shop1[i])
        }
        // 购物车id数组
        var shopId = newshopId.map(function (item) {
          return item
        });
        // 总价
        var account = shopId1[shopId1.length - 1];

        $.ajax({
          method: "POST",
          url: "/order/getAddress"
        })
          .done(function (res) {
            console.log(res.data);
            // accSetDom(res.data);
            shopcartaccSetDom(res.data);



            console.log($(".netBtn"));



            // console.log(orAdd,orPeople,orTel);


            // 结算按钮点击时发请求向数据库加入数据
            $(".netBtn").on("click", function () {

              // 拿到价格
              var shopId1 = location.search.split("?").join().split("=");
              console.log(shopId1[1]);
              var shop1 = shopId1[1].split(",")
              console.log(shop1)
              console.log(shopId1[2])
              var newshopId = [];
              for (var i = 0; i < shop1.length - 1; i++) {
                newshopId.push(shop1[i])
              }
              // 购物车id数组
              var shopId = newshopId.map(function (item) {
                return item
              });
              // 总价
              var account = shopId1[shopId1.length - 1];
              // 收货人
              var orPeople = $(".settle-accountsbox-left-name").text();

              // 电话
              var orTel = $(".settle-accountsbox-left-num").text();

              // 地址
              var orAddress = $(".settle-accountsbox-left-address").text() || $(".addressDefaultText").attr("data-address");

              // 详细地址
              var orDetail = $(".settle-accountsbox-left-addressDet").text();

              var orAdd = orAddress + "/" + orDetail;
              console.log(orTel);

              // search处理
              var shopId1 = location.search.split("?").join().split("=");
              console.log(shopId1[1]);
              var shop1 = shopId1[1].split(",")
              console.log(shop1)
              console.log(shopId1[2])
              var newshopId = [];
              for (var i = 0; i < shop1.length - 1; i++) {
                newshopId.push(shop1[i])
              }
              // 购物车id数组
              var shopId = newshopId.map(function (item) {
                return item
              });
              console.log(shopId);
              if (!$(".deal-check").is(":checked")) {
                console.log('sss')
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.msg("请勾选协议");
                });
                return
              }
            


              var message = $(".order-remark").val()
              $(".order-remark").val("");
              console.log(shopId);
              $.ajax({
                method: "POST",
                url: "/order/newaddOrder",
                data: {
                  orTime: CurentTime(),
                  orPri: account,
                  orPeople: orPeople,
                  orTel: orTel,
                  orAdd: orAdd,
                  orNumber: ordNumber(),
                  message: message
                }
              })
                .done(function (res) {
                  console.log("发送请求成功", res.data.insertId);
                  // 成功后再次请求数据
                  location.href = "payment.html" + "?orderId=" + res.data.insertId;
                  var orId = res.data.insertId;
                  for (var i = 0; i < shopId.length; i++) {
                    console.log(shopId)
                    $.ajax({
                      method: "POST",
                      url: "/order/getShopcart",
                      data: {
                        id: shopId[i]
                      }
                    })
                      .done(function (res) {
                        console.log("请求成功：", res.data);
                        var merId = res.data.map(function (item) {
                          return item.merId 
                        })

                        console.log(merId);
                        var color = res.data.map(function (item) {
                          return item.coVal
                        })

                        var stanV = res.data.map(function (item) {
                          return item.stanVal
                        })

                        var count = res.data.map(function (item) {
                          return item.shoAmount
                        })

                        var pri = res.data.map(function (item) {
                          return item.gooPri
                        })
                        $.ajax({
                          method: "POST",
                          url: "/order/addorderdetail",
                          data: {
                            orId: orId,
                            merid: merId.join(),
                            color: color.join(),
                            stanV: stanV.join(),
                            count: count.join(),
                            pri: pri.join()
                          }
                        })
                          .done(function (res) {
                            console.log("插入成功。");
                            console.log(shopId)
                            for (var i = 0; i < shopId.length; i++) {
                              // search处理
                              var shopId1 = location.search.split("?").join().split("=");
                              console.log(shopId1[1]);
                              var shop1 = shopId1[1].split(",")
                              console.log(shop1)
                              console.log(shopId1[2])
                              var newshopId = [];
                              for (var i = 0; i < shop1.length - 1; i++) {
                                newshopId.push(shop1[i])
                              }
                              // 购物车id数组
                              var shopId = newshopId.map(function (item) {
                                return item
                              });
                              $.ajax({
                                method: "DELETE",
                                url: "/shopcart/removeShop",
                                data: {
                                  shoCart_id: shopId[i]
                                }
                              })
                                .done(function (res) {
                                  console.log("请求成功：", res.data)
                                })
                                .fail(function (err) {
                                  console.log(err);
                                })
                            }


                          })
                          .fail(function (err) {
                            console.log(err)
                          })
                      })

                      .fail(function (err) {
                        console.log(err);
                      })
                  }

                })
                .fail(function (err) {
                  console.log(err);
                })

            })

            // //  $.ajax({
            //   method: "POST",
            //   url: "/order/newaddOrder",
            //   data: {
            //     merId: res.data[i].merId,
            //     color: res.data[i].coVal,
            //     stanv: res.data[i].stanVal,
            //     count: res.data[i].shoAmount,
            //     pri: res.data[i].gooPri
            //   }
            // })

            // 地址渲染成功后，遍历发请求渲染商品信息
            console.log(shopId)
            for (var i = 0; i < shopId.length; i++) {
              console.log(shopId[i])
              $.ajax({
                method: "POST",
                url: "/order/getShopcart",
                data: {
                  id: shopId[i]
                }
              })
                .done(function (res) {
                  console.log("请求成功：", res.data);
                  shopcartmerDom(res.data);
                })

                .fail(function (err) {
                  console.log(err);
                })
            }
          })
          .fail(function (err) {
            console.log(err);
          })
      })
    }
    shoDom()

    // 地址渲染函数
    function shopcartaccSetDom(addressArr) {
      // search处理
      var shopId1 = location.search.split("?").join().split("=");
      console.log(shopId1[1]);
      var shop1 = shopId1[1].split(",")
      console.log(shop1)
      console.log(shopId1[2])
      var newshopId = [];
      for (var i = 0; i < shop1.length - 1; i++) {
        newshopId.push(shop1[i])
      }
      // 购物车id数组
      var shopId = newshopId.map(function (item) {
        return item
      });
      // 总价
      var account = shopId1[shopId1.length - 1];

      var div = `

  <div class="row no-gutters addressBox">
  <div class="address col-lg-12">
    <h3 class="address-zi">收货地址</h3>

  
    <div class="addressDefault">
      
    <!-- 添加地址的模态框 -->
    <div class="model-address" id="addAddress">
    <h3>添加收货地址</h3>
    <p>以下均为必填项，请认真填写，避免收货时发生意外</p>
    <div id="distpickerBox">

    </div>
    <div class=" form-box">
      <input type="text" class="ad-detail" placeholder="详细地址" name="ad-detail">
    </div>
      <h3>添加收货人信息</h3>
      <div class="form-box">
        <input type="text" name="ad-name" class="ad-name" placeholder="收货人姓名">
          <input type="text" name="ad-tel" class="ad-tel" placeholder="收货人手机号码">
    </div>
          <div class="form-box">
            <button type="button" class="address-btn">确认</button>
          </div>
    </div>




      <div class="addressAdd">
        <p>
          <span class="addressAddIcon"></span>
          <span>添加收货地址</span>
        </p>
      </div>


      <div class="new-model-address" id="addAddress">
        <h3>新增收货地址</h3>
        <p>以下均为必填项，请认真填写，避免收货时发生意外</p>
        <div data-toggle="distpicker" class="ad-input form-box">
          <select data-province="---- 选择省 ----" class="province" name="ad-province"></select>
          <select data-city="---- 选择市 ----" class="city" name="ad-city"></select>
          <select data-district="---- 选择区 ----" class="district" name="ad-district"></select>
        </div>
        <div class=" form-box">
          <input type="text" class="ad-detail" placeholder="详细地址" name="ad-detail">
        </div>
        <h3>添加收货人信息</h3>
        <div class="form-box">
          <input type="text" name="ad-name" class="ad-name" placeholder="收货人姓名">
          <input type="text" name="ad-tel" class="ad-tel" placeholder="收货人手机号码">
        </div>
        <div class="form-box">
          <button type="button" class="address-btn">确认</button>
        </div>
      </div>


    </div>



  </div>
</div>

<!-- 商品详情栏 -->
  <div class="row no-gutters goodsBox">
  <div class="goodsDetails col-lg-12">
  <h3 class="goodsList">商品清单</h3>
  <h3 class="goodsSingle">单品</h3>

  
  </div>
  </div>


<!-- 发票栏 -->
<div class="row">
  <div class="col-lg-12  invoice">
    <div class="invoiceNei">
      
      <h3 class="order-remark-h3">订单备注</h3>
      <!-- 文本域 -->
      <textarea class="order-remark" placeholder="在此处添加备注"></textarea>
    </div>
  </div>
</div>

<!-- 合计栏 -->
  <div class="row">
    <div class="col-lg-12 goodstotal">
    <div class="goodstotalBox">
    <ul class="goodstotalBox-ul">
      <li class="goodstotalBox-li">
        <span class="li-1">商品合计</span>
        <span class="li-2">￥${account}</span>
      </li>
      
      <li class="goodstotalBox-li">
        <span class="li-1">实付</span>
        <span class="li-2 factPay">￥${account}</span>
      </li>
    </ul>
  
    <!-- 协议 -->
  <div class="deal">
      <div class="deal-text">
        <input type="checkbox" class="deal-check" checked>
          <p>我已同意《造作物流及售后协议》</p>
    </div>
      </div>
    </div>
    </div>
  </div>


<!-- 结算区 -->
<div class="row settle-accounts-outBox">
  <div class="col-lg-12 settle-accounts">
    <div class="settle-accountsbox">
    <!-- 右边部分 -->
    <div class="settle-accountsbox-right">
      <span class="net-text">实付：</span>
      <span class="net">￥${account}</span>
      <button type="button" class="netBtn">结算</button>
    </div>

      
    </div>
  </div>
</div>


  `;




  $(".foot").after(div);




      var morenAddress = [];
      for (var i = 0; i < addressArr.length; i++) {
        if (addressArr[i].state == 1) {
          morenAddress.push(addressArr[i]);
        }
      }
      console.log(morenAddress);
      for (var i = 0; i < morenAddress.length; i++) {
        var morendiv = `
    <div class="addressDefaultText addressDefaultText-style">
          <div class="f1" ad-id="${ morenAddress[i].id}">
            <p class="f1-p1">
              <span class="f1-name">${morenAddress[i].adName}</span>
              <span class="f1-num">${morenAddress[i].tel}</span>
            </p>
            <p>
              <span class="f1-pro">${morenAddress[i].pro}</span>
             
            </p>
            <p class="f1-addressdetails">${morenAddress[i].detail}</p>


            <div class="defaultIcon">
              <span>默认</span>
            </div>

            <div class="dustbin">
            <i class="layui-icon layui-icon-delete" style="font-size: 20px; color: #1E9FFF;"></i>
          
            </div>


            <div class="modifiAddress">
            <i class="layui-icon layui-icon-edit" style="font-size: 20px; color: #1E9FFF;"></i>
            </div>
          </div>


         

                <div class="morenStyle addressDefaultText-badge">

                </div>
              </div>
              `;

        var divAddress = `
        <div class="settle-accountsbox-left">
          <p>
            寄送至：
            <span class="settle-accountsbox-left-name">${morenAddress[i].adName}</span>
            <span class="settle-accountsbox-left-num">${morenAddress[i].tel}</span>
            <span class="settle-accountsbox-left-address">${morenAddress[i].pro}</span><br>
            <span class="settle-accountsbox-left-addressDet">${morenAddress[i].detail}</span>
          </p>
        </div>
      `;
        $(".settle-accountsbox").prepend(divAddress);
        $(".addressDefault").prepend(morendiv);
      }



      var otherAddress = [];
      for (var i = 0; i < addressArr.length; i++) {
        if (addressArr[i].state == 0) {
          otherAddress.push(addressArr[i]);
        }
      }
      console.log(otherAddress);
      for (var i = 0; i < otherAddress.length; i++) {
        var otherdiv = `
    <div class="addressDefaultText">
                <div class="f1" ad-id="${  otherAddress[i].id}">
                  <p class="f1-p1">
                    <span class="f1-name">${otherAddress[i].adName}</span>
                    <span class="f1-num">${otherAddress[i].tel}</span>
                  </p>
                  <p>
                    <span class="f1-pro">${otherAddress[i].pro}</span>
                   
                  </p>
                  <p class="f1-addressdetails">${otherAddress[i].detail}</p>


                  <div class="defaultIcon">
                    <span>设为默认</span>
                  </div>

                  <div class="dustbin">
                  <i class="layui-icon layui-icon-delete" style="font-size: 20px; color: #1E9FFF;"></i>
                  </div>


                  <div class="modifiAddress">
                  <i class="layui-icon layui-icon-edit" style="font-size: 20px; color: #1E9FFF;"></i>
                  </div>
                </div>

                <div class="morenStyle">

                </div>
              </div>
              `;
        $(".addressDefault").prepend(otherdiv);
      }

      // 切换地址功能
      $(".addressDefaultText").on("click", function () {

        $(".settle-accountsbox-left").remove();
        var nameAdd = $(this).find(".f1-name").text();
        var numAdd = $(this).find(".f1-num").text();
        var proAdd = $(this).find(".f1-pro").text();
        var cityAdd = $(this).find(".f1-city").text();
        var regionAdd = $(this).find(".f1-region").text();
        var detailAdd = $(this).find(".f1-addressdetails").text();
        var newAddr = `
        <div class="settle-accountsbox-left">
          <p>
            寄送至：
            <span class="settle-accountsbox-left-name">${nameAdd}</span>
            <span class="settle-accountsbox-left-num">${numAdd}</span>
            <span class="settle-accountsbox-left-address">${proAdd}</span><br>
            <span class="settle-accountsbox-left-addressDet">${detailAdd}</span>
          </p>
        </div>
    `
        $(".settle-accountsbox").prepend(newAddr);
        $(this).addClass("addressDefaultText-style");
        console.log()
        if ($(this).siblings().is(".addressDefaultText")) {
          $(this).siblings().removeClass("addressDefaultText-style")
        }
        $(this).find(".morenStyle").addClass("addressDefaultText-badge");
        $(this).siblings().find(".morenStyle").removeClass("addressDefaultText-badge");
        var add = $(".settle-accountsbox-left-address").text()
        var addte = $(".settle-accountsbox-left-addressDet").text()
        var newadd = add + "/" + addte

        $(this).attr("data-address", newadd)
      })


      // console.log(newadd);
      // 删除地址功能
      $(".f1").on("click", ".dustbin", function () {
          var id = $(this).parent().attr("ad-id")
        mui.confirm('您确认是否删除该地址？', '地址删除', ['确认', '取消'], function(e) {
          if (e.index == 0) {
            $.ajax({
              method:"POST",
              url: "/address/deleteAddress",
              data: {
                id:id
              }
            })
              .done(function (res) {
                console.log(res);
                $(".body").empty();
                // 重渲染
                shoDom();
              })
              .fail(function (err) {
                console.log(err);
              });


          } else {
              // TODO
          }
      })
  });

        
  
      

      // 设为默认地址功能
      // $(".f1").on("click","defaultIcon",function() {
      //   console.log($(this).parent().attr("ad-id"))
      // })

      // 模态框组件
      layui.use('layer', function () {
        var layer = layui.layer;
        // 弹出新增地址模态框
        $(".addressAdd").on("click", function () {
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
            cancel: function () {
              $(".address-btn").removeClass("add-ad-btn");
            }
          });
        });


        // 弹出修改地址模态框
        $(".f1").on("click", ".modifiAddress", function () {
          console.log()
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
            cancel: function () {
              $(".address-btn").removeClass("alter-ad-btn");
            }
          });
          $(".model-address h3").text("修改收货地址");
          $(".address-btn").addClass("alter-ad-btn");
          // var id = $(this).parents("li").find("p").attr("ad-id");
          // var pro = $(this).parents("li").find(".aPro").text();
          // var city = $(this).parents("li").find(".aCity").text();
          // var region = $(this).parents("li").find(".aReg").text();
          // var detail = $(this).parents("li").find(".aDetail").text();
          // var name = $(this).parents("li").find(".aName").text();
          // var tel = $(this).parents("li").find(".aTel").text();
          var id = $(this).parent().attr("ad-id");
          var pro = $(this).parent().children().find(".f1-pro").text()
          var city = $(this).parent().children().find(".f1-city").text()
          var region = $(this).parent().children().find(".f1-region").text()
          var detail = $(this).parent().find(".f1-addressdetails").text()
          var name = $(this).parent().children().find(".f1-name").text()
          var tel = $(this).parent().children().find(".f1-num").text()
          $("#distpicker").distpicker({
            province: pro,
            city: city,
            district: region
          });
          $(".model-address .ad-detail").val(detail);
          $(".model-address .ad-name").val(name);
          $(".model-address .ad-tel").val(tel);
          aid = id;
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
                postcode:"637000",
                state: 0
              }
            })
            .done(function(res) {
              console.log(res);
              $(".body").empty();
              // 重渲染
              shoDom();             
              layer.closeAll('page');//关闭所有页面层
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
              $(".body").empty();
              // 重渲染
              shoDom();
             
              layer.closeAll('page');//关闭所有页面层
              })
            .fail(function(err) {
              console.log(err);
            });
          }
        })
      });



    }

    // 商品渲染函数
    function shopcartmerDom(arr) {
      var div = `
      <!-- 商品框 -->
      <div class="goods">
        <!-- 左边图片部分 -->
        <div class="goods-left-img" style="background: url(../${arr[0].merImg}) no-repeat center;background-size: cover;">
    
        </div>
    
        <!-- 右边信息部分 -->
        <div class="goods-right-info">
          <div class="table-responsive">
            <table class="table">
              <tr>
                <td class="goodsname">
                  ${arr[0].merName} |
                  <p><span class="goodsCloro">${arr[0].coVal}</span>/<span class="goodsXinghao">${arr[0].stanVal}</span></p>
                </td>
                <td class="deliverTime">预计2019-10-25前发货</td>
                <td>¥${arr[0].gooPri}</td>
                <td>x${arr[0].shoAmount}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      `;

      $(".goodsDetails").append(div);


    }






  })

}

// 获取下单时间函数
function CurentTime() {
  var now = new Date();

  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var day = now.getDate();            //日

  var hh = now.getHours();            //时
  var mm = now.getMinutes();          //分
  var ss = now.getSeconds();           //秒

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hh < 10) {
    hh = '0' + hh;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (ss < 10) {
    ss = '0' + ss;
  }

  //时分秒
  var result = year + "-" + month + "-" + day;

  //年月日时分秒
  //      var result = year + '-' + month + '-' + day + ' ' + hh + ":" + mm + ":" + ss;
  return result;
}

// 随机机获得订单编号函数
function ordNumber() {
  var number = Math.ceil(Math.random() * 10000000000000000000);
  return number;
}






        // accSetDom();

        // 弹出修改地址模态框
// $(".ad-content").on("click", '.alter', function () {
//   $("#distpickerBox").html(`
//     <div class="ad-input form-box" id="distpicker">
//       <select class="province"></select>
//       <select class="city"></select>
//       <select class="district"></select>
//     </div>
//     `)

//   layer.open({
//     type: 1,
//     title: false,
//     content: $(".model-address"),
//     area: ['870px'],
//     cancel: function () {
//       $(".address-btn").removeClass("alter-ad-btn");
//     }
//   });
//   $(".model-address h3").text("修改收货地址");
//   $(".address-btn").addClass("alter-ad-btn");
//   var id = $(this).parents("li").find("p").attr("ad-id");
//   var pro = $(this).parents("li").find(".aPro").text();
//   var city = $(this).parents("li").find(".aCity").text();
//   var region = $(this).parents("li").find(".aReg").text();
//   var detail = $(this).parents("li").find(".aDetail").text();
//   var name = $(this).parents("li").find(".aName").text();
//   var tel = $(this).parents("li").find(".aTel").text();
//   $("#distpicker").distpicker({
//     province: pro,
//     city: city,
//     district: region
//   });
//   $(".model-address .ad-detail").val(detail);
//   $(".model-address .ad-name").val(name);
//   $(".model-address .ad-tel").val(tel);
//   aid = id;
// })

// 新增地址
// $(".model-address").on("click", ".add-ad-btn", function () {
//   var pro = $(".model-address .province option[selected]").attr("value");
//   var city = $(".model-address .city option[selected]").attr("value");
//   var region = $(".model-address .district option[selected]").attr("value");
//   var detail = $(".model-address .ad-detail").val();
//   var name = $(".model-address .ad-name").val();
//   var tel = $(".model-address .ad-tel").val();
//   $.ajax({
//     method: "POST",
//     url: "/address/add",
//     data: {
//       province: pro,
//       city: city,
//       region: region,
//       detail: detail,
//       tel: tel,
//       name: name
//     }
//   })
//     .done(function (res) {
//       console.log(res);
//       getAddress();
//       layer.closeAll('page'); //关闭所有页面层
//     })
//     .fail(function (err) {
//       console.log(err);
//     });
// })


// 修改地址
// $(".model-address").on("click", ".alter-ad-btn", function () {
//   var pro = $(".model-address .province option:selected").attr("value");
//   var city = $(".model-address .city option:selected").attr("value");
//   var region = $(".model-address .district option:selected").attr("value");
//   var detail = $(".model-address .ad-detail").val();
//   var name = $(".model-address .ad-name").val();
//   var tel = $(".model-address .ad-tel").val();
//   console.log(pro, city, region, detail, name, tel);
//   $.ajax({
//     method: "POST",
//     url: "/address/change",
//     data: {
//       id: aid,
//       province: pro,
//       city: city,
//       region: region,
//       detail: detail,
//       tel: tel,
//       name: name,
//       state: 0
//     }
//   })
//     .done(function (res) {
//       console.log(res);
//       getAddress();
//       layer.closeAll('page'); //关闭所有页面层
//     })
//     .fail(function (err) {
//       console.log(err);
//     });
// })












