import { email, object, string } from "zod";

export const RegisterSchema = object({
    name: string().min(1, { message: "Name is required" }),
    email: email(),
    password: string()
        .min(8, {
            message: "Password must be at least 8 characters",
        })
        .max(32, {
            message: "Password must be at most 32 characters",
        }),
    confirmPassword: string()
        .min(8, {
            message: "Password must be at least 8 characters",
        })
        .max(32, {
            message: "Password must be at most 32 characters",
        }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const SignInSchema = object({
    email: email(),
    password: string()
        .min(8, {
            message: "Password must be at least 8 characters",
        })
        .max(32, {
            message: "Password must be at most 32 characters",
        }),
});
