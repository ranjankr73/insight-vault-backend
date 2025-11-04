import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '../config/env.config.js';

interface JWTPayload {
    userId: Number;
    email: string;
    role: string;
}

interface CustomJwtPayload extends JwtPayload {
    data: JWTPayload;
}

export function generateAccessToken(payload: JWTPayload): string {
    return jwt.sign({ data: payload, exp: ACCESS_TOKEN_EXPIRES_IN }, ACCESS_TOKEN_SECRET);
}

export function generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign({ data: payload, exp: REFRESH_TOKEN_EXPIRES_IN }, REFRESH_TOKEN_SECRET);
}

export function verifyAccessToken(token: string): JWTPayload {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as CustomJwtPayload;

    return decoded.data;
}