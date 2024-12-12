import { ConsultaDocument, ConsultaEntity } from 'src/modules/dataBase/entities/consulta.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import * as mongoose from 'mongoose';

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
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(await this.consultaModel.findByIdAndUpdate(objectId, { $set: keys }, { new: true }));
        console.log('update');
        return await this.consultaModel.findByIdAndUpdate(objectId, { $set: keys }, { new: true });
    }
    async deleteConsulta(id: string): Promise<ConsultaDocument> {
        return await this.consultaModel.findByIdAndDelete(id);
    }
    async hasTimeConflict(
        nameNutri: string,
        startTime: Date,
        endTime: Date,
        date: Date,
        excludeId?: string // Adicione um parâmetro opcional para passar o ID a ser ignorado
    ): Promise<boolean> {
        const conflict = await this.consultaModel.findOne({
            _id: { $ne: excludeId }, // Exclui o documento com o ID fornecido
            nameNutri,
            date,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } },
                { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
            ],
        });
        return !!conflict; // Converte o resultado truthy/falsy para true/false
    }

    async findConsultasByDate(date: Date): Promise<ConsultaDocument[]> {
        return await this.consultaModel.find({ date });
    }

    async findConsultaById(id: string): Promise<ConsultaDocument> {
        console.log('camda de repositorio');
        return await this.consultaModel.findById(id);
    }
    async findAllConsultas(): Promise<ConsultaDocument[]> {
        return await this.consultaModel.find();
    }
}
