import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/dataBase/database.module';
import { ConsultaModule } from 'src/modules/consulta/consulta.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/shared/exceptions.filter';

@Module({
    imports: [DatabaseModule, ConsultaModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter, // Registro global do filtro
        },
    ],
})
export class AppModule {}
