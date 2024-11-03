import { prisma } from "../utils/prisma.js"

function validarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');    
    return numeroLimpo.length === 11;
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}   

function validarTipoUsuario(tipo) {
    return tipo === 'usuario' || tipo === 'administrador';
}


async function validarTelefoneUnico(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    const usuarioExistente = await prisma.usuarios.findFirst({ 
        where: { telefone: numeroLimpo } 
    });
    return !usuarioExistente;
}

async function validarEmailUnico(email) {
    
    const usuarioExistente = await prisma.usuarios.findFirst({ 
        where: { email: email.toLowerCase() }
    });
    return !usuarioExistente;
}

export { 
    validarTelefone,
    validarEmail,
    validarTipoUsuario,
    validarTelefoneUnico,
    validarEmailUnico
};