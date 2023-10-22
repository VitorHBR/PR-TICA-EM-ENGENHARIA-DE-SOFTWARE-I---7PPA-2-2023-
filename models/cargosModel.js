const Database = require('../db/database');

const conexao = new Database();
class CargosModel {

    #idCargo;
    #nomeCargo;
    #departamento_idDepartamento;

    get idCargo() { return this.#idCargo; } set idCargo(idCargo) {this.#idCargo = idCargo;}
    get nomeCargo() { return this.#nomeCargo; } set nomeCargo(nomeCargo) {this.#nomeCargo = nomeCargo;}
    get departamento_idDepartamento() { return this.#departamento_idDepartamento; } set departamento_idDepartamento(departamento_idDepartamento) {this.#departamento_idDepartamento = departamento_idDepartamento;}

    constructor(idCargo, nomeCargo,departamento_idDepartamento) {
        this.#idCargo = idCargo
        this.#nomeCargo = nomeCargo
        this.#departamento_idDepartamento = departamento_idDepartamento
   
    }


    async listarCargos() {

        let sql = 'SELECT * FROM `cargo` JOIN `departamento` ON cargo.departamento_idDepartamento = departamento.idDepartamento';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new CargosModel(row['idCargo'], row['nomeCargo'], row['nomeDepartamento']));
            }
        }

        return listaRetorno;
    }

    async deletarCargos(id) {

        let sql = "DELETE FROM `cargo` WHERE `cargo`.`idCargo` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async cadastrarCargos() {

        let sql = "INSERT INTO `cargo`(`nomeCargo`, `departamento_idDepartamento`) VALUES ('"+this.nomeCargo+"','"+this.departamento_idDepartamento+"');";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async buscarCargos() {

        let sql = "SELECT * FROM `cargo` JOIN `departamento` ON cargo.departamento_idDepartamento = departamento.idDepartamento WHERE `nomeCargo` LIKE '%"+this.nomeCargo+"%' ORDER BY `cargo`.`nomeCargo` ASC";
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new CargosModel(row['idCargo'], row['nomeCargo']));
                
                
            }
        }

        return listaRetorno;
    }



    async alterarCargos() {
        let sql = "UPDATE `cargo` SET `nomeCargo` = ?,`departamento_idDepartamento`= ? WHERE `cargo`.`idCargo` = ?";
      
        var values = [this.nomeCargo,this.departamento_idDepartamento,this.idCargo];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
      }


}

module.exports = CargosModel;