const express = require('express');
const DepartamentosController = require('../controllers/departamentosController');

class DepartamentosRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new DepartamentosController
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/deletardepartamentos/:id', ctrl.deletarDepartamentos);
        this.#router.post('/cadastrardepartamentos', ctrl.cadastrarDepartamentos);
        this.#router.post('/buscardepartamentos', ctrl.buscarDepartamentos);
        this.#router.post('/alterardepartamentos', ctrl.alterarDepartamentos);
    }
}

module.exports = DepartamentosRoute;