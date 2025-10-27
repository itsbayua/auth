"use server";

import z from "zod";
import { RegisterSchema, SignInSchema } from "./zod";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Sign Up
export const signUpCredentials = async (
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields = RegisterSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    } catch (error) {
        console.log(error);
        return {
            message: "Failed to register user",
        };
    }
    redirect("/login");
};

// Sign In
export const signInCredentials = async (
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields = SignInSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Invalid credentials" };
                default:
                    return { message: "Something went wrong" };
            }
        }
        throw error;
    }
};
