import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('healthcheck')
export class DataController {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    @Get('db-status')
    getDatabaseStatus(): string {
        const state = this.connection.readyState;
        switch (state) {
            case 0:
                return 'Desconectado';
            case 1:
                return 'Conectado';
            case 2:
                return 'Conectando';
            case 3:
                return 'Desconectando';
            default:
                return 'Estado desconhecido';
        }
    }
}
