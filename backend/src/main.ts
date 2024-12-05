import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
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

    // Configuração do Swagger
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Descrição da sua API')
        .setVersion('1.0')
        .addBearerAuth() // Se usar autenticação com JWT
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Obter a conexão Mongoose
    const connection = app.get<Connection>(getConnectionToken());

    // Sincronizar os índices do banco de dados
    await connection.syncIndexes();

    await app.listen(3000);
}
bootstrap();
