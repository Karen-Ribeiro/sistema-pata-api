import { prisma } from "../utils/prisma.js";

export const usuarioService = {

    listarUsuarios: async() => {
        return await prisma.usuario.findMany();
    },

    buscarUsuarioPorId: async(id) => {
        return await prisma.usuario.findUnique({
            where: {
                id
            }
        })
    },

    criarUsuario: async(nome, email, senha, telefone, tipo) => {
        return await prisma.usuarios.create({
            data: {
                nome,
                email,
                senha,
                telefone,
                tipo
            }
        });
    },

    atualizarUsuario: async(id, nome, email, senha, telefone, tipo) => {
        return await prisma.usuario.update({
            where: { id },
            data: { nome, email, senha, telefone, tipo }
        });
    },

    deletarUsuario: async(id) => {
        return await prisma.usuario.delete({
            where: { id }
        });
    }

}