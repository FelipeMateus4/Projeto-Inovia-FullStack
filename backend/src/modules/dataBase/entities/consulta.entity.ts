import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export enum BodyType {
    ECTOMORFO = 'Ectomorfo',
    MESOMORFO = 'Mesomorfo',
    ENDOMORFO = 'Endomorfo',
}

export type ConsultaDocument = HydratedDocument<ConsultaEntity>;

@Schema()
export class ConsultaEntity {
    @ApiProperty({ description: 'Nome do nutricionista responsável pela consulta' })
    @Prop({ required: true })
    nameNutri: string;

    @ApiProperty({ description: 'Data da consulta' })
    @Prop({ type: Date, required: true })
    date: Date;

    @ApiProperty({ description: 'Horário de início da consulta' })
    @Prop({ type: Date, required: true })
    startTime: Date;

    @ApiProperty({ description: 'Horário de término da consulta' })
    @Prop({ type: Date, required: true })
    endTime: Date;

    @ApiProperty({ description: 'Nome do paciente' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: 'E-mail do paciente' })
    @Prop({ required: true, unique: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })
    email: string;

    @ApiProperty({ description: 'Telefone do paciente' })
    @Prop({
        required: true,
        unique: true,
        match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    })
    phone: string;

    @ApiProperty({ description: 'Data de nascimento do paciente' })
    @Prop({ type: Date, required: true })
    Birthdate: Date;

    @ApiProperty({ description: 'Biotipo corporal do paciente', enum: BodyType })
    @Prop({ type: String, enum: BodyType, required: true })
    biotipoCorporal: BodyType;

    @ApiProperty({ description: 'CPF do paciente' })
    @Prop({
        type: String,
        match: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
        required: true,
        unique: true,
    })
    cpf: string;

    @Prop({
        required: false,
    })
    recorrenceDays: number;
}

export const ConsultaSchema = SchemaFactory.createForClass(ConsultaEntity);
