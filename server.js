var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");
var app = express();
const logger = require('morgan');
const indexRouter = require('./routes')

app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  next();
});

app.use("/api", indexRouter);

app.get('/', function (req, res) {
  res.send('Welcome to Passport with Sequelize');
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});