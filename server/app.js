var express = require('express');
var createError = require('http-errors');
var path = require('path');
var config = require('./config/key');
var mongoose = require('mongoose');

/**
 * Connect to mongodb through mongoose
 */
var connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB ...'))
  .catch(err => console.log(err));

var userRouter = require('./routes/users');

/**
 * Create express app
 */
var app = express();

// Redirect all incoming request to HTTPS
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
})
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API WIP
app.use('/api/users', userRouter);

// If in production => serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('Frontend/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend", "build", "index.html"));
  });
}

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;