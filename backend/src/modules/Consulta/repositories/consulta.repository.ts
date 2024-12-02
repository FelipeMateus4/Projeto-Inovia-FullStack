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

    async updateConsulta(id: string, keys: any): Promise<ConsultaDocument> {
        return await this.consultaModel.findByIdAndUpdate(id, { $set: keys }, { new: true });
    }
    async deleteConsulta(id: string): Promise<ConsultaDocument> {
        return await this.consultaModel.findByIdAndDelete(id);
    }
    async hasTimeConflict(nameNutri: string, startTime: Date, endTime: Date): Promise<boolean> {
        const conflict = await this.consultaModel.findOne({
            nameNutri,
            $or: [
                // Horário de início ou fim dentro de uma consulta existente
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } },
                // Intervalo informado cobre completamente a consulta existente
                { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
            ],
        });
        return !!conflict; // as !! convertem o valor truthy para true e falsy para false
    }

    async findConsultasByDate(date: Date): Promise<ConsultaDocument[]> {
        return await this.consultaModel.find({ date });
    }
}
