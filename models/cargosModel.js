const Database = require('../db/database');

const conexao = new Database();
class CargosModel {

    #idCargo;
    #nomeCargo;
 

    get idCargo() { return this.#idCargo; } set idCargo(idCargo) {this.#idCargo = idCargo;}
    get nomeCargo() { return this.#nomeCargo; } set nomeCargo(nomeCargo) {this.#nomeCargo = nomeCargo;}


    constructor(idCargo, nomeCargo) {
        this.#idCargo = idCargo
        this.#nomeCargo = nomeCargo
   
    }


    async listarCargos() {

        let sql = 'SELECT * FROM `cargo`';
        
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

}

module.exports = CargosModel;