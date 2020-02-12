const path = require("path");
const addressModle = require("../models/addressModel");

module.exports = {
  /* 地址查询 */
  get: (req,res) =>{
    /* var userId = req.session.userid; */
    var userId = 1;
    addressModle.get(userId, (err,data)=>{
      if(err) return  res.json({
        msg:"地址查找失败",
        state: 0
      });
      console.log(data);

      res.json({
        msg:"地址查找成功",
        state: 200,
        data: data
      })
    })
  },
  /* 增加地址 */
  add: (req, res) => {
    var userId = 1;
    var ad_pro = req.body.province;
    var ad_city = req.body.city;
    var ad_region = req.body.region;
    var ad_detail = req.body.detail;
    var ad_tel = req.body.tel;
    var ad_name = req.body.name;

    addressModle.add([userId,ad_pro,ad_city,ad_region,ad_detail,ad_tel,ad_name], (err,data)=>{
      if(err) return  res.json({
        msg:"地址添加失败",
        state: 0
      });
      console.log(data);

      res.json({
        msg:"地址添加成功",
        state: 200,
        data: data
      })
    })
  },
  /* 删除地址 */
  delete: (req, res) => {
    var adId = Number(req.body.id);
    console.log("aaa",adId);
    addressModle.delete(adId, (err,data)=>{
      if(err) return  res.json({
        msg:"地址删除失败",
        state: 0
      });
      console.log(data);
 
      res.json({

            
        msg:"地址删除成功",
        state: 200,
        data: data
      })
    })
  },
  /* 修改地址 */
  change: (req, res) => {
    var adId= Number(req.body.id);
    var ad_pro = req.body.province;
    var ad_city = req.body.city;
    var ad_region = req.body.region;
    var ad_detail = req.body.detail;
    var ad_tel = req.body.tel;
    var ad_name = req.body.name;
    addressModle.change([ad_pro,ad_city,ad_region,ad_detail,ad_tel,ad_name,adId], (err,data)=>{
      if(err) return  res.json({
        msg:"地址修改失败",
        state: 0
      });
      console.log(data);

      res.json({
        msg:"地址修改成功",
        state: 200,
        data: data
      })
    })
  },
  
  /* 设置默认地址 */
  setDefault: (req, res) => {
    var adId = req.body.id;
    addressModle.changeDefault(0, (err,data)=>{
      if(err) return  res.json({
        msg:"默认值修改为0失败",
        state: 0
      });
      addressModle.setDefault(adId, (err,data)=>{
        console.log("ccc");
        if(err) return  res.json({
          msg:"默认值修改为1失败",
          state: 0
        });
        console.log(data);
  
        res.json({
          msg:"默认值修改为1成功", 
          state: 200,
          data: data
        })
      })
    })
  }
}