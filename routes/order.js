
var express = require('express');
var orderCtrl = require("../controllers/orderCtrl");
var router = express.Router();

/* GET home page. */
router.get('/render',orderCtrl.render);


router.post('/getShopcart',orderCtrl.getShopcart);

router.get('/delList',orderCtrl.delList);

router.post('/getAddress',orderCtrl.getAddress)

router.post('/getMer',orderCtrl.getMer)

router.post('/addOrder',orderCtrl.addOrder)

router.post('/newaddOrder',orderCtrl.newaddOrder)

router.post('/addorderdetail',orderCtrl.addorderdetail)

router.get('/getList',orderCtrl.getList);

router.get('/getDetail',orderCtrl.getDetail);

router.post('/getOtherOrderDetails',orderCtrl.getOtherOrderDetails);

router.post('/delete',orderCtrl.delete);

router.post('/getDesignerId', orderCtrl.getDesignerId);

router.post('/topay',orderCtrl.topay);

router.post('/receive',orderCtrl.receive);

router.post('/setDetail',orderCtrl.setDetail);

module.exports = router;