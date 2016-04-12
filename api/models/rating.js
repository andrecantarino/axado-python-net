module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var rating = Schema({
  	id: { type: String, required: true }, 
	rating: { type: String, required: true }
  });

  return db.model('rating', rating);
};