import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { consultaRepository } from '../repositories/consulta.repository';

@Injectable()
export class RecurrenceService {
    private readonly logger = new Logger(RecurrenceService.name);

    constructor(private readonly consultaRepository: consultaRepository) {}

    @Cron(CronExpression.EVERY_30_SECONDS) // Teste a cada 30 segundos, mas o correto seria um tempo maior como CronExpression.EVERY_DAY
    async handleRecurringConsultas(): Promise<void> {
        this.logger.log('Iniciando verificação de consultas recorrentes...');

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Subtrai um dia
        yesterday.setHours(0, 0, 0, 0); // Normaliza para comparar apenas a data

        // Buscar consultas com recorrência configurada e a data de ontem
        const consultas = await this.consultaRepository.findConsultasByDate(yesterday);

        for (const consulta of consultas) {
            // Verificar se a consulta possui recorrência configurada
            if (consulta.recorrenceDays && consulta.recorrenceDays > 0) {
                const nextRecurrenceDate = new Date(consulta.date);
                nextRecurrenceDate.setDate(nextRecurrenceDate.getDate() + consulta.recorrenceDays);

                const conflict = await this.consultaRepository.hasTimeConflict(
                    consulta.nameNutri,
                    consulta.startTime,
                    consulta.endTime,
                    nextRecurrenceDate
                );
                console.log(conflict);

                if (!conflict) {
                    await this.consultaRepository.updateConsulta(consulta._id.toString(), { date: nextRecurrenceDate });

                    this.logger.log(
                        `Consulta recorrente criada para ${consulta.nameNutri} em ${nextRecurrenceDate.toDateString()}.`
                    );
                } else {
                    for (let i = 0; i <= 10; i++) {
                        // tentaremos criar a consulta recorrente por até 10 tempos de recorrencia
                        nextRecurrenceDate.setDate(nextRecurrenceDate.getDate() + consulta.recorrenceDays);

                        const conflict = await this.consultaRepository.hasTimeConflict(
                            consulta.nameNutri,
                            consulta.startTime,
                            consulta.endTime,
                            nextRecurrenceDate
                        );

                        if (!conflict) {
                            await this.consultaRepository.updateConsulta(consulta._id.toString(), {
                                date: nextRecurrenceDate,
                            });

                            this.logger.log(
                                `Consulta recorrente criada para ${consulta.nameNutri} em ${nextRecurrenceDate.toDateString()}.`
                            );

                            break;
                        }
                    }
                }
            }
        }

        this.logger.log('Verificação de consultas recorrentes concluída.');
    }
}
