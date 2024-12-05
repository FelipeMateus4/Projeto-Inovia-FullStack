import { AuthDocument, Auth } from 'src/modules/dataBase/entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {
    constructor(@InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>) {}

    async getAuthByEmail(email: string): Promise<AuthDocument> {
        return await this.authModel.findOne({ email: email });
    }
}
