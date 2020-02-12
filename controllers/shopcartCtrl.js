const shopcartModel = require("../models/shopcartModel");

module.exports = {
  getDate: function (req, res) { // 渲染商品
    //req.session.userId
    console.log(req.query)
    var num = 10;
    shopcartModel.getDate([num], (err, date) => {
      if (err) return res.json({
        msg: "购物车查找失败",
        state: 0
      });

      res.json({
        msg: "购物车查找成功",
        state: 200,
        date: date
      });
    });
  },
  addCount: function (req, res) {// 增加商品数量
    console.log(req.query)
    var num = 10
    shopcartModel.addCount([num, req.query.shoCart_id, req.query.goo_id], (err, date) => {
      if (err) return res.json({
        msg: "商品数量增加失败",
        state: 0
      });

      res.json({
        msg: "商品数量增加成功",
        state: 200,
        date: date
      });
    });
  },
  lessenCount: function (req, res) {// 减少商品数量

    var num = 10
    shopcartModel.lessenCount([num, req.query.shoCart_id], (err, date) => {
      if (err) return res.json({
        msg: "商品数量减少失败",
        state: 0
      });

      res.json({
        msg: "商品数量减少成功",
        state: 200,
        date: date
      });
    });
  },
  removeShop: function (req, res) {// 删除商品
    console.log(req.body.shoCart_id)
    var num = 10
    shopcartModel.removeShop([num, req.body.shoCart_id], (err, date) => {
      if (err) return res.json({
        msg: "商品删除失败",
        state: 0
      });

      res.json({
        msg: "商品删除成功",
        state: 200,
        date: date
      })
    })
  },
  addShop: function (req, res) {// 添加商品
    console.log(req.body);
    var userId = req.session.userId //用户id
    shopcartModel.addShop([null, 10, req.body.goo_num, req.body.goo_id], (err, date) => {
      if (err) return res.json({
        msg: "商品添加失败",
        state: 0
      });

      res.json({
        msg: "商品添加成功",
        state: 200,
        date: date
      });
    })
  }
}