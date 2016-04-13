module.exports = function(app) {

    var utilidade = require('../utilidade/utilidade');
    var User = app.models.user;

    var UserController = {

        list: function(req, res){
            User.find(function(err, users){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                }       
                
                res.json({ erro: false, mensagem: '', lista : users });
            });
        },

        show: function(req, res) {
            var id = req.params.id; 

            User.findOne({ "_id" : id }, function(err, users){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                } 
                else{
                    res.json({ erro: false, mensagem: '', lista: users });
                }      
            });
        },

        login: function(req, res){
            var email = req.body.email
                , password = req.body.password;

            User.findOne({
                $and: [
                    { 'email': email },
                    { 'password': password }
                ]
            },
            function(err, users){
                if(err){
                     res.json({ erro: true, mensagem: "Erro ao realizar o login do usuário", lista : null });   
                }   
                
                res.json({ erro: false, mensagem: '', lista : users });
            });
        },

        save: function(req, res) {
            var name = req.body.name
                , cpf = req.body.cpf
                , email = req.body.email
                , password = req.body.password;
                
            //cnpj = cnpj.replace(/\./g, '').replace(/\-/g, '');

            /* VALIDAR DADOS DO FORMULARIO */
            if (utilidade.validarDadosUsuario(name, cpf, email, password)){
                var u = new User();
                u.name = name;
                u.cpf = cpf;
                u.email = email;
                u.password = password;
                
                //SALVAR
                u.save(function(err){
                    if(err){
                        res.json({ erro: true, mensagem: err.message, lista : null });  
                    }
                    res.json({ erro: false, mensagem: 'Usuário adicionado com sucesso!', lista : null });
                });
            }
            else{
                res.json({ erro: true, mensagem: "Todos os campos são obrigatórios", lista : null });
            }
        },

        delete: function(req, res){
            var cpf = req.params.cpf.replace(/\./g, '').replace(/\-/g, '');
            User.remove({ cpf: cpf }, function(err, users){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                }
                res.json({ erro: false, mensagem: "Transportadora deletada com sucesso.", lista : null });
            });
        }
    }
  
    return UserController;
};