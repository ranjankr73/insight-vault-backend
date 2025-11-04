import type { User } from "@prisma/client";
import prisma from "../config/prisma.config.js";
import type { CreateUserDTO } from "../dto/auth.dto.js";

export class UserRepository {
    async create(user : CreateUserDTO): Promise<User> {
        const newUser = await prisma.user.create({ data: user});
        return newUser;
    }
    
    async findById(userId: number): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });

        return user;
    }
    
}