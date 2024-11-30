import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:28017/ConsultorioNutricionista')], // mongodb://mongodb:27017/ConsultorioNutricionista para o docker
    exports: [MongooseModule], // Exporta o MongooseModule para ser usado em outros módulos
})
export class DatabaseModule {}
