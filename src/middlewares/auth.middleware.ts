import type { Request, Response, NextFunction } from 'express';
import type { Role } from '@prisma/client';
import type { TokenPayload } from '../types/auth.types.js';
import { verifyAccessToken } from '../utils/tokens.util.js';
import { UnauthorizedError } from '../types/errors.js';

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedError('No token provided');
        }

        const token = authHeader.split(' ')[1]!;

        if(!token){
            throw new UnauthorizedError('No token provided');
        }

        const payload = verifyAccessToken(token) as TokenPayload;
        
        req.user = payload;
        next();
    } catch (error) {
        next(new UnauthorizedError('Invalid token'));
    }
};