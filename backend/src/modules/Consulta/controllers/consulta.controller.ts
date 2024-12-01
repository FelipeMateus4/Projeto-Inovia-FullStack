import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
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

        try {
            const data = await this.consultaService.createConsulta(createConsultaDto);
            return {
                message: 'Consulta criada com sucesso!',
                data,
            };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Erro ao criar consulta: ' + error.message,
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
