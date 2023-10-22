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

    async buscarFuncionarios(req, res) {
        let funcionario = new FuncionariosModel();
        funcionario.funcionarioNome= req.body.busca;
        let lista = await funcionario.buscarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
    }


    async deletarFuncionarios(req, res) {
        console.log(req.params.id);
        //req.params.cpf
        let funcionario = new FuncionariosModel();
        let retorno = await funcionario.deletarFuncionarios(req.params.id);
        let lista = await funcionario.listarFuncionarios();
        res.render('funcionarios/listar', {lista: lista});
        
    }
}

module.exports = FuncionariosController;