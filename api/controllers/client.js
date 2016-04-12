module.exports = function(app) {

    var utilidade = require('../utilidade/utilidade');
    var Client = app.models.client;

    var ClientController = {

        list: function(req, res){
            Client.find(function(err, clientes){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                }       
                
                res.json({ erro: false, mensagem: '', lista : clientes });
            });
        },

        show: function(req, res) {
            var cpf = req.params.cpf.replace(/\./g, '').replace(/\-/g, '');
            Client.find({ "cpf" : cpf }, function(err, cliente){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                } 
                else{
                    res.json({ erro: false, mensagem: '', lista: cliente });
                }      
            });
        },

        search: function(req, res) {
            var query = req.param('q');
            Client.find({ name : new RegExp(query, 'i') }, function(err, cliente){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                } 
                else{
                    res.json({ erro: false, mensagem: '', lista: cliente });
                }      
            });
        },

        save: function(req, res) {
            var cpf = req.body.cpf
                , name = req.body.name
                , email = req.body.email
                , maritalStatus = req.body.maritalStatus
                , telefones = req.body.telefones
                , logradouro = req.body.logradouro
                , numero = req.body.numero
                , complemento = req.body.complemento
                , bairro = req.body.bairro
                , nomebairro = req.body.nomebairro
                , cidade = req.body.cidade
                , nomecidade = req.body.nomecidade
                , estado = req.body.estado
                , nomeestado = req.body.nomeestado
                , cpfHidden = req.body.cpfHidden
                , emailHidden = req.body.emailHidden;

            var listaTel = '';
            cpf = cpf.replace(/\./g, '').replace(/\-/g, '');
            cpfHidden = cpfHidden.replace(/\./g, '').replace(/\-/g, '');

            /* VALIDAR DADOS DO FORMULARIO */
            if (utilidade.validarDadosCliente(cpf, name, email, maritalStatus, telefones, 
                logradouro, numero, bairro, cidade, estado)){
                /* VALIDAR EMAIL */
                if (utilidade.validarEmail(email)){
                    /* VERFICAR SE E-MAIL JA CADASTRADO */
                    Client.find({ "email" : email }, function(err, cliente){
                        if(err){
                            res.json({ erro: true, mensagem: "Erro ao verificar se e-mail do cliente", lista : null });
                        }   
                        else{
                            if (cliente.toString().length > 0){
                                res.json({ erro: true, mensagem: "Este e-mail já foi cadastrado", lista : null });
                            }
                            else{
                                /* VALIDAR CPF E VERIFICAR SE CPF CADASTRADO */
                                if(utilidade.validarCpf(cpf)) {
                                    Client.find({ "cpf" : cpf }, function(err, cliente){
                                        if(err){
                                             res.json({ erro: true, mensagem: "Erro ao verificar o CPF do cliente", lista : null });   
                                        }   
                                        else{
                                            if (cliente.toString().length > 0){
                                                res.json({ erro: true, mensagem: "Este CPF já foi cadastrado", lista : null });   
                                            }
                                            else{
                                                var c = new Client();
                                                c.cpf = cpf;
                                                c.name = name;
                                                c.email = email;
                                                c.maritalStatus = maritalStatus;
                                                c.logradouro = logradouro;
                                                c.numero = numero;
                                                c.complemento = complemento;
                                                c.bairro = bairro;
                                                c.nomebairro = nomebairro;
                                                c.cidade = cidade;
                                                c.nomecidade = nomecidade;
                                                c.estado = estado;
                                                c.nomeestado = nomeestado;
                                                
                                                //telefones
                                                listaTel = telefones.split(';');
                                                for (var i = 0; i < listaTel.length; i++) {
                                                    if (listaTel[i].length > 0){
                                                        c.telefones.push({ telefone: ''+ listaTel[i].replace(/\(/g, '').replace(/\)/g, '').replace(/\-/g, '').replace(/\s/g, '') +'' });
                                                    }
                                                };

                                                //SALVAR
                                                c.save(function(err){
                                                    if(err){
                                                        res.json({ erro: true, mensagem: err.message, lista : null });  
                                                    }
                                                    res.json({ erro: false, mensagem: 'Cliente adicionado com sucesso!', lista : null });
                                                });
                                            }
                                        }
                                    });

                                }
                                else{
                                    res.json({ erro: true, mensagem: "O CPF do cliente é inválido", lista : null });   
                                }

                            }
                        }
                    });
                }
                else{
                    res.json({ erro: true, mensagem: "O e-mail do cliente é inválido", lista : null });
                }
            }
            else{
                res.json({ erro: true, mensagem: "Todos os campos são obrigatórios", lista : null });
            }
        },

        update: function(req, res) {
            var cpf = req.body.cpf
                , name = req.body.name
                , email = req.body.email
                , maritalStatus = req.body.maritalStatus
                , telefones = req.body.telefones
                , logradouro = req.body.logradouro
                , numero = req.body.numero
                , complemento = req.body.complemento
                , bairro = req.body.bairro
                , nomebairro = req.body.nomebairro
                , cidade = req.body.cidade
                , nomecidade = req.body.nomecidade
                , estado = req.body.estado
                , nomeestado = req.body.nomeestado
                , telefoneHidden = req.body.telefoneHidden
                , cliente_id = req.body.clienteId;

            var listaTel = '', listaTelHidden = '';
            cpf = cpf.replace(/\./g, '').replace(/\-/g, '');

            /* VALIDAR DADOS DO FORMULARIO */
            if (utilidade.validarDadosCliente(cpf, name, email, maritalStatus, telefones, 
                logradouro, numero, bairro, cidade, estado)){
                /* VALIDAR EMAIL */
                if (utilidade.validarEmail(email)){
                    /* VERFICAR SE E-MAIL CADASTRADO, DESCONSIDERANDO CLIENTE ATUAL */
                    Client.findOne({
                        $and: [
                            { 'email': email },
                            { '_id': {'$ne': cliente_id } }
                        ]
                    },
                    function(err, cliente){
                        if(err){
                            res.json({ erro: true, mensagem: "Erro ao verificar o e-mail do cliente", lista : null });
                        }       
                        else{
                            if (cliente != null){
                                res.json({ erro: true, mensagem: "Este e-mail já foi cadastrado", lista : null });   
                            }
                            else{
                                /* VALIDAR CPF */
                                if(utilidade.validarCpf(cpf)) {
                                    /* VERIFICAR SE CPF CADASTRADO, DESCONSIDERANDO CLIENTE ATUAL */
                                    Client.findOne({
                                        $and: [
                                            { 'cpf': cpf },
                                            { '_id': {'$ne': cliente_id } }
                                        ]
                                    },
                                    function(err, cliente){
                                        if(err){
                                            res.json({ erro: true, mensagem: "Erro ao verificar o CPF do cliente", lista : null });
                                        }
                                        else{
                                            if (cliente != null){
                                                res.json({ erro: true, mensagem: "Este CPF já foi cadastrado", lista : null });
                                            }
                                            else{
                                                //EDITAR CLIENTE
                                                Client.findOne({ '_id': cliente_id }, function (err, cliente) {
                                                    if(err){    
                                                        res.json({ erro: true, mensagem: err.message, lista : null });  
                                                    }
                                                    else{
                                                        cliente.cpf = cpf;
                                                        cliente.name = name;
                                                        cliente.email = email;
                                                        cliente.maritalStatus = maritalStatus;
                                                        cliente.logradouro = logradouro;
                                                        cliente.numero = numero;
                                                        cliente.complemento = complemento;
                                                        cliente.bairro = bairro;
                                                        cliente.nomebairro = nomebairro;
                                                        cliente.cidade = cidade;
                                                        cliente.nomecidade = nomecidade;
                                                        cliente.estado = estado;
                                                        cliente.nomeestado = nomeestado;

                                                        if (telefones != telefoneHidden){
                                                            //deletar telefones cadastrados
                                                            listaTelHidden = telefoneHidden.split(';');
                                                            for (var i = 0; i < listaTelHidden.length; i++) {
                                                                if (listaTelHidden[i].length > 0){
                                                                    cliente.telefones.pull({ telefone: ''+ listaTelHidden[i].replace(/\(/g, '').replace(/\)/g, '').replace(/\-/g, '').replace(/\s/g, '') +'' });
                                                                }
                                                            };

                                                            //salvar telefones alterados
                                                            listaTel = telefones.split(';');
                                                            for (var j = 0; j < listaTel.length; j++) {
                                                                if (listaTel[j].length > 0){
                                                                    cliente.telefones.push({ telefone: ''+ listaTel[j].replace(/\(/g, '').replace(/\)/g, '').replace(/\-/g, '').replace(/\s/g, '') +'' });
                                                                }
                                                            };
                                                        }

                                                        cliente.save(function(err){
                                                            if(err){    
                                                                res.json({ erro: true, mensagem: err.message, lista : null });  
                                                            }
                                                            res.json({ erro: false, mensagem: 'Cliente alterado com sucesso!', lista : null });
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                else{
                                    res.json({ erro: true, mensagem: "O CPF do cliente é inválido", lista : null });   
                                }
                            }
                        }
                    });
                }
                else{
                    res.json({ erro: true, mensagem: "O e-mail do cliente é inválido", lista : null });   
                }
            }
            else{
                res.json({ erro: true, mensagem: "Todos os campos são obrigatórios", lista : null });
            }
        },

        delete: function(req, res){
            var cpf = req.params.cpf.replace(/\./g, '').replace(/\-/g, '');
            Client.remove({ cpf: cpf }, function(err, cliente){
                if(err){
                    res.json({ erro: true, mensagem: err.message, lista : null });  
                }
                res.json({ erro: false, mensagem: "Cliente deletado com sucesso.", lista : null });
            });
        }
    }
  
    return ClientController;
};