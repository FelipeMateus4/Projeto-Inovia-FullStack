import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Tratamento para HttpExceptions
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const responseBody = exception.getResponse();

            response.status(status).json({
                statusCode: status,
                error: responseBody,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
            return;
        }

        // Tratamento para erros de banco de dados (Mongo/Mongoose)
        if (exception.name === 'MongoError' || exception.name === 'MongooseError') {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro no banco de dados.',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
            return;
        }

        // Tratamento genérico para outros erros
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Erro inesperado no servidor.',
            details: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
