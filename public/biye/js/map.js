
function initMap(){
  createMap();//创建地图
  setMapEvent();//设置地图事件
  addMapControl();//向地图添加控件
  // 定义坐标信息
  var markers = [
    {content:"成都市温江区成都师范学院第一教学楼B座",title:"零食一店",position:{lat:30.684059,lng:103.835332}},
    {content:"成都市温江区成都师范学院学生公寓7号院",title:"零食二店",position:{lat:30.679474,lng:103.834357}},
    {content:"成都市温江区成都师范学院生活广场",title:"零食三店",position:{lat:30.680262,lng:103.834694}}
  ];
  // 向地图中添加坐标点
  addMapOverlay(markers);
}
function createMap(){
  // 创建地图
  map = new BMap.Map("map");
  // 设置地图中心位置
  map.centerAndZoom(new BMap.Point(103.835336,30.68211),17);
}
function setMapEvent(){
  map.enableScrollWheelZoom();// 启动鼠标滚轮操作
  map.enableKeyboard();//开启键盘操作
  map.enableDragging();////启用地图拖拽事件
  map.enableDoubleClickZoom();////启动鼠标双击放大
}
function addClickHandler(target,window){
  target.addEventListener("click",function(){
    target.openInfoWindow(window);
  });
}
function addMapOverlay(markers){
  for(var index = 0; index < markers.length; index++ ){//遍历数组
    var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);//取出坐标点
    var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
      imageOffset: new BMap.Size(3,2) // 设置图片偏移
    })});//为坐标点设置标记
    var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});//为坐标点设置标题
    var opts = {
      width: 50,
      title: markers[index].title,
      enableMessage: false
    };
    var infoWindow = new BMap.InfoWindow(markers[index].content,opts);//设置信息窗口
    marker.setLabel(label);
    addClickHandler(marker,infoWindow);//点击显示内容
    map.addOverlay(marker);//将标注添加到地图中
  };
}
//向地图添加控件
function addMapControl(){
  var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT});// 添加比例尺控件
  scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
  map.addControl(scaleControl);
  var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_LARGE});//// 添加默认缩放平移控件
  map.addControl(navControl);
  var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});////添加默认缩略图控件
  map.addControl(overviewControl);
}
function changepoint(len,lat){//改变地图中心点
  map.centerAndZoom(new BMap.Point(len,lat),18);
}
var map;
initMap();