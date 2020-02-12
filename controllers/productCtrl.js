const productModel = require("../models/productModel");

module.exports = {
  productFind:(req,res)=>{
    console.log(req.query);
    productModel.productSearch(req.query,(err,data)=>{
      if(err){
         return res.json({
          msg:"数据库查找出错！",
          state:0,
          err:err
        })
      }
      res.json({
        msg:"查找成功！",
        state:200,
        data:data
      })
      
    })
  },
  getGoodDetails:(req,res)=>{
    
   
    productModel.goodDetails(req.query.mer_id,(err,data)=>{
     
      if(err){
        return res.json({
          msg:"数据库查找失败！",
          state:0,
          err:err
        })
      }
      var goodArr = {
        mer_name:data[0].mer_name,
        goo_price:data[0].goo_price,
        des_id:data[0].des_id,
        des_name:data[0].des_name,
        des_nativPlace:data[0].des_nativPlace,
        des_img:data[0].des_img,
        des_backgroundImg:data[0].des_bg,
        des_discription:data[0].des_discription_one
      }
      var sizedoc = {
        sizeArr:[],
        imgArr:{},
        priceArr:[]
      };
      for(var i=0;i<data.length;i++){
        if(sizedoc.sizeArr.indexOf(data[i].stanV_value)==-1){
          sizedoc.sizeArr.push(data[i].stanV_value);  
        }
        
          
        
      }
      var colorArr = [];
      for(var i=0;i<data.length;i++){
        if(colorArr.indexOf(data[i].co_value)==-1){
          colorArr.push(data[i].co_value);
        }
      }
    
      res.json({
        msg:"查找成功！",
        state:200,
        data:{
          all:data,
          goodArr:goodArr,
          sizedoc:sizedoc,
          colorArr:colorArr
        }
      })
    })
  },
  isCollect:(req,res)=>{
    console.log("商品",req.body);
    productModel.isCol([Number(req.body.mer_id),1],(err,data)=>{
      console.log("返回",data);
      if(err){
        return res.json({
          msg:"数据库查找失败！",
          state:0,
          err:err
        })
      }
      res.json({
        msg:"数据库查找成功！",
        state:200,
        data:data
      })
    })
  },
  getGoodSize:(req,res)=>{
    console.log(req.query);
    productModel.getSize(req.query.mer_id,(err,data)=>{
      if(err){
        return res.json({
          msg:"数据库查找失败！",
          state:0,
          err:err
        })
      }
      res.json({
        msg:"数据库查找成功！",
        state:200,
        data:data
      })
    })
  },
  getGoodDetail:(req,res)=>{
    console.log(req.query);
    
    productModel.getDetail(req.query.mer_id,(err,data)=>{
      
      if(err){
        return res.json({
          msg:"数据库查找失败！",
          state:0,
          err:err
        })
      }
      res.json({
        msg:"数据库查找成功！",
        state:200,
        data:data
      })
    })
  },
  getSizeData:(req,res)=>{
    console.log(req.query);
    productModel.getData(req.query.mer_id,(err,data)=>{
      if(err){
        return res.json({
          msg:"数据库查找失败！",
          state:0,
          err:err
        })
      }
      res.json({
        msg:"数据库查找成功！",
        state:200,
        data:data
      })
    })
  },
  getGoodRecommend:(req,res)=>{
    console.log("设计师",req.query);
    productModel.getRecommend(req.query,(err,data)=>{
      if(err){
        return res.json({
          msg:"数据库查找失败！",
          state:0,
          err:err
        })
      }
      res.json({
        msg:"数据库查找成功！",
        state:200,
        data:data
      })
    })
  }
}