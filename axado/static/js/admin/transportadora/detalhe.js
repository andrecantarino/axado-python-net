$(document).ready(function () {
	try{
		$('.telefone').each(function(i){
			if (i == 1 && $(this).length > 0){
				$(this).html(mascaraTelefone($(this).html()));
			}
		});
	}
	catch(e){ }
});

/* FORMATAR TELEFONE 9 E 8 DIGITOS */
function mascaraTelefone(tel) {
    tel = tel.replace(/\D/g, "");
    tel = tel.replace(/^(\d\d)(\d)/g, "($1) $2");

    if (tel.length > 13) {
        tel = tel.replace(/(\d{5})(\d)/, "$1-$2");
    }
    else {
        tel = tel.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return tel;
}