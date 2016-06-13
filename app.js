const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const env = process.env.NODE_ENV || 'development';
const auth = require('basic-auth');
const config = require(path.join(__dirname, '/app/config.js'));

const routes = require('./app/routes/routes');

const app = express();

// Username and Password
if (env === 'production') {
  app.use((req, res, next) => {
    const credentials = auth(req);

    if (credentials) {
      if (credentials.name === process.env.USERNAME && credentials.pass === process.env.PASSWORD) {
        return next();
      } else if (credentials.name === process.env.USERNAME2 && credentials.pass === process.env.PASSWORD2) {
        return next();
      }
    }

    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied');
  });
}

// Configure Nunjucks
if (env === 'production') {
  nunjucks.configure(['app/views'], {
    autoescape: true,
    express: app,
    noCache: false});
} else {
  nunjucks.configure(['app/views'], {
    autoescape: true,
    express: app,
    noCache: true
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set app name
app.use((req, res, next) => {
  res.locals.appName = config.appName;
  next();
});

app.use((req, res, next) => {
  res.locals.active = {};

  if (req.originalUrl === '/patches/' || req.originalUrl === '/patches') {
    res.locals.active.patches = 'active';
  } else if (req.originalUrl === '/stickers/' || req.originalUrl === '/stickers') {
    res.locals.active.stickers = 'active';
  } else if (req.originalUrl === '/posters/' || req.originalUrl === '/posters') {
    res.locals.active.posters = 'active';
  }

  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
