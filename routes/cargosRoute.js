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
    }
}

module.exports = CargosRoute;