import { prisma } from "../utils/prisma.js";

export const adocaoService = {
    
  listarAdocoes: async () => {
      return await prisma.adocoes.findMany({
          include: {
              pets: true,
              usuarios: true
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

  registrarAdocao: async (pet_id, usuario_id) => {
      return await prisma.adocoes.create({
          data: {
              pet_id,
              usuario_id,
              data_adocao: new Date(),
          },
          include: {
              pets: true,
              usuarios: true
          }
      });
  },

  cancelarAdocao: async (id) => {
      return await prisma.adocoes.delete({
          where: { id: Number(id) }
      });
  }
};
