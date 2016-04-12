var express = require('express')
  , load = require('express-load')
  , bodyParser = require('body-parser')
  , app = express()
  , server = require('http').Server(app);
  

app.use(bodyParser.json());

load('models')
  .then('controllers')
  .then('routes')
  .into(app)
;

app.listen(3000, function(){
  console.log("API no ar.");
});

module.exports = app;