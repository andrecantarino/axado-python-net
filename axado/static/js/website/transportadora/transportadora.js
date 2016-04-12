$(document).ready(function () {
	try{
		//$('#cnpj').mask('99.999.999/9999-99');
		$('.telcliente').mask('(99) 9999?9-9999');
	}
	catch(e){ }

	/* FORMATAR TELEFONE 8 E 9 DIGITOS */
	try{
		$('.telcliente').on('blur', function() {
		    var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );

		    if( last.length == 3 ) {
		        var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
		        var lastfour = move + last;
		        var first = $(this).val().substr( 0, 9 );

		        $(this).val( first + '-' + lastfour );
		    }
		});
	}
	catch(e){}
});