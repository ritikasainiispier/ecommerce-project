import Link from "next/link";
import { supabase } from "../../lib/supabase";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const { data: products, error } =
    await supabase
      .from("products")
      .select(`
        id,
        name,
        base_price,
        created_at,
        status,
        categories (
          name
        ),
        product_images (
          image_url,
          sort_order
        )
      `)
      .eq("status", "active")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    return (
      <main className="min-h-screen bg-white p-10 text-black">

        <h1 className="text-3xl font-bold">
          Unable to load products
        </h1>

        <p className="mt-4 text-red-600">
          {error.message}
        </p>

      </main>
    );
  }

  const formattedProducts =
    products?.map((product) => {

      const categoryName =
        Array.isArray(product.categories)
          ? product.categories[0]?.name ??
            "Product"
          : (
              product.categories as unknown as
                | { name?: string }
                | null
            )?.name ?? "Product";

      const images =
        Array.isArray(product.product_images)
          ? [...product.product_images].sort(
              (a, b) =>
                (a.sort_order ?? 0) -
                (b.sort_order ?? 0)
            )
          : [];

      return {
        id: product.id,
        name: product.name,
        price: Number(product.base_price),
        category: categoryName,
        imageUrl:
          images[0]?.image_url ?? null,
        createdAt: product.created_at,
      };
    }) ?? [];

  return (
    <main className="min-h-screen bg-white text-black">

      {/* Header */}
      <header className="flex items-center justify-between border-b px-8 py-5">

        <Link
          href="/"
          className="text-2xl font-bold"
        >
          MY STORE
        </Link>

        <nav className="flex gap-8">
          <Link href="/">
            Home
          </Link>

          <Link href="/shop">
            Shop
          </Link>

          <Link href="/cart">
            Cart
          </Link>
        </nav>

      </header>

      {/* Heading */}
      <section className="bg-gray-100 px-8 py-16 text-center">

        <p className="mb-3 text-sm uppercase tracking-[4px]">
          Explore
        </p>

        <h1 className="text-5xl font-bold">
          Shop All
        </h1>

        <p className="mt-4 text-gray-600">
          Clothing, footwear and accessories
          for everyday style.
        </p>

      </section>

      <ShopClient
        products={formattedProducts}
      />

    </main>
  );
}