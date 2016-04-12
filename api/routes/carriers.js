module.exports = function(app) {
  
	var carriers = app.controllers.carriers;

	app.get('/transportadora', carriers.search);
	app.get('/transportadora/listar', carriers.list);
	app.get('/transportadora/:cnpj', carriers.show);
	app.post('/transportadora/salvar', carriers.save);
	app.post('/transportadora/avaliar', carriers.rating);
	app.put('/transportadora/editar/:cnpj', carriers.update);
	app.delete('/transportadora/deletar/:cnpj', carriers.delete);
};