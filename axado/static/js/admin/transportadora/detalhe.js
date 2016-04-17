$(document).ready(function () {
    $('.info-telefone').html(mascaraTelefone($('.info-telefone').html()));
    $('.info-cnpj').html($('.info-cnpj').html().replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"));
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