import { Role, Prisma } from "@prisma/client";
import { z } from "zod";

export const passwordSchema = z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter",
    })
    .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least one uppercase letter",
    })
    .regex(/^(?=.*\d)/, {
        message: "Password must contain at least one number",
    })
    .regex(/^(?=.*[!@#$%^&*()_+=[\]{}|:;"'<,>.?])/, {
        message: "Password must contain at least one special character",
    });

export const registerUserSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: passwordSchema,
    role: z.enum(Role).optional()
});

export const loginUserSchema = z.object({
    email: z.email("Invalid email address"),
    password: passwordSchema
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;
export type CreateUserDTO = Prisma.UserCreateInput & {
    role?: Role | undefined;
}
