var db = require('./db.js');

function Address(address) {
  this.id = address.id;
  this.userId = address.userId;
  this.address = address.address;
  this.addressDetail = address.addressDetail;
  this.isDelete = address.isDelete;
  this.recipients = address.recipients;
  this.postcode = address.postcode;
  this.mobile = address.mobile;
};

Address.addAddress = function (address, callback) {
  var selectSql = 'insert into address (id,userId,address,addressDetail,isDelete,recipients,postCode,mobile,ad_state)  values (null,?,?,?,1,?,?,?,0)';
  db.query(selectSql, [address.userId, address.address, address.addressDetail,address.recipients,address.postcode,address.mobile,address.state], function (err, result) {
    console.log('添加地址出错：',err);
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
Address.updateAddress = function (address, callback) {
  var selectSql = 'UPDATE address SET  ';
    var param = new Array();
  if (address.address && param.length == 0) {
    selectSql += ' address=? ';
    param[param.length] = address.address;
  }
  if (address.addressDetail && param.length == 0) {
    selectSql += ' addressDetail=? ';
    param[param.length] = address.addressDetail;
  }
  else if (address.addressDetail && param.length != 0) {
    selectSql += ' ,addressDetail=? ';
    param[param.length] = address.addressDetail;
  }
   if (address.recipients && param.length == 0) {
    selectSql += ' recipients=? ';
    param[param.length] = address.recipients;
  }
  else if (address.recipients && param.length != 0) {
    selectSql += ' ,recipients=? ';
    param[param.length] = address.recipients;
  }

    if (address.mobile && param.length == 0) {
        selectSql += ' mobile=? ';
        param[param.length] = address.mobile;
    }
    else if (address.mobile && param.length != 0) {
        selectSql += ' ,mobile=? ';
        param[param.length] = address.mobile;
    }

     if (address.postcode && param.length == 0) {
    selectSql += ' postcode=? ';
    param[param.length] = address.postcode;
  }
  else if (address.postcode && param.length != 0) {
    selectSql += ' ,postcode=? ';
    param[param.length] = address.postcode;
  }
     selectSql += ' WHERE id=? ';
   param[param.length] = address.id;
  db.query(selectSql,param, function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Address.deleteAddress = function (id, callback) {
  var delSql = "UPDATE address SET isDelete =0 ,ad_state = 1 WHERE id =?";
  db.query(delSql,[id],function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Address.setDefault = function (id, callback) {
  var delSql = `update address set ad_state=1 where id=?;`;
  db.query(delSql,[id],function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Address.queryAddress = function (userId, callback) {
  var selectSql = 'SELECT * FROM address WHERE userId=? AND isDelete=1';
  db.query(selectSql, [userId], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}


Address.findAllLogisticsModel = function (id, callback) {
  var selectSql = `SELECT * FROM logisticsdetails  JOIN logistics ON logistics.log_id = logisticsdetails.log_id WHERE or_id = ? `;
  db.query(selectSql, [id], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}

Address.findLogisticsPhotoModel = function (id, callback) {
  var selectSql = `SELECT a.orDe_id,tm.picAddr mer_img , me.proName mer_name,a.or_id,lo.log_expressid,lo.log_company FROM orderdetails a
  JOIN product me ON a.pr_id=me.id
  JOIN product_picture tm ON tm.productId = me.id
  JOIN orderlist b ON b.or_id=a.or_id
  JOIN logistics lo ON b.or_id=lo.or_id
  WHERE a.or_id= ?`;
  db.query(selectSql, [id], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}


Address.findUserLogisticsModel = function (uid, callback) {
  var selectSql = `SELECT * FROM (SELECT tlo.log_id,tlo.or_id,tlod.log_status,tlod.logDe_position,tlod.logDe_message,tlod.logDe_date,tm.picAddr mer_img FROM logistics tlo
    JOIN orderlist  tor ON  tlo.or_id = tor.or_id
    JOIN logisticsdetails tlod ON tlod.log_id = tlo.log_id
    JOIN orderdetails tord ON tord.or_id = tor.or_id
    JOIN product tme ON tme.id = tord.pr_id
    JOIN product_picture tm ON tm.productId = tme.id
    WHERE tor.u_id = ?
    ORDER BY tlod.logDe_date DESC) a
    GROUP BY a.log_id`;
  db.query(selectSql, [uid], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}









module.exports = Address;
