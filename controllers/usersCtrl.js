const crypto = require("crypto"); // 加密模块，内置
const userModel = require("../models/usersModels.js");

module.exports = {
  // 登录
  login: (req, res) => {
    console.log("登录请求：", req.body);
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(req.body.pwd).digest("hex"); // 加密
    console.log(req.body);
    userModel.login(req.body.tel,(err,data)=>{
      if(err) return  res.json({
        msg:"数据库查找失败",
        state: 0
      });
      console.log(data);
      if(data.length==0){
        res.json({
          msg:"该用户不存在",
          state: 1000
        })
      }
      else{
        console.log(data[0].u_pwd,newPass);
        if(data[0].u_pwd == newPass){
          req.session.userId = data[0].u_id;
          console.log("session",req.session.userId);
          req.session.sign = true;
          res.json({
            msg:"登录成功",
            state:200
          })
        }else{
          res.json({
            msg:"密码错误",
            state:0
          })
        }
      }
    })

  },

  // 注册
  register: (req, res) => {
    console.log("收到的注册请求：", req.body);
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(req.body.pwd).digest("hex"); // 加密
    console.log(newPass);
    var u_name = Math.random().toString(36).substr(2);
    var u_img = "/images/pages/mydata/img1.jpg";
    userModel.register([u_name,req.body.tel,newPass,u_img], (err, result) => {
      if(err) return res.json({
        msg: "注册出错",
        state: '0',
        err: err
      });
      
      res.json({
        msg: "注册成功",
        state: "200"
      });
    })
  },

  // 获取数据
  getData:(req,res)=>{
    console.log(req.session.userId);
    var uid = req.session.userId;
    userModel.findData(uid,(err,data)=>{
      if(err) return res.json({
        msg: "信息查找出错",
        state: '0',
      });
      res.json({
        msg: "信息查找成功",
        state: "200",
        data: data
      });
    })
  },

  // 修改密码
  alterPwd:(req,res)=>{
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(req.body.pwd).digest("hex"); // 加密
    userModel.alterPwd([newPass,req.body.tel],(err,data)=>{
      if(err) return res.json({
        msg: "修改密码出错",
        state: '0',
        err: err
      });
      
      res.json({
        msg: "修改密码成功",
        state: "200"
      });
    })
  },

  // 退出
  logout: (req, res) => {
    req.session.destroy(); // 销毁 session
    res.json({
      msg: "退出成功",
      state: "200"
    });
  },

  // 上传图片
  upload:(req,res)=>{
    console.log("收到的",req.file); // req.file 保存了文件相关信息
    res.json({
      msg:"文件上传成功",
      state:200,
      url:req.file.filename
    })
  },

  // 修改数据
  alterData:(req,res)=>{
    var uid = req.session.userId;
    // var uid = 1;
    var sex = Number(req.body.sex);
    var name = req.body.name;
    var img = req.body.img;
    var birth = req.body.birth;
    userModel.alterData([name,birth,sex,img,uid],(err,data)=>{
      if(err) return res.json({
        msg:"资料修改失败",
        state:0
      })
      res.json({
        msg:"资料修改成功",
        state:200
      })
    })
  },

  // 获取密码
  getPwd:(req,res)=>{
    var uid = req.session.userId;
    // var uid = 1;
    const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
    const newPass = md5.update(req.body.pwd).digest("hex"); // 加密
    
    userModel.getPwd(uid,(err,data)=>{
      if(err) return res.json({
        msg:"数据库获取密码失败",
        state:0
      })
      console.log(newPass,data);
      if(data[0].u_pwd==newPass){
        res.json({
          msg:"密码验证成功",
          state:200
        })
      }
      else{
        res.json({
          msg:"密码验证失败",
          state:0
        })
      }
    })
  },


  // 修改手机号
  alterTel:(req,res)=>{
    var uid = req.session.userId;
    // var uid = 1;
    var tel = req.body.tel;
    console.log(uid,tel);
    userModel.alterTel([tel,uid],(err,data)=>{
      if(err) return res.json({
        msg:"修改手机号失败",
        state:0
      })
      res.json({
        msg:"修改手机号成功",
        state:200
      })
    })
  },

  // 获取手机号
  getTel:(req,res)=>{
    console.log(req.body);
    var uid;
    if(req.session.userId){
      uid=req.session.userId;
    }
    if(req.body.tel){
      userModel.getTel(req.body.tel,(err,data)=>{
        if(err) return res.json({
          msg:"查找手机号失败",
          state:0
        })
        if(data.length){
          console.log(data);
          if(data[0].u_id==uid){
            res.json({
              msg:"手机号匹配",
              state:'1000'
            })
          }
          else{
            res.json({
              msg:"该手机号已被注册",
              state:'1000'
            })
          }
        }
        else{
          res.json({
            msg:"该手机号不存在",
            state:'200'
          })
        }
      })
    }
    // else{
    //   console.log(req.session.userId);
    //   var uid=1;
    //   var uid = req.session.userId;
    //   userModel.findData(uid,(err,data)=>{
    //     if(err) return res.json({
    //       msg: "信息查找出错",
    //       state: '0',
    //     });
    //     if(data.length==0){
    //       res.json({
    //         msg:"手机号错误",
    //         state:'0'
    //       })
    //     }
    //     else{
    //       res.json({
    //         msg:"手机号正确",
    //         state:"200"
    //       })
    //     }
    //   })
    // }
  },

  getsession:(req,res)=>{
    var state=req.session.sign;
    console.log(state);
    res.json({
      msg:'获取session',
      state: state
    })
  }
}