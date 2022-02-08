class Despesa {

    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (const x in this) {
            if (this[x] === undefined || this[x] === '' || this[x] === null) {
                return false;
            }
        }
        return true;
    }
}

class BD {

    constructor() {

        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    proximoId() {

        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(obj) {

        let id = this.proximoId();

        localStorage.setItem(id, JSON.stringify(obj));

        localStorage.setItem('id', id);
    }
}

let bd = new BD();


function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    );

    if (despesa.validarDados()) {
        bd.gravar(despesa);

        document.getElementById('modal_div').className = "modal-header text-success";
        document.getElementById('titulo_modal').innerHTML = "Registro inserido com sucesso!";
        document.getElementById('modal_conteudo').innerHTML = "Despesa foi cadastrada com sucesso";
        document.getElementById('btn_modal').innerHTML = 'Voltar';
        document.getElementById('btn_modal').className = 'btn btn-success';


        $('#modalRegistraGravacao').modal('show');
    } else {

        document.getElementById('modal_div').className = "modal-header text-danger";
        document.getElementById('titulo_modal').innerHTML = "Erro na inclusão do registro!";
        document.getElementById('modal_conteudo').innerHTML = "Existem campos obrigatórios não preenchidos!";
        document.getElementById('btn_modal').innerHTML = 'Voltar e corrigir';
        document.getElementById('btn_modal').className = 'btn btn-danger';

        $('#modalRegistraGravacao').modal('show');
    }

}