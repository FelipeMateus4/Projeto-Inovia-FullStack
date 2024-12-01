import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Remove propriedades não definidas no DTO
            forbidNonWhitelisted: true, // Retorna erro se propriedades extras forem enviadas
            transform: true, // Transforma os dados automaticamente no tipo especificado
        })
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
