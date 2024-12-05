import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
    @ApiProperty({ description: 'Nome do auth' })
    @Prop()
    name: string;

    @ApiProperty({ description: 'E-mail do auth' })
    @Prop()
    email: string;

    @ApiProperty({ description: 'Senha do auth' })
    @Prop()
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
