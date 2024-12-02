import { IsNotEmpty, IsString, IsDate, IsEmail, Matches, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';

export class CreateConsultaDto {
    @ApiProperty({ description: 'Nome do nutricionista responsável pela consulta' })
    @IsNotEmpty()
    @IsString()
    nameNutri: string;

    @ApiProperty({ description: 'Data da consulta no formato DD/MM/AAAA' })
    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        const date = new Date(`${year}-${month}-${day}`);
        date.setHours(0, 0, 0, 0);
        return date;
    })
    date: Date;

    @ApiProperty({ description: 'Horário de início da consulta no formato HH:mm' })
    @IsNotEmpty()
    @Transform(({ value }) => {
        const [hour, minute] = value.split(':');
        const date = new Date('1970-01-01T00:00:00');
        date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date;
    })
    startTime: Date;

    @ApiProperty({ description: 'Horário de término da consulta no formato HH:mm' })
    @IsNotEmpty()
    @Transform(({ value }) => {
        const [hour, minute] = value.split(':');
        const date = new Date('1970-01-01T00:00:00');
        date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date;
    })
    endTime: Date;

    @ApiProperty({ description: 'Nome do paciente' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'E-mail do paciente' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Telefone do paciente no formato (XX) XXXXX-XXXX' })
    @IsNotEmpty()
    @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: 'O número de telefone deve ser válido.' })
    phone: string;

    @ApiProperty({ description: 'Data de nascimento do paciente no formato DD/MM/AAAA' })
    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        return new Date(`${year}-${month}-${day}`);
    })
    Birthdate: Date;

    @ApiProperty({ description: 'Biotipo corporal do paciente', enum: BodyType })
    @IsNotEmpty()
    @IsEnum(BodyType, {
        message: 'biotipoCorporal deve ser um dos seguintes valores: Ectomorfo, Mesomorfo, Endomorfo.',
    })
    biotipoCorporal: BodyType;

    @ApiProperty({ description: 'CPF do paciente no formato XXX.XXX.XXX-XX ou somente números' })
    @IsNotEmpty()
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, { message: 'O formato do CPF é inválido.' })
    cpf: string;

    @ApiProperty({ example: 1, description: 'Número de dias recorrentes para a consulta.' })
    @IsOptional()
    recorrenceDays: number;
}
