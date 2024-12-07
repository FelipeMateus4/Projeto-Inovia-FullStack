import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('Auth')
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

    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('jwt').send({ message: 'Logout successful' });
    }
}
