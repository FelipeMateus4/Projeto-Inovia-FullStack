import { Controller, Post, Body, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { ConsultaService } from '../services/consulta.service';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';

interface CreateConsultaResponse {
    message: string;
    data?: ConsultaDocument;
    datavet?: ConsultaDocument[];
}

@Controller('consultas')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) {}

    @Post()
    async create(@Body() createConsultaDto: CreateConsultaDto): Promise<CreateConsultaResponse> {
        const data = await this.consultaService.createConsulta(createConsultaDto);
        return {
            message: 'Consulta criada com sucesso!',
            data,
        };
    }

    @Get()
    async findAllDatesToNutri(
        @Query('nameNutri') nameNutri: string,
        @Query('date') date: string
    ): Promise<CreateConsultaResponse> {
        // Converter a data para o formato esperado
        const [day, month, year] = date.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);

        const data = await this.consultaService.findAllDatesToNutri(nameNutri, parsedDate);

        if (!data) {
            throw { message: 'dia sem consultas' };
        }

        return {
            message: 'veja todas ocorrencias de consultas',
            datavet: data,
        };
    }

    @Patch(':id')
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
