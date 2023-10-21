const Database = require('../db/database');

const conexao = new Database();
class EscalasModel {

    #idEscala;
    #nomeEscala;
    #horarioEntrada;
    #horarioSaida;
 

    get idEscala() { return this.#idEscala; } set idEscala(idEscala) {this.#idEscala = idEscala;}
    get nomeEscala() { return this.#nomeEscala; } set nomeEscala(nomeEscala) {this.#nomeEscala = nomeEscala;}
    get horarioEntrada() { return this.#horarioEntrada; } set horarioEntrada(horarioEntrada) {this.#horarioEntrada = horarioEntrada;}
    get horarioSaida() { return this.#horarioSaida; } set horarioSaida(horarioSaida) {this.#horarioSaida = horarioSaida;}


    constructor(idEscala, nomeEscala, horarioEntrada, horarioSaida) {
        this.#idEscala = idEscala
        this.#nomeEscala = nomeEscala
        this.#horarioEntrada = horarioEntrada
        this.#horarioSaida = horarioSaida

   
    }


    async listarEscalas() {

        let sql = 'SELECT * FROM `escaladetrabalho`';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new EscalasModel(row['idEscala'], row['nomeEscala'], row['horarioEntrada'], row['horarioSaida']));
            }
        }

        return listaRetorno;
    }

    async deletarEscalas(id) {

        let sql = "DELETE FROM `escaladetrabalho` WHERE `escaladetrabalho`.`idEscala` = '"+id+"'";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async cadastrarEscalas() {

        let sql = "INSERT INTO `escaladetrabalho`(`nomeEscala`, `horarioEntrada`, `horarioSaida`) VALUES ('"+this.#nomeEscala+"', '"+this.#horarioEntrada+"', '"+this.#horarioSaida+"')";
        
        var rows = await conexao.ExecutaComando(sql);

        return true;
    }

    async buscarEscalas() {

        let sql = "SELECT * FROM `escaladetrabalho` WHERE `nomeEscala` LIKE '%" + this.nomeEscala + "%' ORDER BY `escaladetrabalho`.`nomeEscala` ASC";

        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new EscalasModel(row['idEscala'], row['nomeEscala'], row['horarioEntrada'], row['horarioSaida']));
                
                
            }
        }

        return listaRetorno;
    }



    async alterarEscalas() {
        let sql = "UPDATE `escaladetrabalho` SET `nomeEscala` = ?, `horarioEntrada` = ?, `horarioSaida` = ?  WHERE `escaladetrabalho`.`idEscala` = ?";
      
        var values = [this.nomeEscala, this.horarioEntrada, this.horarioSaida, this.idEscala];
      
        var rows = await conexao.ExecutaComando(sql, values);
      
        return true;
    }
    


}

module.exports = EscalasModel;