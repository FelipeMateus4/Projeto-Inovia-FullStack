import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ConsultaService } from '../services/consulta.service';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { ConsultaDocument } from 'src/modules/dataBase/entities/consulta.entity';

interface CreateConsultaResponse {
    message: string;
    data: ConsultaDocument;
}

@Controller('consultas')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) {}

    @Post()
    async create(@Body() createConsultaDto: CreateConsultaDto): Promise<CreateConsultaResponse> {
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
