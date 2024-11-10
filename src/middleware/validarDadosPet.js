import { tiposDeErro } from "../utils/error.js";
import { formatarData, validarDataNascimento, validarPetPersonalidade, validarPetTamanho } from "../utils/validarDados.js";

export const validarDadosPet = (req, res, next) => {
    const { nome, especie, data_nascimento, descricao, tamanho, personalidade } = req.body;

    if (!nome ||!especie ||!data_nascimento ||!descricao ||!tamanho ||!personalidade) {
        return res.status(400).json(tiposDeErro.dadosInvalidos("Todos os campos são obrigatórios"));
    }

    if (!validarDataNascimento(data_nascimento)) {
        return res.status(400).json(tiposDeErro.dadosInvalidos("Data de nascimento inválida. Deve estar no formato 'dd-mm-yyyy'"));
    }

    if (!validarPetTamanho(tamanho)) {
        return res.status(400).json(tiposDeErro.dadosInvalidos('Selecione um tipo de tamanho válido: "pequeno" | "medio" | "grande"'));
    }

    if (!validarPetPersonalidade(personalidade)) {
        return res.status(400).json(tiposDeErro.dadosInvalidos('Selecione as opções de personalidade válidas: "calmo" | "brincalhão" | "independente"'));
    }

    const dataAtual = new Date();

    const dataNascimentoPet = formatarData(data_nascimento);

    if (dataNascimentoPet > dataAtual) {
        return res.status(400).json(tiposDeErro.dadosInvalidos('A data de nascimento do pet não pode passar da data atual.'))
    }

    next();

}