export const tiposDeErro = {
    autorizacao: {
        statusCode: 403,
        type: 'Forbidden',
        message: "Você não possui permissão para acessar esse recurso.",
    },

    naoAutenticado: {
        statusCode: 401,
        type: 'Unauthorized',
        message: "Não autorizado. Autenticação necessária.",
    },

    tokenNaoEncontrado: {
        statusCode: 401,
        type: 'Unauthorized',
        message: "Token não encontrado.",
    },

    tokenExpirado: {
        statusCode: 401,
        type: 'Unauthorized',
        message: "Token expirado.",
    },

    tokenInvalido: {
        statusCode: 401,
        type: 'Unauthorized',
        message: "Token inválido.",
    },

    usuarioNaoEncontrado: {
        statusCode: 404,
        type: 'Not Found',
        message: "Usuário não encontrado.",
    },

    petNaoEncontrado: {
        statusCode: 404,
        type: 'Not Found',
        message: "Pet não encontrado.",
    },

    usuarioJaCadastrado: {
        statusCode: 409,
        type: 'Conflict',
        message: "Usuário já cadastrado.",
    },

    loginInvalido: {
        statusCode: 400,
        type: 'Bad Request',
        message: "Usuário ou senha inválida",
    },

    recursoNaoEncontrado: {
        statusCode: 404,
        type: 'Not Found',
        message: "Recurso não encontrado.",
    },

    adocaoNaoEncontrada: {
        statusCode: 404,
        type: 'Not Found',
        message: "Adoção não encontrada.",
    },

    dadosInvalidos: (message) => {
        return {
            statusCode: 400,
            type: 'Bad Request',
            message: message,
        }
    }
}