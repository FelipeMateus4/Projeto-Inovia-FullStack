import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/modules/dataBase/database.module';
import { DataController } from 'src/modules/dataBase/database.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [AppController, DataController],
    providers: [AppService],
})
export class AppModule {}
