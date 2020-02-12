const collectionModel = require("../models/collectionModel")

module.exports = {
  get: (req, res) =>{
    console.log("aaa");
    //查数据库
    collectionModel.findCollection(null, (err,result)=>{
      console.log(result);
      if(err) return res.json({
        msg:"数据库操作失败了",
        state:'0'
      })
      res.json({
        msg:"数据查找成功",
        state:200,
        data: result //将查找数据返回前端
      })
    })
   
  },
  delete: (req,res)=>{
     //删除对应点击商品
      collectionModel.deleteCollection(req.body.collId, (err,result)=>{
      console.log(result);
      if(err) return res.json({
        msg:"数据库删除失败了",
        state:'0'
      })
      res.json({
        msg:"数据删除成功了",
        state:200,
        data: result //将查找数据返回前端
      })
    })
  }
  ,

  cancel: (req,res)=>{
    //取消对应点击商品
    console.log("删除的ID",req.body.mer_id);
     collectionModel.canceLCollection([req.body.mer_id,req.body.u_id], (err,result)=>{
     console.log(result);
     if(err) return res.json({
       msg:"数据库取消失败了",
       state:'0'
     })
     res.json({
       msg:"数据取消成功了",
       state:200,
       data: result //将查找数据返回前端
     })
   })
 }
 ,

  add: (req,res)=>{
    //增加对应点击商品
   /* var coll_id = req.body.coll_id; */
   var userId = req.session.userId //用户id
   collectionModel.addCollection([null,1,req.body.mer_id], (err,result)=>{
     console.log(result);
     if(err) return res.json({ 
       msg:"数据库增加失败了",
       state:'0'
     })
     res.json({
       msg:"数据增加成功了",
       state:200,
       data: result //将查找数据返回前端
     })
   })
 }
}