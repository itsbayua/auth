import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="bg-white border-gray-200 border-b">
            <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
                <Link href={"/"}>
                    <h1 className="text-2xl font-extrabold text-black">Logo</h1>
                </Link>
                <div className="flex items-center gap-3">
                    <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        {session && (
                            <>
                                <li>
                                    <Link href={"/product"}>Product</Link>
                                </li>
                                <li>
                                    <Link href={"/dashboard"}>Dashboard</Link>
                                </li>
                                {session.user.role === "admin" ? (
                                    <li>
                                        <Link href={"/user"}>User</Link>
                                    </li>
                                ) : null}
                            </>
                        )}
                    </ul>
                    {session && (
                        <div className="flex gap-3 items-center">
                            <div className="flex flex-col justify-center -gap-y-1">
                                <span className="font-semibold text-gray-600 text-right capitalize">
                                    {session.user.name}
                                </span>
                                <span className="font-xs text-gray-400 text-right capitalize">
                                    {session.user.role}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="text-sm ring-2 bg-gray-100 rounded-full"
                            >
                                <Image
                                    src={session?.user.image || "/avatar.png"}
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                    className="size-8 rounded-full"
                                />
                            </button>
                        </div>
                    )}

                    {session ? (
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/login" });
                            }}
                        >
                            <button
                                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 cursor-pointer"
                                type="submit"
                            >
                                Sign Out
                            </button>
                        </form>
                    ) : (
                        <Link
                            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
                            href={"/login"}
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
