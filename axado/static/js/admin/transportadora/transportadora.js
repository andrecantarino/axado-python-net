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

	/* CLASSIFICAR TRANSPORTADORA */
	$('.rating').barrating({
		theme: 'fontawesome-stars',
		onSelect: function(value, text, event) {
			if (typeof(event) !== 'undefined') {
	      		// rating was selected by a user
	      		//console.log(event.target);
	      		var cnpj = $(this)[0].$elem.attr("data-cnpj");
	      		$.ajax({
                    type: "POST",
                    url: "/admin/transportadora/avaliar",
                    data: {
                        cpf: $.cookie("cpf"),
                        cnpj: $(this)[0].$elem.attr("data-cnpj"),
                        rating: value
                    }
                }).done(function(data) {
	        		if (!data.erro){
	        			$('#tr-' + cnpj).barrating('readonly', true);
	        		}
	        		else{
	        			alert("Não foi possível salvar sua avaliação");
	        		}
		        });
	    	}
  		}
	});

	/* DESATIVAR CLASSIFICACAO */
	if ($('#hd-lista').val().length > 0){
		var cnpj = $('#hd-lista').val().split(';'), cn = '', rt = '';

		for (var i=0; i < cnpj.length; i++) {
			if (cnpj[i].length > 0){
				cn = cnpj[i].split('|')[0];
				rt = cnpj[i].split('|')[1];

				$('#tr-' + cn).barrating('set', rt);
				$('#tr-' + cn).barrating('readonly', true);
			}
		}
	}
});