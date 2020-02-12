CT.loginAjax({
  type: 'get',
  url: '/user/queryUserMessage',
  data: '',
  dataType: 'json',
  success: function (data) {
    /*未登录的处理 {error: 400, message: "未登录！"}
    所有的需要登录的接口 没有登录返回这个数据*/
    console.log(data.error)
    if (data.error === 400) {
      /*跳到登录页  把当前地址传递给登录页面  当登录成功按照这个地址跳回来*/
      window.location.href = CT.loginUrl + '?returnUrl=' + location.href;
      console.log(location.href)
      return false;
    }




    layui.use('element', function () {
      var element = layui.element;

      //…
    });

    getData(2);



    function addZero(v) {
      return v < 10 ? '0' + v : v
    }
    function switchTimeFormat(time) {
      const dateTime = new Date(time)
      dateTime.setDate(dateTime.getDate() + 2);
      const year = dateTime.getFullYear()
      const month = dateTime.getMonth() + 1
      const date = dateTime.getDate()
      return `${year}-${addZero(month)}-${addZero(date)}`;
    }


    $(".order-menu li").on("click", function () {
      var state = $(this).attr("orstate");
      $(".order-menu li").removeClass("choose");
      $(this).addClass("choose");
      getData(state);
    });


    function getData(state) {
      $.ajax({
        method: "GET",
        url: "/order/getList",
        data: {
          state: state
        }
      })
        .done(function (res) {
          console.log("请求成功：", res);
          loadList(res.data, state);
        })
        .fail(function (err) {
          console.log("请求失败：", err);
        })
    }


    function loadList(list, state) {
      $(".order-outBox").html("");
      var $button;
      if (state == 1) {
        $button = `<button type="button" class="paymentBTN topay">去付款</button>
    <button type="button" class="paymentBTN cancel">取消订单</button>`
      }
      else if (state == 2) {
        $button = `<button type="button" class="paymentBTN refund">退款</button>`
      }
      else if (state == 3) {
        $button = `<button type="button" class="paymentBTN receive">确认收货</button>
    <button type="button" class="paymentBTN getlog">查看物流</button>`
      }
      else if (state == 4) {
        $button = `<button type="button" class="paymentBTN delete">删除订单</button>`
      }
      for (var i = 0; i < list.length; i++) {
        var $node = $(`
    <div class="order-unpaid unpaid" orid=${list[i].or_id}>
      <!-- 上部分 -->
      <div class="order-unpaid-top">
        <!-- 左部分 -->
        <div class="order-unpaid-top-left">
          <p>
            <span class="prise">￥${list[i].or_price}</span>
          </p>

          <div class="order-unpaid-top-left-bottom">
            <!-- 单号 -->
            <p>单号：<span>${list[i].or_number}</span></p>
            <p>收货地址：<span>${list[i].or_people} ／ ${list[i].or_telephone} ／ ${list[i].or_address}</span></p>
          </div>
        </div>
        <!-- 右部分 -->
        <div class="order-unpaid-top-right">

            ${$button}

        </div>
      </div>
      <!-- 下部分 -->
      <div class="detailBox">
      </div>
    </div>
    `)
        $(".order-outBox").append($node);
        $.ajax({
          method: "GET",
          url: "/order/getDetail",
          data: {
            id: list[i].or_id
          }
        })
          .done(function (res) {
            console.log("请求成功：", res);
            loadDetail(res.data);
          })
          .fail(function (err) {
            console.log("请求失败：", err);
          })
      }
    }

    function loadDetail(list) {
      for (var i = 0; i < list.length; i++) {
        var color = '';
        var stand = '';
        if (list[i].orDe_color) {
          color = `<span>${list[i].orDe_color}</span>`
        }
        if (list[i].orDe_standard) {
          if (list[i].orDe_color) {
            stand = "/"
          }
          stand = stand + `<span>${list[i].orDe_standard}</span>`
        }
        $node = $(`
    <div class="order-unpaid-top-bottom">

    </div>
    <div class="order-unpaid-bottom">
      <!-- 左边图片部分 -->
      <a href="">
        <div class="order-unpaid-bottom-left">
          <img src="../${list[i].mer_img}" alt="${list[i].mer_name}">
        </div>
      </a>

      <!-- 右边 -->
      <div class="order-unpaid-bottom-right">
        <p>
          <span class="goodsName">${list[i].mer_name}</span>
          <span class="goodsPrise">￥${list[i].orDe_price}</span>
          X
          <span class="goodsCount">${list[i].orDe_amount}</span>
        </p>

        <p class="orderGoodsParam">
          ${color}
          ${stand}
        </p>

        <p class="orderDeliveryTime">
          <span class="layui-icon layui-icon-log"></span>
          <span class="DeliveryTime">预计${switchTimeFormat(list[i].or_time)}前发货</span>
        </p>
      </div>
    </div>
    `)
        $(".order-unpaid[orid=" + list[i].or_id + "]").find(".detailBox").append($node);
      }
    }

    // 去付款
    $(".tabBox").on("click", ".topay", function () {
      var oid = $(this).parents(".order-unpaid").attr("orid");
      console.log(oid);
      window.location.href = "/private/to/payment?orderId=" + oid;
    });


    // 取消订单
    $(".tabBox").on("click", ".cancel", function () {
      var oid = $(this).parents(".order-unpaid").attr("orid");
      $.ajax({
        method: "POST",
        url: "/order/delete",
        data: {
          id: oid
        }
      })
        .done(function (res) {
          console.log("请求成功：", res);
          getData(1);
        })
        .fail(function (err) {
          console.log("请求失败：", err);
        })
    });

    // 退款
    $(".tabBox").on("click", ".refund", function () {
      var oid = $(this).parents(".order-unpaid").attr("orid");
      $.ajax({
        method: "POST",
        url: "/order/delete",
        data: {
          id: oid
        }
      })
        .done(function (res) {
          console.log("请求成功：", res);
          getData(2);
        })
        .fail(function (err) {
          console.log("请求失败：", err);
        })
    });


    // 确认收货
    $(".tabBox").on("click", ".receive", function () {
      var oid = $(this).parents(".order-unpaid").attr("orid");
      $.ajax({
        method: "POST",
        url: "/order/receive",
        data: {
          id: oid
        }
      })
        .done(function (res) {
          console.log("请求成功：", res);
          getData(3);
        })
        .fail(function (err) {
          console.log("请求失败：", err);
        })
    });


    // 查看物流
    $(".tabBox").on("click", ".getlog", function () {
      var loid = $(this).parents(".order-unpaid").attr("orid");
      window.location.href = "logistics.html?loid=" + loid;
    });

    // 删除订单
    $(".tabBox").on("click", ".delete", function () {
      var oid = $(this).parents(".order-unpaid").attr("orid");
      $.ajax({
        method: "POST",
        url: "/order/setDetail",
        data: {
          id: oid
        }
      })
        .done(function (res) {
          console.log("请求成功：", res);
          getData(4);
        })
        .fail(function (err) {
          console.log("请求失败：", err);
        })
    });
  }
});