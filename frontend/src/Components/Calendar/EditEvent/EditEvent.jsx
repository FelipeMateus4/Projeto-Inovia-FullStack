export async function UpdateEventOnServer(_id, key_values) {
    try {
        // Remove campos desnecessários
        if ('_id' in key_values) delete key_values._id;
        if ('__v' in key_values) delete key_values.__v;

        // Se recurrencesDays é vazio, ou converta para número ou remova
        if (key_values.recorrenceDays === '') {
            // Caso o backend aceite não enviar esse campo, remova-o:
            delete key_values.recorrenceDays;
        } else if (typeof key_values.recorrenceDays === 'string') {
            // Caso seja string, converta para número
            key_values.recorrenceDays = Number(key_values.recorrenceDays);
        }

        // Ajuste o biotipoCorporal se necessário (caso precise ser exatamente "Ectomorfos"):
        // Exemplo:
        // if (key_values.biotipoCorporal === 'Ectomorfo') {
        //     key_values.biotipoCorporal = 'Ectomorfos';
        // }

        console.log('Dados enviados para o servidor:', JSON.stringify(key_values));

        const response = await fetch(`http://localhost:3000/consultas/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(key_values),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao atualizar eventos:', response.status, errorText);
            throw new Error(`Erro ao atualizar evento: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        console.log('Evento atualizado:', data);

        return data;
    } catch (error) {
        console.error('Erro de rede:', error);
        throw new Error('Erro de rede.');
    }
}
