import { ConflictException, Injectable, BadRequestException } from '@nestjs/common';
import { consultaRepository } from '../repositories/consulta.repository';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';
import { plainToInstance } from 'class-transformer';
import { RequestConsultaDto } from '../dto/request-consulta.dto';

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
            startTime: requestConsultaDto.startTime,
            endTime: requestConsultaDto.endTime,
        });

        // Verificar conflito no banco de dados
        const hasConflict = await this.consultaRepository.hasTimeConflict(
            createConsultaDto.nameNutri,
            createConsultaDto.startTime,
            createConsultaDto.endTime
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
        return await this.consultaRepository.updateConsulta(id, keys);
    }

    async deleteConsulta(id: string): Promise<ConsultaDocument> {
        return await this.consultaRepository.deleteConsulta(id);
    }
}
