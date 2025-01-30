import { adocaoService } from "../services/adocaoService.js";
import { tiposDeErro } from "../utils/error.js";
import { prisma } from "../utils/prisma.js";

export const adocaoController = {

    async listarAdocoes(req, res) {
        try {
            const result = await adocaoService.listarAdocoes();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao listar adoções', message: error.message });
        }
    },

    async buscarAdocaoPorId(req, res) {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).send(tiposDeErro.dadosInvalidos('ID da adoção é obrigatório'));
            }

            const result = await adocaoService.buscarAdocaoPorId(id);
            if (!result) {
                return res.status(404).send(tiposDeErro.adocaoNaoEncontrada);
            }
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao buscar adoção', message: error.message });
        }
    },
    
    async buscarAdocaoPorUsuario(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send(tiposDeErro.dadosInvalidos('ID do usuário é obrigatório'));
        }
        try {
            const result = await adocaoService.buscarAdocaoPorUsuario(id);
            if (!result) {
                return res.status(404).send(tiposDeErro.adocaoNaoEncontrada);
            }
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao buscar adoções', message: error.message });
        }
    },

    async registrarAdocao(req, res) {
        const { pet_id, usuario_id } = req.body;
        const { tipo, id } = req.user;
        if (!pet_id || !usuario_id) {
            return res.status(400).send(tiposDeErro.dadosInvalidos('Campos pet_id e usuario_id são obrigatórios'));
        }

        try {
            const pet = await prisma.pets.findUnique({
                where: {
                    id: Number(pet_id),
                    adotado: false
                 }
            })

            if (!pet) {
                return res.status(404).send(tiposDeErro.petNaoEncontrado);
            }

            if (Number(usuario_id) !== Number(id) && tipo !== "administrador") {
                return res.status(403).json(tiposDeErro.autorizacao);
            }

            const usuario = await prisma.usuarios.findUnique({
                where: { id: Number(usuario_id) }
            })

            if (!usuario) {
                return res.status(404).send(tiposDeErro.usuarioNaoEncontrado);
            }

          

            const result = await adocaoService.registrarAdocao(pet_id, usuario_id);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao registrar adoção', message: error.message });
        }
    },
};
