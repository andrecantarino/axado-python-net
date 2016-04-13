$(document).ready(function(){
	try{
		if ($.cookie("name").length > 0){
			$('.usuario-logado').html('Olá, ' + $.cookie('name') + '!').removeClass('hide');
		}
		else{
			$('.usuario-logado').html('').addClass('hide');
		}
	}
	catch(e){}

	/* BOTAO SAIR - LOGOUT */
	try{
		$("body").on("click", ".logout", function(){
			$.removeCookie('id', { path: '/' });
			$.removeCookie('name', { path: '/' });
			$.removeCookie('cpf', { path: '/' });
			$.removeCookie('email', { path: '/' });

			window.location = '/admin';
		});
	}
	catch(e){}
});