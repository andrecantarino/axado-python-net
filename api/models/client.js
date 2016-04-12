module.exports = function(app) {

  var db = require('../lib/db_connect')();
  var Schema = require('mongoose').Schema;

  var telefone = Schema({
      telefone: String
  },{ _id : false });

  var client = Schema({
      name: { type: String, required: true }, 
      cpf: { type: String, required: true, index: {unique: true} },
      email: { type: String, required: true, index: {unique: true} },
      maritalStatus: { type: String, required: true },
      logradouro: { type: String, required: true },
      numero: { type: String, required: true },
      complemento: { type: String, required: true },
      bairro: { type: String, required: true },
      nomebairro: { type: String, required: true },
      cidade: { type: String, required: true },
      nomecidade: { type: String, required: true },
      estado: { type: String, required: true },
      nomeestado: { type: String, required: true },
      telefones: [ telefone ]
  });

  return db.model('client', client);
};