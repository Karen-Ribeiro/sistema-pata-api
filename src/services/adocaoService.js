import { prisma } from "../utils/prisma.js";

export const adocaoService = {

    listarAdocoes: async () => {
        return await prisma.adocoes.findMany({
            include: {
                pets: true,
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });
    },

    buscarAdocaoPorId: async (id) => {
        return await prisma.adocoes.findUnique({
            where: { id: Number(id) },
            include: {
                pets: true,
                usuarios: true
            }
        });
    },

    buscarAdocaoPorUsuario: async (id) => {
        return await prisma.adocoes.findMany({
            where: { usuario_id: Number(id) },
            include: {
                pets: true
            }
        });

    },

    registrarAdocao: async (pet_id, usuario_id) => {
        await prisma.pets.update({
            where: { id: Number(pet_id) },
            data: { adotado: true }
        })
        return await prisma.adocoes.create({
            data: {
                pet_id: Number(pet_id),
                usuario_id: Number(usuario_id)
            },
            include: {
                pets: true,
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        telefone: true
                    }
                }
            }
        });
    }
};
