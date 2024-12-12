import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { seedUsers } from './data-Import/seed';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // ativando os cookies
    app.use(cookieParser());
    // Configuração do uso de pipes para validação
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Configuração do Swagger
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Esta API é para o projeto Inovia FullStack, desenvolvido por: Felipe Mateus')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Obter a conexão Mongoose
    const connection = app.get<Connection>(getConnectionToken());

    // Sincronizar os índices do banco de dados
    await connection.syncIndexes();

    await app.listen(3000);
}
seedUsers();
bootstrap();
