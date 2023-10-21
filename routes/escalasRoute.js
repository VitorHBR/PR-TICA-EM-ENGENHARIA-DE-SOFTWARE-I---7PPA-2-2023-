const express = require('express');
const EscalasController = require('../controllers/escalasController');

class EscalasRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new EscalasController
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/deletarescalas/:id', ctrl.deletarEscalas);
        this.#router.post('/cadastrarescalas', ctrl.cadastrarEscalas);
        this.#router.post('/buscarescalas', ctrl.buscarEscalas);
        this.#router.post('/alterarescalas', ctrl.alterarEscalas);
    }
}

module.exports = EscalasRoute;