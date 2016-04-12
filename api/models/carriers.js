module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var carriers = Schema({
      name: { type: String, required: true }, 
      company_name: { type: String, required: true }, 
      cnpj: { type: String, required: true, index: { unique: true } },
      phone: { type: String },
      email: { type: String, index: { unique: true } },
  });

  return db.model('carriers', carriers);
};