var db = require('./db.js');

module.exports = {
  render: (options, callback) => {
    var sql = `SELECT a.or_id orId, or_people orPeople,or_telephone orTel,or_address orAddress,or_price orPri,or_status orStatus,
    orDe_number orDeNum,mer_img merImg,mer_name merName
     FROM orderlist a
    JOIN orderdetails b ON 
    a.or_id = b.or_id 
    JOIN merchhandise c ON
    b.mer_id = c.mer_id;`
    db.query(sql, null, callback);
  },
  // getShopcart: (options, callback) => {
  //   var sql = ``;
  //   db.query(sql, options, callback);
  // },
  getShopcart: (options, callback) => {
    var sql = `
    SELECT cart.num shoAmount,product.price gooPri,product.proName merName,category.categoryName coVal,brand.brandName stanVal,product_picture.picAddr merImg,product.id merId FROM cart 
    JOIN USER  ON cart.userId = user.id
    JOIN product ON
    product.id = cart.productId
    JOIN product_picture ON
    product_picture.productId = product.id
    JOIN brand ON
    product.brandId = brand.id
    JOIN category ON
     brand.categoryId = category.id
    WHERE cart.id = ?   
    `;
    db.query(sql, options, callback);
  },

  getAddress: (options, callback) => {
    var sql = `SELECT ad_state state,id,address pro,address city,address region,addressDetail detail,mobile tel,recipients adName FROM address WHERE userId = 2 and ad_state= 0`;
    db.query(sql, [null], callback);

  },

  getMer: (options, callback) => {
    var sql = `
    SELECT mer_img merImg,mer_name merName,co_value coValue,stanV_value stanValue,goo_price gooPri FROM merchhandise merc 
    JOIN goodsstorage goo ON
    merc.mer_id = goo.mei_id
    JOIN color co ON 
    goo.co_id = co.co_id
    JOIN standardvalue stanv ON
    stanv.stanV_id = goo.stanV_id
    WHERE merc.mer_id = ? AND
    co.co_id = ? AND
    stanv.stanV_id = ?
    `;
    db.query(sql, options, callback);
  },

  addOrder: (options, callback) => {
    var sql = `
    INSERT INTO orderlist (u_id,or_time,or_payTime,or_price,or_status,or_address,or_people,or_telephone,or_isDel,or_number,or_msg)
  VALUE (1,?,NULL,?,1,?,?,?,0,?,?)
    `;
    db.query(sql, options, callback);
  },

  addOrderDetail: (options, callback) => {
    var sql = `   INSERT INTO orderdetails (or_id,pr_id,orDe_color,orDe_standard,orDe_amount,orDe_price)
    VALUE (?,?,?,?,?,?)`;
    db.query(sql, options, callback);
  },

  newaddOrder: (options, callback) => {
    var sql = `
    INSERT INTO orderlist (u_id,or_time,or_payTime,or_price,or_status,or_address,or_people,or_telephone,or_isDel,or_number,or_msg)
  VALUE (2,?,NULL,?,1,?,?,?,0,?,?)
    `;
    db.query(sql, options, callback);
  },

  addorderdetail: (options, callback) => {
    var sql = `
    INSERT INTO orderdetails (or_id,pr_id,orDe_color,orDe_standard,orDe_amount,orDe_price)
 VALUE (?,?,?,?,?,?)
    `;
    db.query(sql, options, callback);
  },

  getList: (options, callback) => {
    var sql = `SELECT * FROM orderlist WHERE or_isDel=0 AND u_id=? AND or_status=?`

    db.query(sql, options, callback);
  },
  getDetail: (options, callback) => {
    var sql = `SELECT a.orDe_id,tm.picAddr mer_img ,a.orDe_price,a.orDe_color,a.orDe_standard,me.proName mer_name,a.orDe_amount,a.or_id,b.or_time FROM orderdetails a
    JOIN product me ON a.pr_id=me.id
    JOIN product_picture tm ON tm.productId = me.id
    JOIN orderlist b ON b.or_id=a.or_id
    WHERE a.or_id=?
    `;
    db.query(sql, options, callback);
  },
  deleteDetail:(options, callback) => {
    var sql = `DELETE FROM orderdetails WHERE or_id=?`
    db.query(sql, options, callback);
  },
  deleteList:(options, callback) => {
    var sql = `DELETE FROM orderlist WHERE or_id=?`
    db.query(sql, options, callback);
  },
  topay:(options, callback) => {
    var sql = `UPDATE orderlist SET or_status=2,or_payTime=? WHERE or_id=?`
    db.query(sql, options, callback);
  },
  receive:(options, callback) => {
    var sql = `UPDATE orderlist SET or_status=4 WHERE or_id=?`
    db.query(sql, options, callback);
  },
  getOtherOrderDetails:(options, callback) => {
    var sql = `SELECT or_price,or_people,or_telephone,or_address,or_number,or_msg FROM orderlist 
    JOIN orderdetails ON
    orderlist.or_id = orderdetails.or_id
    WHERE orderlist.or_id = ? LIMIT 0,1`
    db.query(sql, options, callback);
  },
  getDesignerId:(options, callback) => {
    var sql = `SELECT des_id FROM merchhandise WHERE merchhandise.mer_id=(SELECT mer_id FROM orderlist 
      JOIN orderdetails ON
      orderlist.or_id = orderdetails.or_id
      WHERE orderlist.or_id = ? LIMIT 0,1)`
    db.query(sql, options, callback);
  },
  setDetail:(options, callback) => {
    var sql = `UPDATE orderlist SET or_isDel=1 WHERE or_id=?`
    db.query(sql, options, callback);
  }
}