import ProductTable from "@/components/product-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
};

export default function ProductPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-md mx-auto py-10">
                <h1 className="text-2xl font-bold">Product List</h1>
                <ProductTable />
            </div>
        </div>
    );
}
