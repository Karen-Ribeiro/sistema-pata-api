import { usuarioService } from "../services/usuarioService.js";
import { tiposDeErro } from "../utils/error.js";
import { prisma } from "../utils/prisma.js";
import { validarTelefoneUnico, validarEmailUnico } from "../utils/validarDados.js";
import bcrypt from "bcrypt";

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
        try {
            if (!(await validarTelefoneUnico(telefone, usuarioService))) {
                return res.status(400).send(tiposDeErro.dadosInvalidos('Telefone já está em uso'));
            }

            if (!(await validarEmailUnico(email, usuarioService))) {
                return res.status(400).send(tiposDeErro.dadosInvalidos('Email já está em uso'));
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
        const passwordEncripitado = await bcrypt.hash(senha, 10);
        try {
            const usuarioExistente = await usuarioService.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return res.status(404).send(tiposDeErro.usuarioNaoEncontrado);
            }

            const usuario = prisma.usuarios.findUnique({
                where: { id: Number(id) },
                select: {
                    email: true,
                    telefone: true
                }
            })
            const dadosAtualizados = {
                nome,
                senha: passwordEncripitado,
                tipo
            }

            if (usuario.email !== email.toLowerCase()) {
                dadosAtualizados.email = email.toLowerCase();
            }

            if (usuario.telefone !== telefone) {
                dadosAtualizados.telefone = telefone;
            }

            if (!dadosAtualizados.telefone && !(await validarTelefoneUnico(telefone, usuarioService))) {
                return res.status(400).send(tiposDeErro.dadosInvalidos('Telefone já está em uso'));
            }

            if (!dadosAtualizados.email && !(await validarEmailUnico(email, usuarioService))) {
                return res.status(400).send(tiposDeErro.dadosInvalidos('Email já está em uso'));
            }

            const result = await usuarioService.atualizarUsuario(id, dadosAtualizados);
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
                return res.status(404).send(tiposDeErro.usuarioNaoEncontrado);
            }

            await usuarioService.deletarUsuario(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: 'Erro ao deletar usuário', message: error.message });
        }
    }
}