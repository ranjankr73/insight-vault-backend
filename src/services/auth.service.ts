import bcrypt from 'bcryptjs';
import type {  CreateUserDTO, LoginUserDTO, RegisterUserDTO } from '../dto/auth.dto.js';
import { UserRepository } from '../repositories/user.repository.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.util.js';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async registerUser(user: RegisterUserDTO) {
        const existingUser = await this.userRepository.findByEmail(user.email);

        if(existingUser){
            throw new Error(); // TODO
        }
        
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        const userData: CreateUserDTO = {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            ...( user.role && { role: user.role })
        };

        const newUser = await this.userRepository.create(userData);
        
        const accessToken = generateAccessToken({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
        });

        const refreshToken = generateRefreshToken({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
        });

        return {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt
            },
            token: {
                accessToken,
                refreshToken
            }
        }
    }

    async loginUser(user: LoginUserDTO) {
        const existingUser = await this.userRepository.findByEmail(user.email);

        if(!existingUser){
            throw new Error(); // TODO
        }

        const isPasswordValid = await bcrypt.compare(user.password, existingUser.password);

        if(!isPasswordValid){
            throw new Error(); // TODO
        }

        const accessToken = generateAccessToken({
            userId: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        });

        const refreshToken = generateRefreshToken({
            userId: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        });

        return {
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                createdAt: existingUser.createdAt
            },
            token: {
                accessToken,
                refreshToken
            }
        }
    }

    async getUserProfile(userId: number) {
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new Error(); // TODO
        }

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        }
    }
}