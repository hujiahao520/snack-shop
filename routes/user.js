var express = require('express'),
  multer  = require('multer'),
  router = express.Router(),
  crypto = require('crypto'),
  Page= require('../models/page.js'),
  User = require('../models/user.js');
 
// 上传文件配置
var storage = multer.diskStorage({
  destination: function (req, file, cb) { // 设置上传文件存放路径
    cb(null, 'public/biye/img/photo/'); // 该文件夹必须先创建
  },
  filename: function (req, file, cb) { // 上传文件文件名配置
    // file.originalname 获取原文件名及后缀名
    var fileArr = file.originalname.split(".");
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileArr[fileArr.length - 1]);
  }
});

// 添加配置文件到 multer 对象
var upload = multer({
  storage: storage
});

router.post("/upload",upload.single('file'),function(req,res){
  res.json({
    msg:"文件上传成功",
    state:200,
    url:req.file.filename
  })
});


router.post('/alterData',function(req,res){
  var uid = req.session.user.id;
  // var uid = 1;
  var sex = Number(req.body.sex);
  var name = req.body.name;
  var img = req.body.img;
  var birth = req.body.birth;
  User.alterData([name,birth,sex,img,uid],function(err,data){
    if(err) return res.json({
      msg:"资料修改失败",
      state:0
    })
    res.json({
      msg:"资料修改成功",
      state:200
    })
  })
});

function checkRootLogin(req, res, next) {
  if (!req.session.employee) {
    return res.send({ "error": 400, "message": "未登录！" });
  }
  next();
}
function checkUserLogin(req, res, next) {
  if (!req.session.user) {
    return res.send({ "error": 400, "message": "未登录！" });
  }
  next();
}
router.post("/usertel",function(req,res){
  console.log(req.body.mobile);
  User.getUserByMobile(req.body.mobile,function(err,result){
    console.log(result);
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    if (result.length > 0) return res.send({ "error": 403, "message": "手机号已注册过!!!" });   
    req.session.user = result[0];
    res.send({ "success": true });  
  })
});

router.post("/userphone",function(req,res){
  User.getUserByMobile(req.body.mobile,function(err,result){
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    if (result.length ==0) return res.send({ "error": 403, "message": "手机号不存在！ " });  
    req.session.user = result[0];
    res.json({ "success": true ,data:req.session.user});  
  })
});

router.post("/alterTel",function(req,res){
  var id  = 2;
  var  mobile = req.body.mobile;
  var username = req.body.mobile;
  console.log('这是测试')
  User.alterTel(id,username,mobile,function(err,data){
    console.log(data)
    if(err) return res.json({
      msg:"修改手机号失败",
      state:0
    })
    res.json({
      msg:"修改手机号成功",
      state:200
    })
  })
})

router.post("/register", function (req, res) {
  if (!req.session.vCode||req.session.vCode!=req.body.vCode) return res.send({ "error": 401, "message": "验证码错误!" });
  if (!req.body.username) return res.send({ "error": 403, "message": "用户名未填写！" });
  if (!req.body.password)  return res.send({ "error": 403, "message": "密码未填写！" });
  if (!req.body.mobile)  return res.send({ "error": 403, "message": "用户手机号未填写！" });
  //密码加密
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    username: req.body.username,
    password: password,
    mobile: req.body.mobile,
    isDelete: 1,
  });

  User.getUserByName(req.body.username, function (err, result) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    if (result.length > 0) return res.send({ "error": 403, "message": "用户名已经存在!!!" });
    else {
      User.getUserByMobile(req.body.mobile, function (err, result) {
        console.log(result);
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        if (result.length > 0) return res.send({ "error": 403, "message": "手机号已注册过!!!" });
        else {
          User.addUser(newUser, function (err, data) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            newUser.id = data.insertId;
            req.session.user = newUser;
            res.send({ "success": true });
          })
        }
      });
    }
  });
});

