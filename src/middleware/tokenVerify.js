const jwt = require("jsonwebtoken");
import { prisma } from "../utils/prisma.js";

const verifyToken = async (req, res, next) => {
	const { autorizacao } = req.headers;

	if (!autorizacao) {
		return res.status(401).json({ message: "Não autorizado." });
	}

	const token = autorizacao.split(" ")[1];

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);

		const usuarioExiste = await prisma.usuario.findFirst({
			select: { id: Number(id) }
		});

		if (!usuarioExiste) {
			return res.status(404).json({ message: "Usuário não encontrado." });
		}

		const { senha, ...user } = usuarioExiste;

		req.user = user;

		next();
	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Token inválido." });
		}
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Token expirado." });
		}
		return res.status(400).json({ message: error.message });
	}
};

module.exports = { verifyToken };
