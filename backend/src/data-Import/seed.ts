import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

console.log('Database URL:', process.env.DATABASE_URL);

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('auths', UserSchema);

export async function seedUsers() {
    await mongoose.connect(process.env.DATABASE_URL as string, {});

    try {
        const users = [
            { nome: 'João Silva', email: 'user1@example.com', password: 'password123' },
            { nome: 'Maria Oliveira', email: 'user2@example.com', password: 'securePassword!456' },
        ];

        for (const user of users) {
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                console.log(`Usuário com email ${user.email} já existe, pulando...`);
            } else {
                await User.create(user);
                console.log(`Usuário ${user.email} criado com sucesso.`);
            }
        }

        console.log('Seed finalizado com sucesso.');
    } catch (error) {
        console.error('Erro durante o seeding:', error);
    } finally {
        mongoose.connection.close();
    }
}
