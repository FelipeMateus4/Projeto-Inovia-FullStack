import { IsNotEmpty, IsString, IsDate, IsEmail, Matches, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { BodyType } from 'src/modules/dataBase/entities/consulta.entity';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsTimeRange(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'IsTimeRange',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (value < today) return true; // Verifica se a data é no futuro
                    const dto = args.object as CreateConsultaDto;
                    if (!dto.startTime || !dto.endTime) return true; // Se algum valor estiver ausente, validação não é aplicada.
                    return dto.endTime > dto.startTime; // Valida se `endTime` é maior que `startTime`.
                },
                defaultMessage(): string {
                    return 'O horário de término deve ser maior que o horário de início.';
                },
            },
        });
    };
}

export class CreateConsultaDto {
    @IsNotEmpty()
    @IsString()
    nameNutri: string;

    @IsNotEmpty()
    @IsDate()
    @IsTimeRange({ message: 'A data deve ser no futuro.' })
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/'); // separando os atributos da data
        return new Date(`${year}-${month}-${day}`); // retornando a data no formato esperado pelo Mongoose
    })
    date: Date;

    @IsNotEmpty()
    @Transform(({ value }) => {
        const [hour, minute] = value.split(':');
        const date = new Date('1970-01-01T00:00:00');
        date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0); // Define a hora no horário local
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Ajusta para o fuso horário local
        return date;
    })
    startTime: Date;

    @IsNotEmpty()
    @Transform(({ value }) => {
        const [hour, minute] = value.split(':');
        const date = new Date('1970-01-01T00:00:00');
        date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0); // Define a hora no horário local
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Ajusta para o fuso horário local
        return date;
    })
    endTime: Date;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: 'O número de telefone deve ser válido.' })
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
        message: 'biotipoCorporal deve ser um dos seguintes valores: Ectomorfo, Mesomorfo, Endomorfo.',
    })
    biotipoCorporal: BodyType;

    @IsNotEmpty()
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, { message: 'O formato do CPF é inválido.' })
    cpf: string;
}
