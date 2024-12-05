import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('DATABASE_URL'),
                autoIndex: true,
                autoCreate: true,
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
