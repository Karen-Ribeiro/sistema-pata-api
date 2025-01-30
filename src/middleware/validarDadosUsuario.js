import { tiposDeErro } from "../utils/error.js";
import { validarEmail, validarSenha, validarTelefone, validarTipoUsuario } from "../utils/validarDados.js";

export const validarDadosUsuario = (req, res, next) => {
    const { nome, email, senha, telefone, tipo } = req.body;
    
    if (!nome ||!email ||!senha ||!telefone ||!tipo) {
        return res.status(400).json(tiposDeErro.dadosInvalidos('Preencha os campos obrigatórios.'));
    }

    if (!validarTelefone(telefone)) {
        return res.status(400).json(tiposDeErro.dadosInvalidos('Telefone inválido. Deve conter 11 dígitos.'));
    }

    if (!validarSenha(senha)) {
        return res.status(400).json(tiposDeErro.dadosInvalidos('Senha deve conter uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Com o tamanho total de no minímo 8 caracteres.'));
    }

    if (!validarEmail(email)) {
        return res.status(400).json(tiposDeErro.dadosInvalidos('Formato de email inválido'));
    }

    if (!validarTipoUsuario(tipo)) {
        return res.status(400).json('Tipo de usuário inválido. Deve ser "usuario" ou "administrador"');
    }

    next();

}