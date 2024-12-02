export function transformTime(value: string): Date {
    const [hour, minute] = value.split(':');
    const date = new Date('1970-01-01T00:00:00'); // Data base
    date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0); // Define horas e minutos
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Ajusta o fuso horário
    return date;
}

export function transformDate(value: string): Date {
    const [day, month, year] = value.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    date.setHours(0, 0, 0, 0);
    return date;
}
