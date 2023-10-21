const express = require('express');
const CargosController = require('../controllers/cargosController');

class CargosRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new CargosController
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/deletarcargos/:id', ctrl.deletarCargos);
        this.#router.post('/cadastrarcargos', ctrl.cadastrarCargos);
        this.#router.post('/buscarcargos', ctrl.buscarCargos);
        this.#router.post('/alterarcargos', ctrl.alterarCargos);
    }
}

module.exports = CargosRoute;