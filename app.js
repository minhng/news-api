const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// routers
const indexRouter = require('./routes/index');
const guardianHomeRouter = require("./routes/guardianHome");
const guardianSectionRouter = require("./routes/guardianSection");
const guardianDetailedRouter = require("./routes/guardianDetailed");
const guardianResultsRouter = require("./routes/guardianResults");
const nyHomeRouter = require("./routes/nyHome");
const nySectionRouter = require("./routes/nySection");
const nyResultsRouter = require("./routes/nyResults");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// define API
app.use('/', indexRouter);
app.use('/guardianHome', guardianHomeRouter);
app.use('/guardianSection', guardianSectionRouter);
app.use('/article', guardianDetailedRouter);
app.use('/guardianSearch', guardianResultsRouter);

app.use('/nyHome', nyHomeRouter);
app.use('/nySection', nySectionRouter);
app.use('/nySearch', nyResultsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
