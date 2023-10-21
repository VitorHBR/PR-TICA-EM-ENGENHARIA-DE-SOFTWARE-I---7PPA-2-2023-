const EscalasModel = require("../models/escalasModel");

class EscalasController {

    async listarView(req, res) {
        let escala = new EscalasModel();
        let lista = await escala.listarEscalas();
        res.render('escalas/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let escala = new EscalasModel();
        let lista = await escala.listarEscalas();
        res.send(lista);
    }


    async deletarEscalas(req, res) {
        console.log(req.params.id);
        let escala = new EscalasModel();
        let retorno = await escala.deletarEscalas(req.params.id);
        let lista = await escala.listarEscalas();
        res.render('escalas/listar', {lista: lista});
        
    }

    async cadastrarEscalas(req, res) {
        console.log(req.body);
        let escala = new EscalasModel();

        escala.nomeEscala=req.body.nomeEscala;
        escala.horarioEntrada=req.body.horarioEntrada;
        escala.horarioSaida=req.body.horarioSaida;

       

        let retorno = await escala.cadastrarEscalas();
        let lista = await escala.listarEscalas();
        res.render('escalas/listar', {lista: lista});
    }


    async buscarEscalas(req, res) {
        let escala = new EscalasModel();
        escala.nomeEscala= req.body.busca;
        let lista = await escala.buscarEscalas();
        res.render('escalas/listar', {lista: lista});
    }

    async alterarEscalas(req, res) {
        
        console.log(req.body);
        let escala = new EscalasModel();

        escala.idEscala = req.body.idEscala;
        escala.nomeEscala= req.body.nomeEscala;
        escala.horarioEntrada= req.body.horarioEntrada;
        escala.horarioSaida= req.body.horarioSaida;
       

        let retorno = await escala.alterarEscalas();
        let lista = await escala.listarEscalas();
        res.render('escalas/listar', {lista: lista});
    }

}

module.exports = EscalasController;