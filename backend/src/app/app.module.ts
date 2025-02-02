import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/dataBase/database.module';
import { ConsultaModule } from 'src/modules/consulta/consulta.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/shared/exceptions.filter';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
    imports: [
        DatabaseModule,
        ConsultaModule,
        ScheduleModule.forRoot(),
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter, // Registro global do filtro
        },
    ],
})
export class AppModule {}
