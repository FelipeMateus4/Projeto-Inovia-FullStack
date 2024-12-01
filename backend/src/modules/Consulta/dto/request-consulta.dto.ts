import { IsNotEmpty, IsString, IsDate, IsEmail, Matches, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function ValidateDate(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'ValidateDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    if (!(value instanceof Date)) {
                        return false;
                    }
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return value > today; // validando se a data atual é maior do que a do dia atual
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} deve ser maior que ${args.constraints[0] || 'a data de inicio'}`; // resposta personalizada
                },
            },
        });
    };
}

export class RequestConsultaDto {
    @IsNotEmpty()
    @IsString()
    nameNutri: string;

    @IsNotEmpty()
    @IsDate()
    @ValidateDate({ message: 'A data deve ser no futuro.' })
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/'); // separando os atributos da data
        return new Date(`${year}-${month}-${day}`); // retorando a data no formato esperado pelo mongoose
    })
    date: Date;

    @IsNotEmpty()
    @IsDate()
    @ValidateDate({ message: 'A data deve ser no futuro.' })
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        return new Date(`${year}-${month}-${day}`);
    })
    startTime: Date;

    @IsNotEmpty()
    @IsDate()
    @ValidateDate({ message: 'A data deve ser no futuro.' })
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
    @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: 'O numero de telefone deve ser valido' })
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
        message: 'biotipoCorporal deve ser um dos seguintes valores: Ectomorfo, Mesomorfo, Endomorfo',
    })
    biotipoCorporal: BodyType;

    @IsNotEmpty()
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, { message: 'formato de cpf invalido' })
    cpf: string;
}
