import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:28017/ConsultorioNutricionista', {
            autoIndex: true,
            autoCreate: true,
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
