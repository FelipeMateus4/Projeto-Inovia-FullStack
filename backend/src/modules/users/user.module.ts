import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'auths', schema: {} }]), // Define um esquema vazio para usar a coleção existente
    ],
    controllers: [UserController],
    providers: [],
})
export class UserModule {}
