module.exports = function(app) {
  
	var user = app.controllers.user;

	app.get('/usuario/listar', user.list);
	app.post('/usuario/login', user.login);
	app.post('/usuario/salvar', user.save);
	app.delete('/usuario/deletar/:cpf', user.delete);
};