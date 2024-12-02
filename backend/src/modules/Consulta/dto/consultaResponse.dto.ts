import { ApiProperty } from '@nestjs/swagger';
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';

export class ConsultaResponseDto {
    @ApiProperty({ example: '637e72a31fbd4b32dcb2dc12' })
    id: string;

    @ApiProperty({ example: 'Dra. Juliana Silva' })
    nameNutri: string;

    @ApiProperty({ example: '2024-12-15' })
    date: string;

    @ApiProperty({ example: '15:30' })
    startTime: string;

    @ApiProperty({ example: '16:00' })
    endTime: string;

    @ApiProperty({ example: 'João da Silva' })
    name: string;

    @ApiProperty({ example: 'joao.silva@gmail.com' })
    email: string;

    @ApiProperty({ example: '(15) 98765-4321' })
    phone: string;

    @ApiProperty({ example: '1990-01-01' })
    Birthdate: string;

    @ApiProperty({ example: 'Ectomorfo' })
    biotipoCorporal: BodyType;

    @ApiProperty({ example: '123.456.789-00' })
    cpf: string;
}
