import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(@InjectModel('auths') private readonly userModel: Model<any>) {}

    @ApiTags('Users')
    @ApiOperation({ summary: 'Busca todos os usuários' })
    @ApiResponse({ status: 200, description: 'Retorna os dados dos usuarios' })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
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
