import { petService } from "../services/petService.js"

export const petController  = {
    
    async listarPets(req, res) {
        const result = await petService.listaPets()
        res.status(200).send(result);
    },

    async buscarPetPorId(req, res) {
        const { id } = req.params
        const result = await petService.buscarPetPorId(id)
        res.status(200).send(result);
    },

    async adicionarPet(req, res) {
        const { nome, especie, data_nascimento, descricao, tamanho, personalidade } = req.body
        const result = await petService.adicionarPet(nome, especie, data_nascimento, descricao, tamanho, personalidade)
        res.status(201).send(result);
    },

    async atualizarPet(req, res) {
        const { id } = req.params;
        const dados = req.body;
        const result = await petService.atualizarPet(id, dados);
        res.status(200).send(result);
    },

    async deletarPet(req, res) {
        const { id } = req.params;
        const result = await petService.deletarPet(id);
        res.status(204).send(result);
    },

}