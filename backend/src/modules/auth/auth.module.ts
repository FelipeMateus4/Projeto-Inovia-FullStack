import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './repository/auth.repository';
import { Auth, AuthSchema } from '../dataBase/entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    ],
    providers: [AuthService, JwtStrategy, AuthRepository, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
