import { Controller, Post, Body, Get, Query, Patch } from '@nestjs/common';
import { ConsultaService } from '../services/consulta.service';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';
import { RequestConsultaDto } from '../dto/request-consulta.dto';

interface CreateConsultaResponse {
    message: string;
    data: ConsultaDocument;
}

@Controller('consultas')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) {}

    @Post()
    async create(@Body() requestConsultaDto: RequestConsultaDto): Promise<CreateConsultaResponse> {
        const dataHora = requestConsultaDto.date;
        const dataFormatada = dataHora.toISOString().replace(/[-:.TZ]/g, ''); // Removendo os caracteres indesejados
        const uniqueNumber = Date.now(); // Obtém o timestamp atual
        const idConsulta = `CONSULTA-${dataFormatada}-${uniqueNumber}`;
        const createConsultaDto: CreateConsultaDto = {
            customId: idConsulta,
            ...requestConsultaDto,
        };
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
    ): Promise<ConsultaDocument[]> {
        // Converter a data para o formato esperado
        const [day, month, year] = date.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);

        return this.consultaService.findAllDatesToNutri(nameNutri, parsedDate);
    }

    @Patch()
    async updateConsulta(@Query('customId') customId: string, @Body() keys: any): Promise<ConsultaDocument> {
        return this.consultaService.updateConsulta(customId, keys);
    }
}
