import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb://mongodb:27017/ConsultorioNutricionista')],
    exports: [MongooseModule], // Exporta o MongooseModule para ser usado em outros módulos
})
export class DatabaseModule {}
