import { usuarioService } from "../services/usuarioService.js";
import { tiposDeErro } from "../utils/error.js";
import { prisma } from "../utils/prisma.js";
import { validarTelefoneUnico, validarEmailUnico } from "../utils/validarDados.js";
import bcrypt from "bcrypt";

export const usuarioController = {

    async listarUsuarios(req, res) {
        try {
            const tipo = req.query.tipo;
            const result = await usuarioService.listarUsuarios(tipo);
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
                return res.status(404).send(tiposDeErro.usuarioNaoEncontrado);
            }
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao buscar usuário', message: error.message });
        }
    },

    async criarUsuario(req, res) {
        
        const { nome, email, senha, telefone, tipo, endereco } = req.body;
        try {
            if (!(await validarTelefoneUnico(telefone, usuarioService))) {
                return res.status(400).send(tiposDeErro.dadosInvalidos('Telefone já está em uso'));
            }

            if (!(await validarEmailUnico(email, usuarioService))) {
                return res.status(400).send(tiposDeErro.dadosInvalidos('Email já está em uso'));
            }

            const result = await usuarioService.criarUsuario(nome, email, senha, telefone, tipo, endereco);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao criar usuário' , message: error.message });
        }
    },

    async atualizarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha, telefone, tipo } = req.body;
        const dadosAtualizados = {};

        try {
            // Verifica se o usuário existe
            const usuarioExistente = await usuarioService.buscarUsuarioPorId(id);
            if (!usuarioExistente) {
                return res.status(404).send(tiposDeErro.usuarioNaoEncontrado);
            }

            // Atualiza o nome e o tipo se presentes
            if (nome) dadosAtualizados.nome = nome;
            if (tipo) dadosAtualizados.tipo = tipo;

            // Verifica e atualiza a senha se fornecida
            if (senha) {
                dadosAtualizados.senha = await bcrypt.hash(senha, 10);
            }

            // Busca os dados do usuário para comparação
            const usuario = await prisma.usuarios.findUnique({
                where: { id: Number(id) },
                select: {
                    email: true,
                    telefone: true,
                },
            });

            if (!usuario) {
                return res.status(404).send(tiposDeErro.usuarioNaoEncontrado);
            }

            // Verifica e atualiza o email, se necessário
            if (email && usuario.email !== email.toLowerCase()) {
                const emailUnico = await validarEmailUnico(email, usuarioService);
                if (!emailUnico) {
                    return res.status(400).send(tiposDeErro.dadosInvalidos('Email já está em uso'));
                }
                dadosAtualizados.email = email.toLowerCase();
            }

            // Verifica e atualiza o telefone, se necessário
            if (telefone && usuario.telefone !== telefone) {
                const telefoneUnico = await validarTelefoneUnico(telefone, usuarioService);
                if (!telefoneUnico) {
                    return res.status(400).send(tiposDeErro.dadosInvalidos('Telefone já está em uso'));
                }
                dadosAtualizados.telefone = telefone;
            }

            // Atualiza o usuário com os dados fornecidos
            const result = await usuarioService.atualizarUsuario(id, dadosAtualizados);
            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send({ error: 'Erro ao atualizar usuário', message: error.message });
        }
    },

    async atualizarUsuarioAdmin(req, res) {
        const { id } = req.params;
        const { nome, email, telefone, tipo } = req.body;
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