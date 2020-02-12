var designerModel = require('../models/designerModel')

module.exports = {
  getlist: (req, res) => {
    // //get
    // req.query();
    // //post
    // req.body();
    designerModel.getlistModle((err, result) => {
      if (err) return res.json({
        msg: "查询失败",
        state: "0" //查找出错
      });
      res.json({
        msg: "查询成功",
        state: "200",//查找成功
        data: result //查询结果返回
      });
    });
  },

  getruns: (req, res) => {
    // //get
    // req.query();
    // //post
    // req.body();
    designerModel.getrunsModle(req.query.id,(err, result) => {
      if (err) return res.json({
        msg: "查询失败",
        state: "0" //查找出错
      });
      res.json({
        msg: "查询成功",
        state: "200",//查找成功
        data: result //查询结果返回
      });
    });
  }
}