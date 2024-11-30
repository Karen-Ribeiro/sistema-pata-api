import { prisma } from "../utils/prisma.js"

export const petService = {

    listaPets: async ({ personalidade, tamanho, especie, adotado }) => {
        
        const condicaoDeBusca = {
            ...(personalidade && { personalidade }),
            ...(tamanho && { tamanho }),
            ...(especie && { especie }),
            ...(adotado && { adotado }),
        }

        return await prisma.pets.findMany({
            where: condicaoDeBusca
        });
    },

    buscarPetPorId: async (id) => {
        return await prisma.pets.findUnique({
            where: {
                id: Number(id)
            },
        });
    },

    buscarPetsPorIdade: async (idade) => {
        const dataLimite = new Date();
        dataLimite.setFullYear(dataLimite.getFullYear() - idade);

        return await prisma.pets.findMany({
            where: {
                data_nascimento: {
                    gte: dataLimite
                }
            }
        });
    },

    adicionarPet: async (nome, especie, data_nascimento, descricao, tamanho, personalidade) => {
        const [dia, mes, ano] = data_nascimento.split('-').map(Number);
        return await prisma.pets.create({
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

    atualizarPet: async (id, nome, especie, data_nascimento, descricao, tamanho, personalidade) => {
        const [dia, mes, ano] = data_nascimento.split('-').map(Number);
        return await prisma.pets.update({
            where: {
                id: Number(id),
            },
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

    deletarPet: async (id) => {
        return await prisma.pets.delete({
            where: {
                id: Number(id),
            },
        });
    }

}