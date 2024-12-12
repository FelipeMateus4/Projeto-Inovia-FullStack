import { ConflictException, Injectable, BadRequestException } from '@nestjs/common';
import { consultaRepository } from '../repositories/consulta.repository';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';
import { plainToInstance } from 'class-transformer';
import { RequestConsultaDto } from '../dto/request-consulta.dto';
import { transformDate, transformTime } from 'src/shared/date.transform';

@Injectable()
export class ConsultaService {
    constructor(private readonly consultaRepository: consultaRepository) {}

    async createConsulta(requestConsultaDto: RequestConsultaDto): Promise<ConsultaDocument> {
        console.log(requestConsultaDto);
        if (!requestConsultaDto.cpf) {
            throw new BadRequestException('Dados de consulta incompletos.');
        }

        const createConsultaDto = plainToInstance(CreateConsultaDto, {
            ...requestConsultaDto,
        });

        // Verificar conflito no banco de dados
        const hasConflict = await this.consultaRepository.hasTimeConflict(
            createConsultaDto.nameNutri,
            createConsultaDto.startTime,
            createConsultaDto.endTime,
            createConsultaDto.date
        );
        if (hasConflict) {
            throw new ConflictException('Horário já ocupado para este nutricionista.');
        }

        // Criar a consulta
        return this.consultaRepository.createConsulta(createConsultaDto);
    }

    async findAllDatesToNutri(name: string, date: Date): Promise<ConsultaDocument[]> {
        return await this.consultaRepository.findAllDatesToNutri(name, date);
    }

    async updateConsulta(id: string, keys: any): Promise<ConsultaDocument> {
        console.log('camda de servicoes');
        if (keys.date) {
            keys.date = transformDate(keys.date);
            console.log('Transformed Date:', keys.date);
        }
        if (keys.startTime) {
            keys.startTime = transformTime(keys.startTime);
            console.log('Transformed Start Time:', keys.startTime);
        }

        if (keys.endTime) {
            keys.endTime = transformTime(keys.endTime);
            console.log('Transformed End Time:', keys.endTime);
        }
        if (keys.Birthdate) {
            keys.Birthdate = transformDate(keys.Birthdate);
            console.log('Transformed Birthdate:', keys.Birthdate);
        }

        console.log('camda de servicoes2');
        const consulta = await this.consultaRepository.findConsultaById(id);

        const date = keys.date || consulta.date;
        const startTime = keys.startTime || consulta.startTime;
        const endTime = keys.endTime || consulta.endTime;
        const nameNutri = keys.nameNutri || consulta.nameNutri;

        console.log('Merged Values:', { date, startTime, endTime, nameNutri });

        if (keys.date || keys.startTime || keys.endTime) {
            const hasConflict = await this.consultaRepository.hasTimeConflict(
                nameNutri,
                startTime,
                endTime,
                date,
                consulta._id.toString()
            );
            console.log('Conflict Check:', hasConflict);
            if (hasConflict) {
                throw new ConflictException('Conflito de horário detectado.');
            }
        }

        return await this.consultaRepository.updateConsulta(id, keys);
    }

    async deleteConsulta(id: string): Promise<ConsultaDocument> {
        return await this.consultaRepository.deleteConsulta(id);
    }
    async findAllConsultas(): Promise<ConsultaDocument[]> {
        return await this.consultaRepository.findAllConsultas();
    }
}
