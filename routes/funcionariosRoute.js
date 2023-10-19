const express = require('express');
const FuncionariosController = require('../controllers/funcionariosController');

class FuncionariosRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new FuncionariosController
        this.#router.get('/', ctrl.listarView);
    }
}

module.exports = FuncionariosRoute;