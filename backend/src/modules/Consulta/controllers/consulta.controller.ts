import { Controller, Post, Body, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ConsultaService } from '../services/consulta.service';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';
import { RequestConsultaDto } from '../dto/request-consulta.dto';
import { ConsultaResponseDto } from '../dto/consultaResponse.dto';

interface CreateConsultaResponse {
    message: string;
    data?: ConsultaDocument;
    datavet?: ConsultaDocument[];
}

@ApiTags('Consultas') // Agrupa os endpoints no Swagger
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
    async create(@Body() requestConsultaDto: RequestConsultaDto): Promise<CreateConsultaResponse> {
        const data = await this.consultaService.createConsulta(requestConsultaDto);
        return {
            message: 'Consulta criada com sucesso!',
            data,
        };
    }

    @Get()
    @ApiOperation({ summary: 'Obtém todas as consultas de um nutricionista em uma data específica' })
    @ApiQuery({ name: 'nameNutri', type: String, description: 'Nome do nutricionista' })
    @ApiQuery({ name: 'date', type: String, description: 'Data no formato DD/MM/AAAA' })
    @ApiResponse({
        status: 200,
        description: 'Lista de consultas recuperada com sucesso.',
        type: ConsultaResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Nenhuma consulta encontrada para o dia.' })
    async findAllDatesToNutri(
        @Query('nameNutri') nameNutri: string,
        @Query('date') date: string
    ): Promise<CreateConsultaResponse> {
        const [day, month, year] = date.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        const data = await this.consultaService.findAllDatesToNutri(nameNutri, new Date(parsedDate));

        if (!data) {
            throw { message: 'Dia sem consultas' };
        }

        return {
            message: 'Veja todas ocorrências de consultas',
            datavet: data,
        };
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
