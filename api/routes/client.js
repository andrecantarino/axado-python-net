module.exports = function(app) {
  
	var client = app.controllers.client;

	app.get('/cliente', client.search);
	app.get('/cliente/listar', client.list);
	app.get('/cliente/:cpf', client.show);
	app.post('/cliente/salvar', client.save);
	app.put('/cliente/editar/:cpf', client.update);
	app.delete('/cliente/deletar/:cpf', client.delete);
};