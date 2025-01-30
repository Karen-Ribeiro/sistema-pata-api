import jwt from "jsonwebtoken";
import { tiposDeErro } from "../utils/error.js";

export const verificarToken = async (req, res, next) => {
	const autenticacao = req.headers.authorization;
	
	if (!autenticacao) {
		return res.status(401).json(tiposDeErro.naoAutenticado);
	}

	const token = autenticacao.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (decoded.exp < Math.floor(Date.now() / 1000)) {
			return res.status(401).json(tiposDeErro.tokenExpirado);
		}

		req.user = decoded

		next();

	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json(tiposDeErro.tokenInvalido);
		}
		if (error.name === "TokenExpiredError") {
			return res.status(401).json(tiposDeErro.tokenExpirado);
		}
		return res.status(400).json({ message: error.message });
	}
};
