import { petService } from "../services/petService.js"
import { tiposDeErro } from "../utils/error.js";

export const petController  = {
    
    async listarPets(req, res) {
        try {
            const result = await petService.listaPets({
                personalidade: req.query.personalidade,
                tamanho: req.query.tamanho,
                especie: req.query.especie,
                adotado: req.query.adotado
            })

            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao listar pets', message: error.message });
        }
    },

    async buscarPetPorId(req, res) {
        const { id } = req.params
        try {
            
            const result = await petService.buscarPetPorId(id)
            if (!result) {
                return res.status(404).send(tiposDeErro.petNaoEncontrado)
            }
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao buscar pet', message: error.message });
        }
    },

    async buscarPetsPorIdade(req, res) {
        const { idade } = req.params
        try {
            const result = await petService.buscarPetsPorIdade(idade)
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao buscar pets por idade', message: error.message });
        }
    },

    async adicionarPet(req, res) {
        const { nome, especie, data_nascimento, descricao, tamanho, personalidade } = req.body
        try {
            const result = await petService.adicionarPet(nome, especie, data_nascimento, descricao, tamanho, personalidade)
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao registrar pet', message: error.message });
        }
    },

    async atualizarPet(req, res) {
        const { id } = req.params;
        try {
            const petExistente = await petService.buscarPetPorId(id);
            if (!petExistente) {
                return res.status(404).status(tiposDeErro.petNaoEncontrado)
            }
            const { nome, especie, data_nascimento, descricao, tamanho, personalidade } = req.body;
            const result = await petService.atualizarPet(id, nome, especie, data_nascimento, descricao, tamanho, personalidade);
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao atualizar pet', message: error.message })
        }
    },

    async deletarPet(req, res) {
        const { id } = req.params;
        try {
            const petExistente = await petService.buscarPetPorId(id);
            if (!petExistente) {
                return res.status(404).send(tiposDeErro.petNaoEncontrado)
            }
            await petService.deletarPet(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: 'Erro ao deletar pet', message: error.message });
        }
    },

}