const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const passwordHash = process.env.JWT_SECRET;

const prisma = new PrismaClient();

const verifyToken = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ message: "Não autorizado." });
	}

	const token = authorization.split(" ")[1];

	try {
		const { id } = jwt.verify(token, passwordHash);

		const userExists = await prisma.user.findUnique({
			where: { id: Number(id) }
		});

		if (!userExists) {
			return res.status(404).json({ message: "Usuário não encontrado." });
		}

		const { senha, ...user } = userExists;

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
