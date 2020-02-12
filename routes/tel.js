const express = require('express');
const router = express.Router();
const telCtrl = require('../controllers/telCtrl');



router.post('/get', telCtrl.get);

router.post('/confirm', telCtrl.confirm);

module.exports = router;