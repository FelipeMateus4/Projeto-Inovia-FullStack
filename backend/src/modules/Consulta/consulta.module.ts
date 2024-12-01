import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultaSchema, ConsultaEntity } from '../dataBase/entities/consulta.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: ConsultaEntity.name, schema: ConsultaSchema }])],
    controllers: [],
    providers: [],
})
export class AppModule {}
