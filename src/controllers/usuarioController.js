import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {

    async listarUsuarios(req, res) {
        const result = await usuarioService.listarUsuarios();
        res.status(200).send(result);
    },

    async buscarUsuarioPorId(req, res) {
        const { id } = req.params;
        const result = await usuarioService.buscarUsuarioPorId(id);
        res.status(200).send(result);
    },

    async criarUsuario(req, res) {
        const { nome, email, senha, telefone, tipo } = req.body;
        const result = await usuarioService.criarUsuario(nome, email, senha, telefone, tipo);
        res.status(201).send(result);
    },

    async atualizarUsuario(req, res) {
        const { id } = req.params;
        const dados = req.body;
        const result = await usuarioService.atualizarUsuario(id, dados);
        res.status(200).send(result);
    },

    async deletarUsuario(req, res) {
        const { id } = req.params;
        const result = await usuarioService.deletarUsuario(id);
        res.status(204).send(result);
    },

}
