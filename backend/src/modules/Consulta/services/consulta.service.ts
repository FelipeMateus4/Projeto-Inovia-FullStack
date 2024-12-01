import { Injectable } from '@nestjs/common';
import { consultaRepository } from '../repositories/consulta.repository';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';

@Injectable()
export class ConsultaService {
    constructor(private readonly consultaRepository: consultaRepository) {}

    async createConsulta(createConsultaDto: CreateConsultaDto): Promise<ConsultaDocument> {
        try {
            return await this.consultaRepository.createConsulta(createConsultaDto);
        } catch (error) {
            throw error;
        }
    }
}
