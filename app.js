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
            if (this[x] === undefined || this[x] === "" || this[x] === null) {
                return false;
            }
        }
        return true;
    }
}

class BD {
    constructor() {
        let id = localStorage.getItem("id");

        if (id === null) {
            localStorage.setItem("id", 0);
        }
    }

    proximoId() {
        let proximoId = localStorage.getItem("id");
        return parseInt(proximoId) + 1;
    }

    gravar(obj) {
        let id = this.proximoId();

        localStorage.setItem(id, JSON.stringify(obj));

        localStorage.setItem("id", id);
    }

    recuperarTodosRegistros() {
        let despesas = Array();

        let id = localStorage.getItem("id");

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));

            if (despesa === null) {
                continue;
            }

            despesas.push(despesa);
        }
        return despesas;
    }

    pesquisar(obj) {

        let despesasFiltradas = Array();

        despesasFiltradas = this.recuperarTodosRegistros();

        if (obj.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(x => x.ano == obj.ano);
        }

        if (obj.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(x => x.dia == obj.dia);
        }

        if (obj.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(x => x.mes == obj.mes);
        }

        if (obj.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(x => x.tipo == obj.tipo);
        }

        if (obj.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(x => x.descricao == obj.descricao);
        }

        if (obj.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(x => x.valor == obj.valor);
        }

        return despesasFiltradas;
    }
}

let bd = new BD();

function cadastrarDespesa() {
    let ano = document.getElementById("ano");
    let mes = document.getElementById("mes");
    let dia = document.getElementById("dia");
    let tipo = document.getElementById("tipo");
    let descricao = document.getElementById("descricao");
    let valor = document.getElementById("valor");

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

        document.getElementById("modal_div").className =
            "modal-header text-success";
        document.getElementById("titulo_modal").innerHTML =
            "Registro inserido com sucesso!";
        document.getElementById("modal_conteudo").innerHTML =
            "Despesa foi cadastrada com sucesso";
        document.getElementById("btn_modal").innerHTML = "Voltar";
        document.getElementById("btn_modal").className = "btn btn-success";

        $("#modalRegistraGravacao").modal("show");

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        document.getElementById("modal_div").className = "modal-header text-danger";
        document.getElementById("titulo_modal").innerHTML =
            "Erro na inclusão do registro!";
        document.getElementById("modal_conteudo").innerHTML =
            "Existem campos obrigatórios não preenchidos!";
        document.getElementById("btn_modal").innerHTML = "Voltar e corrigir";
        document.getElementById("btn_modal").className = "btn btn-danger";

        $("#modalRegistraGravacao").modal("show");
    }
}

function carregarListaDespesas(despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros();
    }

    let listaDespesas = document.getElementById("lista_despesas");
    listaDespesas.innerHTML = '';

    despesas.forEach((obj) => {
        let linha = listaDespesas.insertRow();

        linha.insertCell(0).innerHTML = `${obj.dia}/${obj.mes}/${obj.ano}`;

        switch (obj.tipo) {
            case "1":
                obj.tipo = "Alimentação";
                break;
            case "2":
                obj.tipo = "Educação";
                break;
            case "3":
                obj.tipo = "Lazer";
                break;
            case "4":
                obj.tipo = "Saúde";
                break;
            case "5":
                obj.tipo = "Transporte";
                break;
        }

        linha.insertCell(1).innerHTML = obj.tipo;
        linha.insertCell(2).innerHTML = obj.descricao;
        linha.insertCell(3).innerHTML = obj.valor;
    });
}

function pesquisarDespesa() {

    let ano = document.getElementById("ano");
    let mes = document.getElementById("mes");
    let dia = document.getElementById("dia");
    let tipo = document.getElementById("tipo");
    let descricao = document.getElementById("descricao");
    let valor = document.getElementById("valor");

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    );

    let despesas = bd.pesquisar(despesa);

    carregarListaDespesas(despesas, true);
}