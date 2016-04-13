module.exports = function(app) {
  
	var rating = app.controllers.rating;

	app.get('/rating/:cpf', rating.list);
};