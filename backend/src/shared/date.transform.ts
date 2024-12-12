// Funções para transformar datas e horas em strings para objetos Date.
export function transformTime(value: string): Date {
    const [hour, minute] = value.split(':');
    const date = new Date('1970-01-01T00:00:00');
    date.setUTCHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
    return date;
}

export function transformDate(value: string): Date {
    const [day, month, year] = value.split('/');
    const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))); // Gera uma data UTC
    return date;
}
