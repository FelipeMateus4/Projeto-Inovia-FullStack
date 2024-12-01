import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum BodyType {
    ECTOMORFO = 'Ectomorfo',
    MESOMORFO = 'Mesomorfo',
    ENDOMORFO = 'Endomorfo',
}

export type CatDocument = HydratedDocument<Consulta>;

@Schema()
export class Consulta {
    @Prop({ required: true, unique: true })
    nameNutri: string;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: Date, required: true })
    startTime: Date;

    @Prop({ type: Date, required: true })
    endTime: Date;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })
    email: string;

    @Prop({
        required: true,
        unique: true,
        match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    })
    phone: string;

    @Prop({ type: Date, required: true })
    Birthdate: Date;

    @Prop({ type: String, enum: BodyType, required: true })
    biotipoCorporal: BodyType;

    @Prop({
        type: String,
        match: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
        required: true,
        unique: true,
    })
    cpf: string;
}

export const CatSchema = SchemaFactory.createForClass(Consulta);
