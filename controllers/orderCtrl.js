const orderModels = require("../models/orderModels.js");
module.exports = {
  render: (req, res) => {
    console.log("请求数据", req.query);
    console.log(req.query);

    orderModels.render(null, (err, result) => {
      if (err) return res.json({
        msg: "数据库查找失败",
        state: 0
      })

      console.log(result);
      res.json({
        msg: "数据库查找成功",
        state: 200,
        data: result
      })

    })
  },
  getShopcart: (req, res) => {

    console.log("请求购物车数据", Number(req.body.id));
    var shId = Number(req.body.id)

    orderModels.getShopcart([shId], (err, result) => {
      if (err) return res.json({
        msg: "数据库查找失败",
        state: 0
      })

      console.log(result);
      res.json({
        msg: "数据库查找成功",
        state: 200,
        data: result
      })

    })
  },

  delList: (req, res) => {
    console.log("请求删除id数据", Number(req.query.orID));

    orderModels.delList(Number(req.query.orID), (err, result) => {
      console.log("删除数据库错误：", err);
      if (err) return res.json({
        msg: "数据库删除失败",
        state: 0
      })

      console.log(result);
      res.json({
        msg: "数据库删除成功",
        state: 200,
        data: result
      })

    })
  },

  getAddress: (req, res) => {
    console.log("请求购物车数据", req.body);

    orderModels.getAddress([null], (err, result) => {
      if (err) return res.json({
        msg: "数据库查找失败",
        state: 0
      })

      console.log(result);
      res.json({
        msg: "数据库查找成功",
        state: 200,
        data: result
      })

    })
  },

  getMer: (req, res) => {
    console.log("请求购物车数据", req.body.meriId, req.body.colorId, req.body.sId);
    var meriId = Number(req.body.meriId);
    var colorId = Number(req.body.colorId);
    var sId = Number(req.body.sId);
    orderModels.getMer([req.body.meriId, req.body.colorId, req.body.sId], (err, result) => {
      console.log("错误：", err);
      if (err) return res.json({
        msg: "数据库查找失败",
        state: 0
      })

      console.log(result);
      res.json({
        msg: "数据库查找成功",
        state: 200,
        data: result
      })

    })
  },

  addOrder: (req, res) => {
    console.log("post请求参数：", req.body)
    var time = req.body.orTime;
    var price = Number(req.body.orPri);
    var address = req.body.orAdd;
    var people = req.body.orPeople;
    var tel = req.body.orTel;
    var message = req.body.message;
    // 订单编号
    var ornumber = req.body.orNumber;
    orderModels.addOrder([time, price, address, people, tel, ornumber, message], (err, result) => {
      console.log("错误：", err);
      if (err) return res.json({
        msg: "数据库查找失败",
        state: 0
      })

      console.log("返回结果：1111",result.insertId);
      // 订单id
      var orId = Number(result.insertId);

      // 商品id
      var meriId = Number(req.body.meriId);

      // 颜色id
      var colorId = req.body.colorId;

      // 规格id
      var sId = req.body.sId;

      // 数量
      var account = Number(req.body.nId);

      // 价格
      var price = Number(req.body.orPri);

      orderModels.addOrderDetail([orId, meriId, colorId, sId, account,price], (err, result) => {
        console.log("错误：", err);
        if (err) return res.json({
          msg: "数据库查找失败",
          state: 0
        })

        console.log("二级查询成功：", result);
        res.json({
          msg: "数据库查找成功",
          state: 200,
          data: result.insertId
        })

      })


      res.json({
        msg: "数据库查找成功",
        state: 200,
        data: result.insertId
      })

    })
  },

  newaddOrder: (req, res) => {
    console.log("post请求参数：", req.body)
    var time = req.body.orTime;
    var price = Number(req.body.orPri);
    var address = req.body.orAdd;
    var people = req.body.orPeople;
    var tel = req.body.orTel;
    var message = req.body.message;
    // 订单编号
    var ornumber = req.body.orNumber;

    orderModels.newaddOrder([time, price, address, people, tel, ornumber, message], (err, result) => {
      console.log("错误：", err);
      if (err) return res.json({
        msg: "数据库查找失败",
        state: 0
      })

      console.log(result);
      res.json({
        msg: "数据库查找成功",
        state: 200,
        data: result
      })

    })
  },

  addorderdetail: (req, res) => {
    console.log("post请求参数：", req.body)
    var orID =  Number(req.body.orId);
    var prId = Number(req.body.merid);
    var color = req.body.color;
    var stanv = req.body.stanV;
    var count = Number(req.body.count);
    var pri = Number(req.body. pri)
    // 订单编号
    var ornumber = req.body.orNumber;

    orderModels. addorderdetail([orID,prId,color,stanv,count,pri], (err, result) => {
      console.log("错误：", err);
      if (err) return res.json({
        msg: "数据库查找失败",
        state: 0
      })

      console.log(result);
      res.json({
        msg: "数据库查找成功",
        state: 200,
        data: result
      })

    })
  },

  getList: (req, res) => {
    // var uid=req.session.userId;
    var uid = 2;
    var state = Number(req.query.state);
    orderModels.getList([uid, state], (err, data) => {
      if (err) return res.json({
        msg: "查找订单列表失败",
        state: 0
      })
      res.json({
        msg: "查找订单列表成功",
        state: 0,
        data: data
      })
    })
  },
  getDetail: (req, res) => {
    orderModels.getDetail([req.query.id], (err, data) => {  
      if (err) return res.json({
        msg: "查找订单详情失败",
        state: 0
      })
      res.json({
        msg: "查找订单详情成功",
        state: 0,
        data: data
      })
    })
  },
  getOtherOrderDetails:(req, res)=>{
    console.log("请求数据库成功！", req.body);
    orderModels.getOtherOrderDetails([Number(req.body.id)],(err,data)=>{
      console.log(err);
      if(err) return res.json({
        msg:"查找订单详情失败",
        state:0
      })
      res.json({
        msg:"查找订单详情成功",
        state:200,
        data:data
      })
    })
  },
  getDesignerId:(req, res)=>{
    console.log("请求数据库成功！", req.body);
    orderModels.getDesignerId(Number(req.body.id),(err,data)=>{
      console.log(err);
      if(err) return res.json({
        msg:"查找订单详情失败",
        state:0
      })
      res.json({
        msg:"查找订单详情成功",
        state:200,
        data:data
      })
    })
  },
  delete:(req,res)=>{
    id=Number(req.body.id);
    orderModels.deleteDetail([id],(err,data)=>{
      if(err) return res.json({
        msg:"删除订单详情失败",
        state:0
      })
      orderModels.deleteList([id],(err,data)=>{
        if(err) return res.json({
          msg:"删除订单详情失败",
          state:0
        })
        res.json({
          msg:"删除订单详情成功",
          state:0
        })
      })
    })
  },
  topay:(req,res)=>{
    var oid=Number(req.body.id);
    var time=req.body.time;
    orderModels.topay([time,oid],(err,data)=>{
      if(err) return res.json({
        msg:"支付失败",
        state:0
      })
      res.json({
        msg:"支付成功",
        state:0
      })
    })
  },
  receive:(req,res)=>{
    var oid=Number(req.body.id);
    orderModels.receive([oid],(err,data)=>{
      if(err) return res.json({
        msg:"收货失败",
        state:0
      })
      res.json({
        msg:"收货成功",
        state:0
      })
    })
  },
  setDetail:(req,res)=>{
    var oid=Number(req.body.id);
    orderModels.setDetail([oid],(err,data)=>{
      if(err) return res.json({
        msg:"删除失败",
        state:0
      })
      res.json({
        msg:"删除成功",
        state:0
      })
    })
  }
}