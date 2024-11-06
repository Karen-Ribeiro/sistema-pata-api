import { prisma } from "../utils/prisma.js";
import bcrypt from "bcrypt";

export const usuarioService = {
	listarUsuarios: async () => {
		return await prisma.usuarios.findMany();
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
				email,
				senha: passwordEncripitado,
				telefone,
				tipo
			}
		});
	},

	atualizarUsuario: async (id, nome, email, senha, telefone, tipo) => {
		const passwordEncripitado = await bcrypt.hash(senha, 10);

		console.log(id, nome, email, senha, telefone, tipo);
		return await prisma.usuarios.update({
			where: { id: Number(id) },
			data: { nome, email, senha: passwordEncripitado, telefone, tipo }
		});
	},

	deletarUsuario: async (id) => {
		return await prisma.usuarios.delete({
			where: { id: Number(id) }
		});
	}
};
