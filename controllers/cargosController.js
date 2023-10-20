const CargosModel = require("../models/cargosModel");

class CargosController {

    async listarView(req, res) {
        let prod = new CargosModel();
        let lista = await prod.listarCargos();
        res.render('cargos/listar', {lista: lista});
    }

    async listarJson(req, res) {
        let prod = new CargosModel();
        let lista = await prod.listarCargos();
        res.send(lista);
    }
}

module.exports = CargosController;