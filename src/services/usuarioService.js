import { prisma } from "../utils/prisma.js";
import bcrypt from "bcrypt";

export const usuarioService = {
	listarUsuarios: async () => {
		return await prisma.usuarios.findMany({
			select: {
				id: true,
				nome: true,
				email: true,
				telefone: true,
				tipo: true
			}
		});
	},

	buscarUsuarioPorId: async (id) => {
		return await prisma.usuarios.findUnique({
			where: {
				id: Number(id)
			}
		});
	},

	criarUsuario: async (nome, email, senha, telefone, tipo) => {
		const passwordEncripitado = await bcrypt.hash(senha, 10);

		return await prisma.usuarios.create({
			data: {
				nome,
				email: email.toLowerCase(),
				senha: passwordEncripitado,
				telefone,
				tipo
			}
		});
	},

	atualizarUsuario: async (id, dados) => {		
		return await prisma.usuarios.update({
			where: { id: Number(id) },
			data: dados,
			select: {
				id: true,
                nome: true,
                email: true,
				tipo: true,
				telefone: true
			}
		});
	},

	deletarUsuario: async (id) => {
		return await prisma.usuarios.delete({
			where: { id: Number(id) }
		});
	},
};
