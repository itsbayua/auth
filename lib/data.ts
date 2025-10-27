import { auth } from "@/auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";

// Get all users
export const getUsers = async () => {
    const session = await auth();

    if (!session || !session.user || session.user.role !== "admin") {
        redirect("/dashboard");
    }

    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.log(error);
    }
};

// Get all products
export const getProductByUser = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/dashboard");
    }

    const role = session.user.role;

    if (role === "admin") {
        try {
            const products = await prisma.product.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const products = await prisma.product.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
                where: {
                    userId: session.user.id,
                },
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
};
