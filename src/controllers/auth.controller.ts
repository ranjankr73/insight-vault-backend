import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { loginUserSchema, registerUserSchema } from '../dto/auth.dto.js';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response): Promise<void> => {
        const validation = await registerUserSchema.safeParseAsync(req.body);

        if(!validation.success){
            throw new Error(); // TODO: handle error properly
        }

        const user = await this.authService.registerUser(validation.data);

        if(!user){
            throw new Error(); // TODO: handle error properly
        }

        res.status(201).json({ message: 'User registered successfully', user });
    }

    login = async (req: Request, res: Response): Promise<void> => {
        const validation = await loginUserSchema.safeParseAsync(req.body);

        if(!validation.success){
            throw new Error(); // TODO: handle error properly
        }

        const user = await this.authService.loginUser(validation.data);

        if(!user){
            throw new Error(); // TODO: handle error properly
        }

        res.status(200).json({ message: 'User logged in successfully', user });
    }

    getProfile = async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.userId as number;

        const user = await this.authService.getUserProfile(userId);
        
        if(!user){
            throw new Error(); // TODO: handle error properly
        }

        res.status(200).json({ user });
    }
    
}