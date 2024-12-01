import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataController } from 'src/modules/dataBase/database.controller';
import { DatabaseModule } from 'src/modules/dataBase/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [AppController, DataController],
    providers: [AppService],
})
export class AppModule {}
