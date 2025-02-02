const API_URL = import.meta.env.VITE_API_URL;

export async function UpdateEventOnServer(_id, key_values) {
    try {
        if ('_id' in key_values) delete key_values._id;
        if ('__v' in key_values) delete key_values.__v;

        if (key_values.recorrenceDays === '') {
            delete key_values.recorrenceDays;
        } else if (typeof key_values.recorrenceDays === 'string') {
            key_values.recorrenceDays = Number(key_values.recorrenceDays);
        }

        console.log('Dados enviados para o servidor:', JSON.stringify(key_values));

        const response = await fetch(`${API_URL}/consultas/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(key_values),
        });

        if (!response.ok) {
            const errorText = await response.json();
            console.error('Erro ao atualizar a consulta:', response.status, errorText);
            throw new Error(errorText.error.message);
        }

        const data = await response.json();

        console.log('Evento atualizado:', data);

        return data;
    } catch (error) {
        console.error('Erro de rede:', error);
        throw new Error(error);
    }
}

export async function DeleteEventOnServer(_id) {
    try {
        const response = await fetch(`${API_URL}/consultas/${_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao deletar eventos:', response.status, errorText);
            throw new Error(`Erro ao deletar evento: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        console.log('Evento deletado:', data);

        return data;
    } catch (error) {
        console.error('Erro ao deletar a consulta', error);
        throw new Error('Erro ao deletar a consulta');
    }
}

export async function GetUserEventsFromServer() {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao buscar usuários:', response.status, errorText);
            throw new Error(`Erro ao buscar usuários: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erro de rede:', error);
        throw new Error('Erro desconhecido ao buscar usuários.', error);
    }
}
