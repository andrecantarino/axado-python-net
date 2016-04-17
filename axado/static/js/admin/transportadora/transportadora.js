$(document).ready(function () {
	/* CONFIGURAR MASCARAS DO FORMULARIO */
    try {
        $('#cnpj').mask('99.999.999/9999-99');
        $('.telcliente').mask('(99) 99999-9999');
    }
    catch (e) {
        console.log(e.message);
    }

    /* CONFIGURAR DADOS DA TRANSPORTADORA */
    try {
        $('#cnpj').val($('#cnpj').attr('data-cnpj').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"));
        $('.telcliente').val(formatarTelefone($('.telcliente').attr('data-phone')));
    }
    catch (e) {
        console.log(e.message);
    }

	/* FORMATAR TELEFONE 8 E 9 DIGITOS AO SAIR DO CAMPO */
    try {
        $('.telcliente').on('blur', function () {            
            $(this).val(formatarTelefone($(this).val()));
        });
    }
    catch (e) {
        console.log(e.message);
    }
});

function formatarTelefone(tel) {
    var last = tel.substr(tel.indexOf("-") + 1);

    if (last.length == 3) {
        var move = tel.substr(tel.indexOf("-") - 1, 1);
        var lastfour = move + last;
        var first = tel.substr(0, 9);

        tel = first + '-' + lastfour;
    }

    return tel;
}