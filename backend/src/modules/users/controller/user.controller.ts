import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('users')
export class UserController {
    constructor(@InjectModel('auths') private readonly userModel: Model<any>) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<any> {
        try {
            const users = await this.userModel.find();
            return users;
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error.message}`);
        }
    }
}
