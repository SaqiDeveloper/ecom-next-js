import { NextResponse } from "next/server";
import { getProductsServer } from "@/services/product.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "3");
    const category = searchParams.get("category") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const products = await getProductsServer({
      page: Number.isNaN(page) ? 1 : page,
      limit: Number.isNaN(limit) ? 3 : limit,
      category,
      search,
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ message: "Unable to load products" }, { status: 500 });
  }
}
