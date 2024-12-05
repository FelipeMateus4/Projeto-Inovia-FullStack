import { IsNotEmpty, IsString, IsEmail, IsEnum, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import necessário para os decorators do Swagger
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';

export class RequestConsultaDto {
    @ApiProperty({
        example: 'Dra. Juliana Silva',
        description: 'Nome do nutricionista responsável pela consulta.',
    })
    @IsNotEmpty()
    @IsString()
    nameNutri: string;

    @ApiProperty({
        example: '15/12/2024',
        description: 'Data da consulta no formato DD/MM/YYYY.',
    })
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        example: '15:30',
        description: 'Horário de início da consulta no formato HH:mm.',
    })
    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'O horário de término deve estar no formato HH:mm',
    })
    startTime: string;

    @ApiProperty({
        example: '16:00',
        description: 'Horário de término da consulta no formato HH:mm.',
    })
    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'O horário de término deve estar no formato HH:mm',
    })
    endTime: string;

    @ApiProperty({
        example: 'João da Silva',
        description: 'Nome do paciente que será atendido.',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'joao.silva@gmail.com',
        description: 'E-mail do paciente.',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '(15) 98765-4321',
        description: 'Número de telefone do paciente no formato (XX) XXXXX-XXXX.',
    })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: '01/01/1990',
        description: 'Data de nascimento do paciente no formato DD/MM/YYYY.',
    })
    @IsNotEmpty()
    Birthdate: string;

    @ApiProperty({
        example: 'Ectomorfo',
        description: 'Biotipo corporal do paciente. Valores válidos: Ectomorfo, Mesomorfo, Endomorfo.',
    })
    @IsNotEmpty()
    @IsEnum(BodyType, {
        message: 'biotipoCorporal deve ser um dos seguintes valores: Ectomorfo, Mesomorfo, Endomorfo.',
    })
    biotipoCorporal: BodyType;

    @ApiProperty({
        example: '153.456.789-09',
        description: 'CPF do paciente no formato XXX.XXX.XXX-XX.',
    })
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({ example: 1, description: 'Número de dias recorrentes para a consulta.' })
    @IsOptional()
    recorrenceDays: number;
}
