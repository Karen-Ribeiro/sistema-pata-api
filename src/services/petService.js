import { filtrarDados } from "../utils/filtrarDados.js";
import { prisma } from "../utils/prisma.js"

export const petService = {

    listaPets: async () => {
        return await prisma.pet.findMany();
    },

    buscarPetPorId: async (id) => {
        return await prisma.pet.findUnique({
            where: {
                id
            },
        });
    },

    adicionarPet: async (nome, especie, data_nascimento, descricao, tamanho, personalidade) => {
        const [dia, mes, ano] = data_nascimento.split('-').map(Number);
        return await prisma.pet.create({
            data: {
                nome,
                especie,
                data_nascimento: new Date(ano, mes, dia),
                descricao,
                tamanho,
                personalidade
            },
        });
    },

    atualizarPet: async (id, dados) => {
        const dadosAtualizados = filtrarDados(dados);

        return await prisma.pet.update({
            where: {
                id,
            },
            data: dadosAtualizados,
        });

    },

    deletarPet: async (id) => {
        return await prisma.pet.delete({
            where: {
                id,
            },
        });
    }

}