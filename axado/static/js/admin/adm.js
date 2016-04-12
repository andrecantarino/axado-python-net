$(document).ready(function(){
	//LOGAR
	$("#btn-entrar").on("click", function(){
		var email = $("#email").val(), psw = $("#psw").val();

		if (email.length > 0 && psw.length > 0){
			$.ajax({
	            type: "POST",
	            url: "/admin/login/check/",
	            async: false,
	            data: { email: email, psw: psw }
	        }).done(function(data) {
        		if (!data.erro){
        			$.cookie.raw = true;
					$.cookie.json = true;

					$.cookie('id', data.lista._id, { expires: 365, path: '/' });
					$.cookie('name', data.lista.name, { expires: 365, path: '/' });
					$.cookie('cpf', data.lista.cpf, { expires: 365, path: '/' });
					$.cookie('email', data.lista.email, { expires: 365, path: '/' });

					window.location = '/admin/transportadora/';
        		}
        		else{
        			alert("Verifique o usuário e a senha!");
        		}
	        });
	    }
	    else{
	    	alert("Favor digitar o e-mail e a senha.");
	    }
	});
});