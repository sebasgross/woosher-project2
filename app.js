require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport = require('./helpers/passport')
const session = require('express-session')

mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

//session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  httpOnly: true,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 2419200000 },
}));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
//   }),
// )


app.use(passport.initialize())
app.use(passport.session())

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'The Whoosh app';
//
app.locals.loggedUser = false

function isLogged(req, res, next) {
  if (req.isAuthenticated()) {
    app.locals.loggedUser = true
    next()
  } else {
    app.locals.loggedUser = false
    next()
  }
}
//handlebar
hbs.registerHelper('ifCond',function(v1,v2,options){
  if(v1 === v2){
    return options.fn(this);
  }
  return options.inverse(this);
});

const index = require('./routes/index');
const auth = require('./routes/auth')
const service = require('./routes/service')
app.use('/service', isLogged, service)
app.use('/', isLogged, auth)
app.use('/', isLogged, index)

module.exports = app;
