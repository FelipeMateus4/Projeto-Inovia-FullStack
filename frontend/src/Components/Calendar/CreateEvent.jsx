export async function createEventOnServer(formData) {
    try {
        const {
            nameNutri,
            date,
            startTime,
            endTime,
            name,
            email,
            phone,
            Birthdate,
            biotipoCorporal,
            cpf,
            recorrenceDays,
        } = formData;

        const body = {
            nameNutri,
            date,
            startTime,
            endTime,
            name,
            email,
            phone,
            Birthdate,
            biotipoCorporal,
            cpf,
        };

        if (recorrenceDays.trim() !== '') {
            body.recorrenceDays = Number(recorrenceDays);
        }

        const response = await fetch('http://localhost:3000/consultas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.details || 'Erro desconhecido.';
            throw new Error(errorMessage);
        }

        const newEvent = await response.json();

        // Conversão da data para o formato ISO compatível com o FullCalendar
        const mainDate = new Date(newEvent.date);
        const year = mainDate.getFullYear();
        const month = String(mainDate.getMonth() + 1).padStart(2, '0');
        const day = String(mainDate.getDate()).padStart(2, '0');

        const startDate = new Date(newEvent.startTime);
        const startHours = String(startDate.getHours()).padStart(2, '0');
        const startMinutes = String(startDate.getMinutes()).padStart(2, '0');

        const endDate = new Date(newEvent.endTime);
        const endHours = String(endDate.getHours()).padStart(2, '0');
        const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

        const start = `${year}-${month}-${day}T${startHours}:${startMinutes}`;
        const end = `${year}-${month}-${day}T${endHours}:${endMinutes}`;

        return {
            title: `${newEvent.nameNutri} - ${newEvent.name}`,
            start,
            end,
            extendedProps: { ...newEvent },
        };
    } catch (error) {
        console.error('Erro ao criar a consulta:', error);
        throw error;
    }
}