router.post("/register2", function (req, res) {
  if (!req.body.username) return res.send({ "error": 403, "message": "用户名未填写！" });
  if (!req.body.password)  return res.send({ "error": 403, "message": "密码未填写！" });
  if (!req.body.mobile)  return res.send({ "error": 403, "message": "用户手机号未填写！" });
  //密码加密
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    username: req.body.username,
    password: password,
    mobile: req.body.mobile,
    isDelete: 1,
  });

  User.getUserByName(req.body.username, function (err, result) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    if (result.length > 0) return res.send({ "error": 403, "message": "用户名已经存在!!!" });
    else {
      User.getUserByMobile(req.body.mobile, function (err, result) {
        console.log(result);
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        if (result.length > 0) return res.send({ "error": 403, "message": "手机号已注册过!!!" });
        else {
          User.addUser(newUser, function (err, data) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            newUser.id = data.insertId;
            req.session.user = newUser;
            res.send({ "success": true });
          })
        }
      });
    }
  });
});


router.post("/updatePassword", checkUserLogin);
router.post("/updatePassword", function (req, res) {
  var md51 = crypto.createHash('md5');
  var password = md51.update(req.body.password).digest('base64');
  var id = req.session.user.id;
   User.updatePassword(id, password, function (err, data) {
      if (err) return res.send({ "error": 403, "message": "数据库异常!" });
      req.session.user = null;
      res.send({ "success": true });
    })
});

router.post("/getPwd", checkUserLogin);
router.post("/getPwd", function (req, res) {
  console.log("lalala",req.session.user.id);
  var id = req.session.user.id;
  var md51 = crypto.createHash('md5');
  var password = md51.update(req.body.password).digest('base64');
   User.getPwd(id, function (err, data) {
    console.log(password,data);
      if (err) return res.send({ "error": 403, "message": "数据库异常!" });
      if(data[0].password==password){
        res.json({
          msg:"密码验证成功",
          state:200
        })
      }else{
        res.json({
          msg:"密码验证失败",
          state:0
        })
      }
    })
});

router.post("/login", function (req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  User.getUserByName(req.body.tel, function (err, result) {
    if (result.length ==0) return res.send({ "error": 403, "message": "用户名不存在！ " });
    if (result[0].password != password) return res.send({ "error": 403, "message": "密码错误！" });
    req.session.user = result[0];
    console.log(req.session.user);
    res.send({ "success": true });
  });
});

router.get("/logout", function (req, res) {
  req.session.user = null;
  res.send({ "success": true });
});



router.post("/updateUser", checkRootLogin);
router.post("/updateUser", function (req, res) {
  var newUser = new User({
    id: req.body.id,
    isDelete: req.body.isDelete
  });
  User.updateUser(newUser, function (err, result) {
    if (err) return res.send({ "error": 403, "message": "数据库异常!" });
    res.send({ "success": true });
  });
});
router.post("/queryUser", checkRootLogin);
router.get("/queryUser", function (req, res) {
  console.log("====="+Page);
  var page = new Page({
    page: req.query.page ? parseInt(req.query.page) : 0,
    size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
  })
  User.queryUser(page, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常!" });
    User.countUser(function (err, result) {
      if (err) return res.send({ "error": 403, "message": "数据库异常！" });
      page.total = result.count;
      page.rows = data;
      console.log(page);
      res.send(page);
    });
  });
});
router.get("/queryUserMessage", checkUserLogin);
router.get("/queryUserMessage", function (req, res) {
  User.queryUserMessage(req.session.user.id, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常!" });
    res.send(data);
  });
});

var createCode = function () {
  var code = "";
  var codeLength = 6;//验证码的长度   
  var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);//随机数  
  for (var i = 0; i < codeLength; i++) {//循环操作  
    var index = Math.floor(Math.random() * 10);//取得随机数的索引（0~35）  
    code += random[index];//根据索引取得随机数加到code上  
  }
  return code;
}
router.get("/vCode", function (req, res) {
  var code = createCode();
  req.session.vCode = code;
  res.send({ "vCode": code });
});
router.get("/vCodeForUpdatePassword", function (req, res) {
  var code = createCode();
  req.session.vCodePassword = code;
  res.send({ "vCode": code });
});

router.post("/confirm",(req,res) => {
  if (!req.session.vCode||req.session.vCode!=req.body.vCode) return res.send({ "error": 401, "message": "验证码错误!" });
  res.send({ "success": true });
})





module.exports = router;
