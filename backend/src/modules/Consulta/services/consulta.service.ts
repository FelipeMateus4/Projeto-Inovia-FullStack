import { Injectable } from '@nestjs/common';
import { consultaRepository } from '../repositories/consulta.repository';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';

@Injectable()
export class ConsultaService {
    constructor(private readonly consultaRepository: consultaRepository) {}

    async createConsulta(createConsultaDto: CreateConsultaDto): Promise<ConsultaDocument> {
        return await this.consultaRepository.createConsulta(createConsultaDto);
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
