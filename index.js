class Cliente{
    constructor(nome, email, cpf){
        this.nome = nome
        this.email = email
        this.cpf = cpf
    }
}
function validaEmail(cliente) {
    if(cliente.email.indexOf("@")==-1) {
        return "E-mail inválido"
    }
}
function verificaDados(cliente) {
    if(cliente.email.trim()=="" || cliente.cpf.trim()=="") {
        return "Preencha os dados solicitados"
    }
}
module.exports = {
    Cliente,
    validaEmail,
    verificaDados
}