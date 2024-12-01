import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultaSchema, ConsultaEntity } from '../dataBase/entities/consulta.entity';
import { ConsultaController } from './controllers/consulta.controller';
import { ConsultaService } from './services/consulta.service';
import { consultaRepository } from './repositories/consulta.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: ConsultaEntity.name, schema: ConsultaSchema }])],
    controllers: [ConsultaController],
    providers: [ConsultaService, consultaRepository],
})
export class ConsultaModule {}
