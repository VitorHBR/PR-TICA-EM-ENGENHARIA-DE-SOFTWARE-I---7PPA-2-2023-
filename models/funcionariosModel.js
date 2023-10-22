const Database = require('../db/database');

const conexao = new Database();
class FuncionariosModel {

    #idFuncionario;
    #funcionarioCPF;
    #funcionarioNome;
    #funcionarioCargo;
    #funcionarioDepartamento;
    #funcionarioTelefone;
    #dataAdmissao;
    #funcionarioEmail;
    #funcionarioSenha;

    get idFuncionario() { return this.#idFuncionario; } set idFuncionario(idFuncionario) {this.#idFuncionario = idFuncionario;}
    get funcionarioCPF() { return this.#funcionarioCPF; } set funcionarioCPF(funcionarioCPF) {this.#funcionarioCPF = funcionarioCPF;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    get funcionarioCargo() { return this.#funcionarioCargo; } set funcionarioCargo(funcionarioCargo) {this.#funcionarioCargo = funcionarioCargo;}
    get funcionarioDepartamento() { return this.#funcionarioDepartamento; } set funcionarioDepartamento(funcionarioDepartamento) {this.#funcionarioDepartamento = funcionarioDepartamento;}
    get funcionarioTelefone() { return this.#funcionarioTelefone; } set funcionarioTelefone(funcionarioTelefone) {this.#funcionarioTelefone = funcionarioTelefone;}
    get dataAdmissao() { return this.#dataAdmissao; } set dataAdmissao(dataAdmissao) {this.#dataAdmissao = dataAdmissao;}
    get funcionarioEmail() { return this.#funcionarioEmail; } set funcionarioEmail(funcionarioEmail) {this.#funcionarioEmail = funcionarioEmail;}
    get funcionarioSenha() { return this.#funcionarioSenha; } set funcionarioSenha(funcionarioSenha) {this.#funcionarioSenha = funcionarioSenha;}

    constructor(idFuncionario, funcionarioCPF, funcionarioNome, funcionarioCargo, funcionarioDepartamento, funcionarioTelefone, dataAdmissao, funcionarioEmail, funcionarioSenha) {
        this.#idFuncionario = idFuncionario
        this.#funcionarioCPF = funcionarioCPF
        this.#funcionarioNome = funcionarioNome
        this.#funcionarioCargo = funcionarioCargo
        this.#funcionarioDepartamento = funcionarioDepartamento;
        this.#funcionarioTelefone = funcionarioTelefone;
        this.#dataAdmissao = dataAdmissao;
        this.#funcionarioEmail = funcionarioEmail;
        this.#funcionarioSenha = funcionarioSenha;
    }


    async listarFuncionarios() {

        let sql = 'SELECT * FROM `funcionario`';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new FuncionariosModel(row['idFuncionario'], row['funcionarioCPF'], row['funcionarioNome'], row['funcionarioCargo'], row['funcionarioDepartamento'], row['funcionarioTelefone'], row['dataAdmissao'], row['funcionarioEmail'], row['funcionarioSenha']));
            }
        }

        return listaRetorno;
    }



    async buscarFuncionarios() {

        let sql = "SELECT * FROM `funcionario` WHERE `funcionarioNome` LIKE '%"+this.funcionarioNome+"%' ORDER BY `funcionario`.`funcionarioNome` ASC";
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new FuncionariosModel(row['idFuncionario'], row['funcionarioCPF'], row['funcionarioNome'], row['funcionarioCargo'], row['funcionarioDepartamento'], row['funcionarioTelefone'], row['dataAdmissao'], row['funcionarioEmail'], row['funcionarioSenha']));
                
                
            }
        }

        return listaRetorno;
    }


    async deletarFuncionarios(id) {

        let sql = "DELETE FROM `funcionario` WHERE `funcionario`.`idFuncionario` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

}

module.exports = FuncionariosModel;