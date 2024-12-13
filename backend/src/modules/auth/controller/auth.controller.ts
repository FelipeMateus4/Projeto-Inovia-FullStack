import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'Nome de usuário', example: 'user123' })
    username: string;

    @ApiProperty({ description: 'Senha do usuário', example: 'password123' })
    password: string;
}
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('Auth')
    @ApiOperation({ summary: 'Realiza login na aplicação' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
    @ApiBody({ description: 'Credenciais de login', type: LoginDto })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const token = await this.authService.login(req.user);
        res.cookie('jwt', token.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Habilita apenas em HTTPS no ambiente de produção
            maxAge: 3600000, // 1 hora (milissegundos)
        }).send({ message: 'Login successful' });
    }

    @ApiOperation({ summary: 'Realiza logout na aplicação' })
    @ApiResponse({ status: 200, description: 'Logout realizado com sucesso.' })
    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('jwt').send({ message: 'Logout successful' });
    }
}
