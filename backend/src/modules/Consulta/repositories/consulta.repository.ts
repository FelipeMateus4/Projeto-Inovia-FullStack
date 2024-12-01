import { ConsultaDocument, ConsultaEntity } from 'src/modules/dataBase/entities/consulta.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultaDto } from '../dto/create-consulta.dto';

@Injectable()
export class consultaRepository {
    constructor(@InjectModel(ConsultaEntity.name) private readonly consultaModel: Model<ConsultaDocument>) {}

    async createConsulta(createConsultaDto: CreateConsultaDto): Promise<ConsultaDocument> {
        try {
            const createdConsulta = new this.consultaModel(createConsultaDto);
            return await createdConsulta.save();
        } catch (error) {
            throw error;
        }
    }
}
