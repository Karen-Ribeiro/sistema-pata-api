import { usuarioService } from "../services/usuarioService.js";
import { validarTelefone, validarEmail, validarTipoUsuario, validarTelefoneUnico, validarEmailUnico } from "../utils/validarDados.js"; // Supondo que as validações foram movidas para uma pasta utils

export const usuarioController = {

    async listarUsuarios(req, res) {
        try {
            const result = await usuarioService.listarUsuarios();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao listar usuários', message: error.message });
        }
    },

    async buscarUsuarioPorId(req, res) {
        const { id } = req.params;
        try {
            const result = await usuarioService.buscarUsuarioPorId(id);
            if (!result) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao buscar usuário', message: error.message });
        }
    },

    async criarUsuario(req, res) {
        
        const { nome, email, senha, telefone, tipo } = req.body;

        if (!nome || !email || !senha || !telefone || !tipo) {
            return res.status(400).send({ error: 'Todos os campos são obrigatórios' });
        }

        if (!validarTelefone(telefone)) {
            return res.status(400).send({ error: 'Telefone inválido. Deve conter 11 dígitos' });
        }

        if (!validarEmail(email)) {
            return res.status(400).send({ error: 'Email inválido' });
        }

        if (!validarTipoUsuario(tipo)) {
            return res.status(400).send({ error: 'Tipo de usuário inválido. Deve ser "usuario" ou "administrador"' });
        }

        try {
            if (!(await validarTelefoneUnico(telefone, usuarioService))) {
                return res.status(400).send({ error: 'Telefone já está em uso' });
            }

            if (!(await validarEmailUnico(email, usuarioService))) {
                return res.status(400).send({ error: 'Email já está em uso' });
            }

            const result = await usuarioService.criarUsuario(nome, email, senha, telefone, tipo);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao criar usuário' , message: error.message });
        }
    },

    async atualizarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha, telefone, tipo } = req.body;

        try {
            const usuarioExistente = await usuarioService.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            if (telefone && !validarTelefone(telefone)) {
                return res.status(400).send({ error: 'Telefone inválido. Deve conter 11 dígitos' });
            }

            if (email && !validarEmail(email)) {
                return res.status(400).send({ error: 'Email inválido' });
            }

            if (telefone && !(await validarTelefoneUnico(telefone, usuarioService))) {
                return res.status(400).send({ error: 'Telefone já está em uso' });
            }

            if (email && !(await validarEmailUnico(email, usuarioService))) {
                return res.status(400).send({ error: 'Email já está em uso' });
            }

            const result = await usuarioService.atualizarUsuario(id, nome, email, senha, telefone, tipo);
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao atualizar usuário', message: error.message });
        }
    },

    async deletarUsuario(req, res) {
        const { id } = req.params;
        try {
            const usuarioExistente = await usuarioService.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }

            await usuarioService.deletarUsuario(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: 'Erro ao deletar usuário', message: error.message });
        }
    }
}