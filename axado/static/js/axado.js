$(document).ready(function(){
	/* VERFICAR SE USUARIO ESTA LOGADO E DAR MENSAGEM DE BOAS VINDAS */
    try {
		if ($.cookie("name").length > 0){
		    $('.usuario-logado').html('Olá, ' + $.cookie('name') + '!').removeClass('hide');
		    $('.li-transportadora').removeClass('hide');
		    $('.li-logout').removeClass('hide');
		}
		else{
		    $('.usuario-logado').html('').addClass('hide');
		    $('.li-login').removeClass('hide');
		}
	}
    catch (e) {
        $('.usuario-logado').html('').addClass('hide');
        $('.li-login').removeClass('hide');
    }

	/* BOTAO SAIR - LOGOUT */
	try{
		$("body").on("click", ".logout", function(){
			$.removeCookie('id', { path: '/' });
			$.removeCookie('name', { path: '/' });
			$.removeCookie('cpf', { path: '/' });
			$.removeCookie('email', { path: '/' });

			window.location = '/admin/';
		});
	}
    catch (e) {
        console.log(e.message);
    }
});