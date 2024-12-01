import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataController } from 'src/modules/dataBase/database.controller';
import { DatabaseModule } from 'src/modules/dataBase/database.module';
import { ConsultaModule } from 'src/modules/consulta/consulta.module';

@Module({
    imports: [DatabaseModule, ConsultaModule],
    controllers: [AppController, DataController],
    providers: [AppService],
})
export class AppModule {}
