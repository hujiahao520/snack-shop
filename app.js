var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require('./routes/user');
var product = require('./routes/product');
var category = require('./routes/category');
var cart = require('./routes/cart');
var orderRouter = require('./routes/order');
var telRouter = require('./routes/tel');
var address = require('./routes/address');
var employee = require('./routes/employee');


var app = express();


app.use(session({
    secret: 'itcast-secret',
    name: 'itcast-name',
    cookie: {maxAge: 8000000000},
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (!req.session.employee
        && ((url.indexOf('/admin') > -1 && url.indexOf('.html') > -1) || url == '/admin/' )
        && url.indexOf('/admin/login.html') == -1) {
        return res.redirect('/admin/login.html');
    }
    next();
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/user', user);
app.use('/product', product);
app.use('/category', category);
app.use('/cart', cart);
app.use('/address', address);
app.use('/employee', employee);
app.use('/order',orderRouter);
app.use('/tel',telRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    console.log("服务器出错：", err);
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

module.exports = app;
