import { ConsultaDocument, ConsultaEntity } from 'src/modules/dataBase/entities/consulta.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultaDto } from '../dto/create-consulta.dto';

@Injectable()
export class consultaRepository {
    constructor(@InjectModel(ConsultaEntity.name) private readonly consultaModel: Model<ConsultaDocument>) {}

    async createConsulta(createConsultaDto: CreateConsultaDto): Promise<ConsultaDocument> {
        const createdConsulta = new this.consultaModel(createConsultaDto);
        return await createdConsulta.save();
    }
    async findAllDatesToNutri(name: string, date: Date): Promise<ConsultaDocument[]> {
        return await this.consultaModel.find({ nameNutri: name, date: date });
    }

    async updateConsulta(customId: string, keys: any): Promise<ConsultaDocument> {
        return await this.consultaModel.findOneAndUpdate({ customId }, { $set: keys }, { new: true });
    }
    async deleteConsulta(customId: string): Promise<ConsultaDocument> {
        return await this.consultaModel.findOneAndDelete({ customId });
    }
}
