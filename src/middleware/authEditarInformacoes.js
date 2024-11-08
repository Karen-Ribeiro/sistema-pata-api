import { tiposDeErro } from "../utils/error.js";

export const authEditarInformacoes = (req, res, next) => {
    const { id } = req.params;
    const { tipo } = req.user; 
    
    if (Number(req.user.id) !== Number(id) && tipo !== 'administrador') {
        return res.status(403).json(tiposDeErro.autorizacao);
    }

    next(); 
};
