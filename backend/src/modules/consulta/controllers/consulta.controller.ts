import { Controller, Post, Body, Get, Query, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ConsultaService } from '../services/consulta.service';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';
import { RequestConsultaDto } from '../dto/request-consulta.dto';
import { ConsultaResponseDto } from '../dto/consultaResponse.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

interface CreateConsultaResponse {
    message: string;
    data?: ConsultaDocument;
    datavet?: ConsultaDocument[];
}

@ApiTags('Consultas') // Agrupa os endpoints no Swagger
@UseGuards(JwtAuthGuard)
@Controller('consultas')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) {}

    @Post()
    @ApiOperation({ summary: 'Cria uma nova consulta' })
    @ApiResponse({
        status: 201,
        description: 'Consulta criada com sucesso.',
        type: ConsultaResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    @ApiResponse({
        status: 409,
        description: 'Conflitos possíveis:',
        examples: {
            horarioConflito: {
                summary: 'Conflito de horário',
                value: 'Horário já ocupado para este nutricionista.',
            },
            chaveDuplicada: {
                summary: 'Conflito de chave duplicada',
                value: {
                    statusCode: 409,
                    error: 'Conflito de chave duplicada.',
                    details: "O valor 'joao.dias@gmail.com' já está em uso no campo 'email'.",
                    timestamp: '2024-12-02T14:56:00.181Z',
                    path: '/consultas',
                },
            },
        },
    })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
    async create(@Body() requestConsultaDto: RequestConsultaDto): Promise<CreateConsultaResponse> {
        const data = await this.consultaService.createConsulta(requestConsultaDto);
        return {
            message: 'Consulta criada com sucesso!',
            data,
        };
    }

    @Get()
    @ApiOperation({ summary: 'Busca consultas, com ou sem filtros' })
    @ApiQuery({ name: 'nameNutri', type: String, required: false, description: 'Nome do nutricionista (opcional)' })
    @ApiQuery({ name: 'date', type: String, required: false, description: 'Data no formato DD/MM/AAAA (opcional)' })
    async findConsultas(
        @Query('nameNutri') nameNutri?: string,
        @Query('date') date?: string
    ): Promise<ConsultaDocument[] | CreateConsultaResponse> {
        if (nameNutri && date) {
            const [day, month, year] = date.split('/');
            const parsedDate = new Date(`${year}-${month}-${day}`);
            const data = await this.consultaService.findAllDatesToNutri(nameNutri, parsedDate);

            return {
                message: 'Veja todas ocorrências de consultas',
                datavet: data,
            };
        }

        return await this.consultaService.findAllConsultas();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza uma consulta pelo ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID da consulta a ser atualizada' })
    @ApiResponse({
        status: 200,
        description: 'Consulta atualizada com sucesso.',
        type: ConsultaResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Consulta não encontrada.' })
    async updateConsulta(@Param('id') id: string, @Body() keys: any): Promise<CreateConsultaResponse> {
        const data = await this.consultaService.updateConsulta(id, keys);
        console.log(data);

        if (!data) {
            throw { message: 'Consulta não encontrada para ser atualizada!' };
        }
        return {
            message: 'Consulta atualizada com sucesso',
            data,
        };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleta uma consulta pelo ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID da consulta a ser deletada' })
    @ApiResponse({
        status: 200,
        description: 'Consulta deletada com sucesso.',
        schema: {
            example: {
                message: 'Consulta deletada com sucesso',
                data: null,
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Consulta não encontrada.' })
    async deleteConsulta(@Param('id') id: string): Promise<CreateConsultaResponse> {
        const data = await this.consultaService.deleteConsulta(id);

        if (!data) {
            throw { message: 'Consulta não encontrada para ser deletada!' };
        }

        return {
            message: 'Consulta deletada com sucesso',
            data,
        };
    }
}
