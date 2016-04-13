module.exports = function(app) {

    var Rating = app.models.rating;

    var RatingController = {

        list: function(req, res) {
            var cpf = req.params.cpf; 

            Rating.find({ "cpf" : cpf }, function(err, ratings){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                } 
                else{
                    res.json({ erro: false, mensagem: '', lista: ratings });
                }      
            });
        },
    }
  
    return RatingController;
};