import { adocaoService } from "../services/adocaoService.js";

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
            const result = await adocaoService.buscarAdocaoPorId(id);
            if (!result) {
                return res.status(404).send({ error: 'Adoção não encontrada' });
            }
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao buscar adoção', message: error.message });
        }
    },

    async registrarAdocao(req, res) {
        const { pet_id, usuario_id } = req.body;

        if (!pet_id || !usuario_id) {
            return res.status(400).send({ error: 'Campos pet_id e usuario_id são obrigatórios' });
        }

        try {
            const result = await adocaoService.registrarAdocao(pet_id, usuario_id);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send({ error: 'Erro ao registrar adoção', message: error.message });
        }
    },

    async cancelarAdocao(req, res) {
        const { id } = req.params;
        try {
            const adocaoExistente = await adocaoService.buscarAdocaoPorId(id);
            if (!adocaoExistente) {
                return res.status(404).send({ error: 'Adoção não encontrada' });
            }

            await adocaoService.cancelarAdocao(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ error: 'Erro ao cancelar adoção', message: error.message });
        }
    }
};
