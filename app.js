var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/perfaps');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passpo

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev')); // log every request to the console
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});



app.use(session({
  cookieName: 'session',
  secret: 'oXfY71GnFmu95AbmNCCdUt2Tz6MvEM4IMkpxfLZB3Q1EIQ9ozeBgK5ZE8UckKro',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
// app.use(express.cookieParser());
// app.use(express.session({secret: '1234567890QWERTY'}));

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
