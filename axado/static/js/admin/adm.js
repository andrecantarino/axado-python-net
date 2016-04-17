$(document).ready(function(){
	//LOGAR
	$("#btn-entrar").on("click", function(){
		var email = $("#email").val(), psw = $("#psw").val();
		$('#message').removeClass('hide');

		if (email.length > 0 && psw.length > 0){
			$.ajax({
	            type: "POST",
	            url: "/admin/login/check/",
	            async: false,
	            data: { email: email, psw: $.md5(psw) }
	        }).done(function(data) {
        		if (!data.erro){
        			if (data.lista != null) {
	        			$.cookie.raw = true;
						$.cookie.json = true;

						$.cookie('id', data.lista._id, { expires: 365, path: '/' });
						$.cookie('name', data.lista.name, { expires: 365, path: '/' });
						$.cookie('cpf', data.lista.cpf, { expires: 365, path: '/' });
						$.cookie('email', data.lista.email, { expires: 365, path: '/' });

						window.location = '/admin/transportadora/';
					}
					else{
						$('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                            + "<span aria-hidden='true'>&times;</span></button>"
                            + "Não foi possível realizar o login, verifique o usuário e a senha."
                            + "</div>");
        		        $('#message').removeClass('hide');        		    
					}
        		}
        		else{
    				$('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                        + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                        + "<span aria-hidden='true'>&times;</span></button>"
                        + "Não foi possível realizar o login, verifique o usuário e a senha."
                        + "</div>");
    		        $('#message').removeClass('hide');
    		    }
	        });
	    }
	    else{
	    	$('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
	            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
	            + "<span aria-hidden='true'>&times;</span></button>"
	            + "Por favor digite o e-mail e a senha."
	            + "</div>");
		    $('#message').removeClass('hide');
	    }
	});

	/* BUSCAR TRANSPORTADORA (KEYPRESS) */
    $('#email, #psw').keypress(function (e) {
        var tecla = (e.keyCode ? e.keyCode : e.which);
        if (tecla == 13) {
            $('#btn-entrar').trigger('click');
        }
    });
});