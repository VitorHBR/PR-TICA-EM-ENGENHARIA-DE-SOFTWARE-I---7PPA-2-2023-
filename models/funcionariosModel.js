const Database = require('../db/database');

const conexao = new Database();
class FuncionariosModel {

    #idFuncionario;
    #funcionarioCPF;
    #funcionarioNome;
    #idCargo;
    #funcionarioCargo;
    #funcionarioEscala;
    #funcionarioDepartamento;
    #funcionarioTelefone;
    #dataAdmissao;
    #funcionarioEmail;
    #funcionarioSenha;

    get idFuncionario() { return this.#idFuncionario; } set idFuncionario(idFuncionario) {this.#idFuncionario = idFuncionario;}
    get funcionarioCPF() { return this.#funcionarioCPF; } set funcionarioCPF(funcionarioCPF) {this.#funcionarioCPF = funcionarioCPF;}
    get funcionarioNome() { return this.#funcionarioNome; } set funcionarioNome(funcionarioNome) {this.#funcionarioNome = funcionarioNome;}
    get idCargo() { return this.#idCargo; } set idCargo(idCargo) {this.#idCargo = idCargo;}
    get funcionarioCargo() { return this.#funcionarioCargo; } set funcionarioCargo(funcionarioCargo) {this.#funcionarioCargo = funcionarioCargo;}
    get funcionarioEscala() { return this.#funcionarioEscala; } set funcionarioEscala(funcionarioEscala) {this.#funcionarioEscala = funcionarioEscala;}
    get funcionarioDepartamento() { return this.#funcionarioDepartamento; } set funcionarioDepartamento(funcionarioDepartamento) {this.#funcionarioDepartamento = funcionarioDepartamento;}
    get funcionarioTelefone() { return this.#funcionarioTelefone; } set funcionarioTelefone(funcionarioTelefone) {this.#funcionarioTelefone = funcionarioTelefone;}
    get dataAdmissao() { return this.#dataAdmissao; } set dataAdmissao(dataAdmissao) {this.#dataAdmissao = dataAdmissao;}
    get funcionarioEmail() { return this.#funcionarioEmail; } set funcionarioEmail(funcionarioEmail) {this.#funcionarioEmail = funcionarioEmail;}
    get funcionarioSenha() { return this.#funcionarioSenha; } set funcionarioSenha(funcionarioSenha) {this.#funcionarioSenha = funcionarioSenha;}

    constructor(idFuncionario, funcionarioCPF, funcionarioNome, funcionarioCargo,funcionarioEscala, funcionarioDepartamento, funcionarioTelefone, dataAdmissao, funcionarioEmail, funcionarioSenha, idCargo) {
        this.#idFuncionario = idFuncionario;
        this.#funcionarioCPF = funcionarioCPF;
        this.#funcionarioNome = funcionarioNome;
        this.#idCargo = idCargo;
        this.#funcionarioCargo = funcionarioCargo;
        this.#funcionarioEscala = funcionarioEscala;
        this.#funcionarioDepartamento = funcionarioDepartamento;
        this.#funcionarioTelefone = funcionarioTelefone;
        this.#dataAdmissao = dataAdmissao;
        this.#funcionarioEmail = funcionarioEmail;
        this.#funcionarioSenha = funcionarioSenha;
    }


    async listarFuncionarios() {

        let sql = 'SELECT * FROM `funcionario` INNER JOIN cargo ON funcionario.cargo_idCargo=idCargo INNER JOIN departamento ON funcionario.departamento_idDepartamento=departamento.idDepartamento INNER JOIN escaladetrabalho ON funcionario.escalaDeTrabalho_idEscalaDeTrabalho = escaladetrabalho.idEscala';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new FuncionariosModel(row['idFuncionario'], row['funcionarioCPF'], row['funcionarioNome'], row['nomeCargo'], row['nomeDepartamento'],row['nomeEscala'] , row['funcionarioTelefone'], row['dataAdmissao'], row['funcionarioEmail'], row['funcionarioSenha'], row['idCargo']));
            }
        }

        return listaRetorno;
    }



    async buscarFuncionarios() {

        let sql = "SELECT * FROM `funcionario` INNER JOIN departamento ON funcionario.departamento_idDepartamento=departamento.idDepartamento INNER JOIN escaladetrabalho ON funcionario.escalaDeTrabalho_idEscalaDeTrabalho = escaladetrabalho.idEscala WHERE `funcionarioNome` LIKE '%"+this.funcionarioNome+"%' ORDER BY `funcionario`.`funcionarioNome` ASC";
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new FuncionariosModel(row['idFuncionario'], row['funcionarioCPF'], row['funcionarioNome'], row['nomeCargo'], row['nomeDepartamento'],row['nomeEscala'] , row['funcionarioTelefone'], row['dataAdmissao'], row['funcionarioEmail'], row['funcionarioSenha'], row['idCargo']));
                
                
            }
        }

        return listaRetorno;
    }


    async deletarFuncionarios(id) {

        let sql = "DELETE FROM `funcionario` WHERE `funcionario`.`idFuncionario` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }


    async autenticarFuncionario (usuario, senha) {
        const sql = "SELECT * FROM `funcionario` WHERE `funcionarioEmail` LIKE '"+usuario+"' AND `funcionarioSenha` LIKE '"+senha+"'";
       
        var row = await conexao.ExecutaComando(sql);
        
        if(row.length > 0)
            return row;
        else 
            return null;
    }
    
    async cadastrarFuncionarios() {

        let sql = "INSERT INTO `funcionario`(`funcionarioCPF`, `funcionarioNome`, `funcionarioTelefone`, `dataAdmissao`, `funcionarioEmail`, `funcionarioSenha`, `departamento_idDepartamento`, `cargo_idCargo`, `escalaDeTrabalho_idEscalaDeTrabalho`) VALUES ('"+this.funcionarioCPF+"','"+this.funcionarioNome+"','"+this.funcionarioTelefone+"','"+this.dataAdmissao+"','"+this.funcionarioEmail+"','"+this.#funcionarioSenha+"','"+this.funcionarioDepartamento+"','"+this.funcionarioCargo+"','"+this.funcionarioEscala+"')";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async alterarFuncionarios() {
        let sql = "UPDATE `funcionario` SET `funcionarioCPF`=?,`funcionarioNome`=?,`funcionarioTelefone`=?,`funcionarioEmail`=?,`funcionarioSenha`=?,`escalaDeTrabalho_idEscalaDeTrabalho`=? WHERE `funcionario`.`idFuncionario` = ?";
      
        var values = [this.funcionarioCPF, this.funcionarioNome, this.funcionarioTelefone, this.funcionarioEmail, this.funcionarioSenha,this.funcionarioEscala, this.idFuncionario];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }

}

module.exports = FuncionariosModel;