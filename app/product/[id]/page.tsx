import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product, error: productError } = await supabase
    .from("products")
    .select(`
  id,
  name,
  description,
  base_price,
  status,
  categories (
    name
  ),
  product_images (
    image_url,
    color,
    sort_order
  )
`)
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (productError || !product) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Product loading error
        </h1>

        <p className="mt-4">
          Product ID: {id}
        </p>

        <p className="mt-4 text-red-600">
          {productError?.message ?? "Product not found"}
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-block underline"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  const { data: variants, error: variantError } = await supabase
    .from("product_variants")
    .select(`
      id,
      sku,
      color,
      size,
      price,
      stock_quantity,
      active
    `)
    .eq("product_id", id)
    .eq("active", true)
    .order("color")
    .order("size");

  if (variantError) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Variant loading error
        </h1>

        <p className="mt-4 text-red-600">
          {variantError.message}
        </p>
      </main>
    );
  }

  const categoryName = Array.isArray(product.categories)
    ? product.categories[0]?.name ?? "Product"
    : (
        product.categories as unknown as
          | { name?: string }
          | null
      )?.name ?? "Product";

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="flex items-center justify-between border-b px-8 py-5">
        <Link href="/" className="text-2xl font-bold">
          MY STORE
        </Link>

        <nav className="flex gap-8">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
        </nav>

        <Link href="/cart">
          Cart
        </Link>
      </header>

      <ProductClient
  product={{
    id: product.id,
    name: product.name,
    category: categoryName,
    description: product.description ?? "",
    basePrice: Number(product.base_price),
    variants: variants ?? [],
    images: Array.isArray(product.product_images)
      ? product.product_images
      : [],
  }}
/>
    </main>
  );
}