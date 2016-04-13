module.exports = function(app) {

    var utilidade = require('../utilidade/utilidade');
    var Carriers = app.models.carriers;
    var Rating = app.models.rating;

    var CarriersController = {

        list: function(req, res){
            Carriers.find(function(err, carriers){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                }       
                
                res.json({ erro: false, mensagem: '', lista : carriers });
            });
        },

        show: function(req, res) {
            var cnpj = req.params.cnpj.replace(/\./g, '').replace(/\-/g, '');
            Carriers.find({ "cnpj" : cnpj }, function(err, carriers){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                } 
                else{
                    res.json({ erro: false, mensagem: '', lista: carriers });
                }      
            });
        },

        search: function(req, res) {
            var query = req.param('q');
            Carriers.find({ name : new RegExp(query, 'i') }, function(err, carriers){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                } 
                else{
                    res.json({ erro: false, mensagem: '', lista: carriers });
                }      
            });
        },

        save: function(req, res) {
            var name = req.body.name
                , company_name = req.body.company_name
                , cnpj = req.body.cnpj
                , phone = req.body.phone
                , email = req.body.email;
                
            cnpj = cnpj.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');

            /* VALIDAR DADOS DO FORMULARIO */
            if (utilidade.validarDadosTransportadora(name, company_name, cnpj, phone, email)){
                var c = new Carriers();
                c.name = name;
                c.company_name = company_name;
                c.cnpj = cnpj;
                c.phone = phone;
                c.email = email;
                
                //SALVAR
                c.save(function(err){
                    if(err){
                        res.json({ erro: true, mensagem: err.message, lista : null });  
                    }
                    res.json({ erro: false, mensagem: 'Transportadora adicionada com sucesso!', lista : null });
                });
            }
            else{
                res.json({ erro: true, mensagem: "Todos os campos são obrigatórios", lista : null });
            }
        },

        rating: function(req, res) {
            var cpf = req.body.cpf
                , cnpj = req.body.cnpj
                , rating = req.body.rating;
                
            /* VALIDAR DADOS DA AVALIACAO */
            if (utilidade.validarDadosRating(cpf, cnpj, rating)){
                var r = new Rating();
                r.id = cpf + "_" + cnpj;
                r.rating = rating;
                r.cpf = cpf;
                r.cnpj = cnpj;
                
                //SALVAR
                r.save(function(err){
                    if(err){
                        res.json({ erro: true, mensagem: err.message, lista : null });  
                    }
                    res.json({ erro: false, mensagem: 'Avaliação realizada com sucesso!', lista : null });
                });
            }
            else{
                res.json({ erro: true, mensagem: "Todos os campos são obrigatórios", lista : null });
            }
        },

        update: function(req, res) {
            var name = req.body.name
                , company_name = req.body.company_name
                , cnpj = req.body.cnpj
                , phone = req.body.phone
                , email = req.body.email
                , carriers_id = req.body.transportadoraId;

            cnpj = cnpj.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');

            /* VALIDAR DADOS DO FORMULARIO */
            if (utilidade.validarDadosTransportadora(name, company_name, cnpj, phone, email)){
                //EDITAR TRANSPORTADORA
                Carriers.findOne({ '_id': carriers_id }, function (err, carriers) {
                    if(err){    
                        res.json({ erro: true, mensagem: err.message, lista : null });  
                    }
                    else{
                        carriers.name = name;
                        carriers.company_name = company_name;
                        carriers.cnpj = cnpj;
                        carriers.phone = phone;
                        carriers.email = email;

                        carriers.save(function(err){
                            if(err){    
                                res.json({ erro: true, mensagem: err.message, lista : null });  
                            }
                            res.json({ erro: false, mensagem: 'Transportadora alterada com sucesso!', lista : null });
                        });
                    }
                });                
            }
            else{
                res.json({ erro: true, mensagem: "Todos os campos são obrigatórios", lista : null });
            }
        },

        delete: function(req, res){
            var cnpj = cnpj.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');
            Carriers.remove({ cnpj: cnpj }, function(err, carriers){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                }
                res.json({ erro: false, mensagem: "Transportadora deletada com sucesso.", lista : null });
            });
        }
    }
  
    return CarriersController;
};