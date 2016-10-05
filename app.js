var express = require('express');
var path = require('path');
var routes = require('./routes/');
const port=3000;
// to get post request body:
var bodyParser = require('body-parser');
// to check if redirected after wrong login:
var session = require('express-session');
var cookieParser = require('cookie-parser'); 

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// session 
app.use(cookieParser());
app.use(session({
	secret:'somesecrettokenhere',
	resave: false,
	saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
