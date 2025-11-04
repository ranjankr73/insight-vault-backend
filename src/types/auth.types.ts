import { Role } from '@prisma/client';

export interface RegisterUserDTO {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

export interface LoginUserDTO {
    email: string;
    password: string;
}

export interface UpdateProfileDTO {
    name?: string;
    email?: string;
}

export interface ChangePasswordDTO {
    currentPassword: string;
    newPassword: string;
}

export interface TokenPayload {
    userId: number;
    email: string;
    role: Role;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

// Response types
export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        role: Role;
        createdAt: Date;
    };
    token: AuthTokens;
}

export interface ProfileResponse {
    id: number;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}