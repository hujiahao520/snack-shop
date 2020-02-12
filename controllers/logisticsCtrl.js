const logisticsModel = require("../models/logisticsModel");

// 物流控制器
module.exports = {
  //返回所有物流信息 
  getLogistics: (req, res) => {
   console.log("返回所有物流信息：", req.query);
    //查找数据库
    logisticsModel.findAllLogisticsModel(req.query.id, (err, result) => {
      if (err) return res.json({
        msg: "物流查询失败",
        state: "0" //查找出错
      });
      res.json({
        msg: "物流查询成功",
        state: "200",//查找成功
        data:result //查询结果返回
      });
    });
  },
  // 返回用户的商品图片
  getLogisticsPhoto:(req,res)=>{
    console.log("返回用户的商品图片:",req.query);
    //查找数据库
    logisticsModel.findLogisticsPhotoModel(req.query.id,(err,result)=>{
      if(err) return res,json({
        msg: "物流查询失败",
        state: "0" //查找出错
      });
      res.json({
        msg: "物流查询成功",
        state: "200",//查找成功
        data:result //查询结果返回
      });
    });
  },
  //返回用户的物流信息
  getUserLogistics:(req,res)=>{
    // console.log("返回用户物流信息：", req.query);
    // var uid=req.session.userId;
    var uid=1
    //查找数据库
    logisticsModel.findUserLogisticsModel(uid, (err, result) => {
      if (err) return res.json({
        msg: "物流查询失败",
        state: "0" //查找出错
      });
      res.json({
        msg: "物流查询成功",
        state: "200",//查找成功
        data:result //查询结果返回
      });
    });
  }
}