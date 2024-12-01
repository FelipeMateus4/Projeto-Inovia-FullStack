import { IsNotEmpty, IsEmail, IsString, IsDate, IsEnum, Matches } from 'class-validator';
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';

export class CreateConsultaDto {
    @IsNotEmpty()
    @IsString()
    nameNutri: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsDate()
    startTime: Date;

    @IsNotEmpty()
    @IsDate()
    endTime: Date;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: 'Invalid phone number format' })
    phone: string;

    @IsNotEmpty()
    @IsDate()
    Birthdate: Date;

    @IsNotEmpty()
    @IsEnum(BodyType)
    biotipoCorporal: BodyType;

    @IsNotEmpty()
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, { message: 'Invalid CPF format' })
    cpf: string;
}
