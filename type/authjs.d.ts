import { JWT } from "next-auth/jwt"; // eslint-disable-line
import { DefaultSession } from "next-auth";
import { AdapterUser } from "@auth/core/adapters"; // eslint-disable-line

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession["user"];
    }

    interface User {
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string;
        role: string;
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser {
        role: string;
    }
}
