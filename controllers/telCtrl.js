const AV = require('leancloud-storage');

// AV 初始化
AV.init({
  appId: "4XLnIKDatn4OT4kC4wP8de1g-gzGzoHsz",
  appKey: "K1vn5BYoD5R0mVutiyeycQ9k"
});

module.exports = {
  get: (req, res) => {
    console.log("收到手机号码:", req.body.telphone);

    // 发送短信，使用预设的模板和签名
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber: req.body.telphone,  // 目标手机号
      sign:'加号工作室'                // 控制台预设的短信签名
    }).then(function(){
      //调用成功
      res.json({
        msg: "获取成功",
        success: true 
      })
    }, function(err){
      //调用失败
    });
  },

  confirm: (req,res) => {
    console.log("收到手机号码及验证码:", req.body);
    AV.Cloud.verifySmsCode(req.body.code, req.body.telphone).then(function(){
      //验证成功
      res.json({
        msg: "验证成功"
      })
    }, function(err){
        //验证失败
        res.json({
          msg: "验证失败"
        });
    });
  }
}