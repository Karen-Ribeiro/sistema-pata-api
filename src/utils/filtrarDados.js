export function filtrarDados(dados) {
    return Object.fromEntries(
        Object.entries(dados).filter(([_, valor]) => valor !== undefined)
    );
}