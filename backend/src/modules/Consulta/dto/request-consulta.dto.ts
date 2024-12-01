import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';

export class RequestConsultaDto {
    @IsNotEmpty()
    @IsString()
    nameNutri: string;

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    startTime: string;

    @IsNotEmpty()
    endTime: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    Birthdate: string;

    @IsNotEmpty()
    @IsEnum(BodyType, {
        message: 'biotipoCorporal deve ser um dos seguintes valores: Ectomorfo, Mesomorfo, Endomorfo.',
    })
    biotipoCorporal: BodyType;

    @IsNotEmpty()
    cpf: string;
}
