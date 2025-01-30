import { prisma } from "../utils/prisma.js"

export function validarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');    
    return numeroLimpo.length === 11;
}

export function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}   

export function validarTipoUsuario(tipo) {
    return tipo === 'usuario' || tipo === 'administrador';
}

export function validarSenha(senha) {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regexSenha.test(senha);
}


export function validarPetPersonalidade(personalidade) {
    return personalidade === 'calmo' || personalidade === 'brincalhao' || personalidade === 'independente';
}

export function validarPetTamanho(tamanho) {
    return tamanho === 'pequeno' || tamanho ==='medio' || tamanho === 'grande';
}

export function formatarData(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split('-').map(Number);
    const dataFormatada = new Date(ano, mes - 1, dia);
    return dataFormatada.toISOString().split('T')[0];
}

export function validarDataNascimento(data) {
    const formatoValido = /^\d{2}-\d{2}-\d{4}$/.test(data);
    return formatoValido;
}

export async function validarTelefoneUnico(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    const usuarioExistente = await prisma.usuarios.findFirst({ 
        where: { telefone: numeroLimpo } 
    });
    return !usuarioExistente;
}

export async function validarEmailUnico(email) {
    
    const usuarioExistente = await prisma.usuarios.findFirst({ 
        where: {
            email: email.toLowerCase()
        }
    });
    return !usuarioExistente;
}
