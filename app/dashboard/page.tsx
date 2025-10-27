import { auth } from "@/auth";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="max-w-7xl mx-auto py-6 p-4">
            <h1 className="text-2xl">Dashboard Page</h1>
            <h2 className="text-xl">
                Welcome Back:{" "}
                <span className="font-bold">{session?.user?.name}</span>
            </h2>
        </div>
    );
}
