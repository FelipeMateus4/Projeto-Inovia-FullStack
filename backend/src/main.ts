import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );

    // Obter a conexão Mongoose
    const connection = app.get<Connection>(getConnectionToken());

    // Sincronizar os índices do banco de dados
    await connection.syncIndexes();

    await app.listen(3000);
}
bootstrap();
