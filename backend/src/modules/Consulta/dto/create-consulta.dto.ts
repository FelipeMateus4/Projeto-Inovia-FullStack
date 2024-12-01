import { IsNotEmpty, IsString, IsDate, IsEmail, Matches, IsEnum } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';

export class CreateConsultaDto {
    @IsNotEmpty()
    @IsString()
    nameNutri: string;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/'); // separando os atributos da data
        return new Date(`${year}-${month}-${day}`); // retorando a data no formato esperado pelo mongoose
    })
    date: Date;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        return new Date(`${year}-${month}-${day}`);
    })
    startTime: Date;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        return new Date(`${year}-${month}-${day}`);
    })
    endTime: Date;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: 'Phone number format is invalid' })
    phone: string;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        return new Date(`${year}-${month}-${day}`);
    })
    Birthdate: Date;

    @IsNotEmpty()
    @IsEnum(BodyType, {
        message: 'biotipoCorporal must be one of the following values: Ectomorfo, Mesomorfo, Endomorfo',
    })
    biotipoCorporal: BodyType;

    @IsNotEmpty()
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, { message: 'Invalid CPF format' })
    cpf: string;
}
