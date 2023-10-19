const FuncionariosModel = require("../models/funcionariosModel");

class FuncionariosController {

    async listarView(req, res) {
        let prod = new FuncionariosModel();
        let lista = await prod.listarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let prod = new FuncionariosModel();
        let lista = await prod.listarFuncionarios();
        res.send(lista);
    }
}

module.exports = FuncionariosController;