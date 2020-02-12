$(function () {
  var search = window.location.search
  if (search) {
    var urlData = search.split("?")[1].split("&");
    for (var i = 0; i < urlData.length; i++) {
      if (urlData[i].split('=')[0] == 'loid') {
        var loid = urlData[i].split('=')[1];
        var wuliuId = Number(loid);
      }
    }
  }


  getAllLogistics(wuliuId);

  //发送物流消息
  function getAllLogistics(wuliuId) {
    $.ajax({
      method: "get",
      url: "/address/search",
      dataType: "json",
      data: {
        id: wuliuId
      }
    })
      .done(function (res) {
        console.log("获取得消息：", res.data)
        render(res.data)
      })
      .fail(function (err) {
        console.log("错了吗？", err)
      })
  };

 

  function render(data) {
    var data2 = [];
    for (var i = data.length - 1; i >= 0; i--) {
      data2.push(data[i]);
    }
    
    var arr01 = [], arr02 = [], arr03 = [], arr04 = [], data3 = [];
    for (var j = 0; j <= data2.length - 1; j++) {
      if (data2[j].log_status == 1) {
        arr01.push(data2[j])
      } else if (data2[j].log_status == 2) {
        arr02.push(data2[j])
      } else if (data2[j].log_status == 3) {
        arr03.push(data2[j])
      } else {
        arr04.push(data2[j])
      };
    }
    data3.push(arr04, arr03, arr02, arr01);
    var log_status01 = data2[0].log_status
    if (data.length == 0) {
      interface = interface + "<h2>暂无物流消息</h2>" + "</div>"
    } else {
      // 判断物流状态
      if (log_status01 == 1) {
        b = "25%";
      } else if (log_status01 == 2) {
        b = "50%";
      } else if (log_status01 == 3) {
        b = "75%";
      } else {
        b = "100%";
      }
      var progressBar = ` 
	        <div class="layui-progress-bar layui-bg-green" lay-percent=${b}></div>
 	        <ul class="clear">
                <li>
                    <span>1</span>
                    <p>揽件中</p>
                </li>
                <li>
                    <span>2</span>
                    <p>运输中</p>
                </li>
                <li>
                    <span>3</span>
                    <p>派送中</p>
                </li>
                <li>
                    <span>4</span>
                    <p>已送达</p>
                </li>
            </ul>
        </div>
    `;
      $(".layui-progress").html(progressBar);

      //物流界面
      var wuliu02 = "";
      for (var i = 0; i <= data3.length - 1; i++) {
        if (data3[i].length == 0) {
          continue
        } else {
          var wuliuTop = `
        <li class="layui-timeline-item">
        <i class="layui-icon layui-timeline-axis"></i>
        <div class="layui-timeline-content layui-text">`;
          var date = data3[i][0].logDe_date.split("T");
          var date01 = date[0].split("-");
          var date02 = `
        <h3 class="logis-left">${date01[0]}年${date01[1]}月${date01[2]}日</h3>
        `
          var time = `
        <h3 class="layui-timeline-title">${data3[i][0].logDe_time}</h3>
        `
          if (i == 0) {
            statu = "已送达"
          } else if (i == 1) {
            statu = "派送中"
          } else if (i == 2) {
            statu = "运输中"
          } else {
            statu = "揽件中"
          }
          var logStatus = `
         <h2 class="logis-right">${statu}</h2>
         `
          var position = `
         <p>
         ${data3[i][0].logDe_position}
          </p>
         `;
          var matter = "";
          for (j = 0; j <= data3[i].length - 1; j++) {
            matter += `
           <li>
              ${data3[i][j].logDe_message}
          </li>
          `
          }
        }
        var wuliu = wuliuTop + date02 + time + logStatus + position + "<ul>" + matter + "</ul>";
        var wuliu02 = wuliu02 + wuliu;
      }
    }
    // }   
    $(".layui-timeline").html(wuliu02);
  }
  function getLogisticsPhoto(wuliuId) {
    $.ajax({
      method: "get",
      url: "/address/userlogisPhoto",
      dataType: "json",
      data: {
        id: wuliuId
      }
    })
      .done(function (res) {
        console.log("获取得消息：", res.data)
        renderButtom(res.data)
      })
      .fail(function (err) {
        console.log("错了吗？", err)
      })
  };

  getLogisticsPhoto(wuliuId);

  function renderButtom(data) {
    var Buttom02 = '';
    var Buttom01 = `
   
    `
    for(var i = 0 ;i<data.length;i++){
      var Buttom = `
    <div class="layui-row layui-row-bgc">
    <div class="layui-col-md3 layui-col-sm6 layui-col-xs12 ">
      <div class="grid-demo">
        <img src="../${data[i].mer_img}" alt="这是图片">
      </div>
    </div>
    <div class=" layui-col-md6 layui-col-sm6 layui-col-xs12 order-list">
    <p>商品名称： <span>${data[i].mer_name}</span></p>
    <p>货运单号： <span>${data[i].log_expressid}</span></p>
    <p>承运人： <span>${data[i].log_company}</span></p>
    <p>送货方式： <span>${data[i].log_company}</span></p>
    </div>
    </div>
    `
    var Buttom02 = Buttom02 + Buttom;
    }
    var Buttom03 = Buttom01 + Buttom02
    $(".layui-row-buttom").html(Buttom03);
  }
});