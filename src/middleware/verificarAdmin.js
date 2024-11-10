import { tiposDeErro } from "../utils/error.js";

export const verificarAdm = (req, res, next) => {
    if (!req.user || req.user.tipo !== "administrador") {
        return res.status(403).json(tiposDeErro.autorizacao)
    }
    next()
};