"use client";

import { signUpCredentials } from "@/lib/action";
import Link from "next/link";
import { useActionState } from "react";
import { RegisterButton } from "../button";

export default function FormRegister() {
    const [state, formAction] = useActionState(signUpCredentials, null);

    return (
        <form className="space-y-6" action={formAction}>
            {state?.message ? (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                >
                    <span className="font-medium">{state?.message}</span>
                </div>
            ) : null}

            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                    placeholder="John Doe"
                />
                <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm text-red-500 mt-2">
                        {state?.error?.name}
                    </span>
                </div>
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Email
                </label>
                <input
                    placeholder="john@mail.com"
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                />
                <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm text-red-500 mt-2">
                        {state?.error?.email}
                    </span>
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Password
                </label>
                <input
                    placeholder="***"
                    type="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                />
                <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm text-red-500 mt-2">
                        {state?.error?.password}
                    </span>
                </div>
            </div>

            <div>
                <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Confirm Password
                </label>
                <input
                    placeholder="***"
                    type="password"
                    name="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                />
                <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm text-red-500 mt-2">
                        {state?.error?.confirmPassword}
                    </span>
                </div>
            </div>
            <RegisterButton />
            <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                    href={"/login"}
                    className="font-medium pl-1 text-blue-600 hover:text-blue-700"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
}
