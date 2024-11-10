import { prisma } from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = {
	async loginUsuario(req, res) {
		const { email, senha } = req.body;

		if (!email || !senha) {
			return res.status(400).json({ message: "É obrigatório email e senha" });
		}

		try {
			const usuario = await prisma.usuarios.findFirst({
				where: { email: email.toLowerCase() }
			});

			if (!usuario) return res.status(404).json({ message: "Usuário não encontrado." });

			const senhaValida = await bcrypt.compare(senha, usuario.senha);

			if (!senhaValida) return res.status(400).json({ message: "Email ou senha não confere." });

			const usuarioTokenDados = {
				id: usuario.id,
				email: usuario.email,
				tipo: usuario.tipo
			};

			const token = jwt.sign(usuarioTokenDados, process.env.JWT_SECRET, { expiresIn: "24h" });

			const { senha: _, ...usuarioDados } = usuario;

			return res.status(200).json({usuario: usuarioDados, token });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Erro interno no servidor" });
		} finally {
			await prisma.$disconnect();
		}
	}
};
