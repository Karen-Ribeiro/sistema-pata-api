export function formatarData(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split('-').map(Number);
    const dataFormatada = new Date(ano, mes - 1, dia);
    return dataFormatada.toISOString().split('T')[0];
}