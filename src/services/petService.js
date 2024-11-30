import { prisma } from "../utils/prisma.js"

export const petService = {

    async listaPets({ personalidade, tamanho, especie, adotado, ordenar }) {
        const where = {
            ...(personalidade && { personalidade }),
            ...(tamanho && { tamanho }),
            ...(especie && {
                especie: {
                    contains: especie, 
                    mode: 'insensitive', 
                }
            }),
            ...(adotado !== undefined && { adotado }),
        };

        // Definindo a ordenação, se aplicável
        const orderBy = ordenar === 'maisNovo'
            ? { data_nascimento: 'desc' } 
            : ordenar === 'maisVelho'
                ? { data_nascimento: 'asc' } 
                : undefined; 

   
        return await prisma.pets.findMany({
            where,
            orderBy, 
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