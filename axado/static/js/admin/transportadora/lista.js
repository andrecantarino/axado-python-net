$(document).ready(function () {
	/* FORMATAR CNPJ DAS TRANSPORTADORAS */
    try {
        $('.td-cnpj').each(function (i) {
            var cnpj = $(this).html().replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            $(this).html(cnpj);
        });
    }
    catch (e) {
        console.log(e.message);
    }

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
	        		if (!data.erro) {
                        $('#tr-' + cnpj).barrating('readonly', true);

                        $('#message').html("<div class='alert alert-success alert-dismissible' role='alert'>"
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                            + "<span aria-hidden='true'>&times;</span></button>"
                            + "Sua avaliação foi feita com sucesso!"
                            + "</div>");
                        $('#message').removeClass('hide');
                    }
                    else {
                        $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                            + "<span aria-hidden='true'>&times;</span></button>"
                            + "Não foi possível salvar sua avaliação."
                            + "</div>");
                        $('#message').removeClass('hide');
                    }
		        });
	    	}
  		}
	});

	/* DESATIVAR CLASSIFICACAO */
    try {
        //PERCORRER PARAMETRO DE CONTROLE DAS TRANSPORTADORAS AVALIADAS,
        //ATRAVES DA JUNCAO CNPJ-NOTA IRA DESATIVAR O AS ESTRELAS QUE POSSIBILITAM A CLASSIFICACAO
        if ($('#hd-lista').val().length > 0) {
            var cnpj = $('#hd-lista').val().split(';'), cn = '', rt = '';

            for (var i = 0; i < cnpj.length; i++) {
                if (cnpj[i].length > 0) {
                    cn = cnpj[i].split('|')[0];
                    rt = cnpj[i].split('|')[1];

                    $('#tr-' + cn).barrating('set', rt);
                    $('#tr-' + cn).barrating('readonly', true);
                }
            }
        }
    }
    catch (e) {
        console.log(e.message);
    }
});