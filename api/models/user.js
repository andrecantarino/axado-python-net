module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var user = Schema({
      name: { type: String, required: true }, 
      cpf: { type: String, required: true, index: {unique: true} },
      email: { type: String, required: true, index: {unique: true} },
      password: { type: String, required: true }, 
  });

  return db.model('user', user);
};