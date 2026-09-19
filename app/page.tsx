import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic";

type ProductRow = {
  id: string;
  name: string;
  categories:
    | { name: string }
    | { name: string }[]
    | null;

  product_images:
    | {
        image_url: string;
        sort_order: number | null;
      }[]
    | null;
};

export default async function Home() {
  const { data } = await supabase
    .from("products")
    .select(`
      id,
      name,
      categories (
        name
      ),
      product_images (
        image_url,
        sort_order
      )
    `)
    .eq("status", "active");

  const products = (data ?? []) as unknown as ProductRow[];

  const categoryImages: Record<string, string | null> = {
    Clothing: null,
    Shoes: null,
    Accessories: null,
  };

  products.forEach((product) => {
    const categoryName = Array.isArray(product.categories)
      ? product.categories[0]?.name
      : product.categories?.name;

    if (!categoryName) {
      return;
    }

    const images = Array.isArray(product.product_images)
      ? [...product.product_images].sort(
          (a, b) =>
            (a.sort_order ?? 0) -
            (b.sort_order ?? 0)
        )
      : [];

    const imageUrl = images[0]?.image_url ?? null;

    if (
      imageUrl &&
      categoryName in categoryImages &&
      !categoryImages[categoryName]
    ) {
      categoryImages[categoryName] = imageUrl;
    }
  });

  const categories = [
    {
      name: "Clothing",
      href: "/shop",
      image: categoryImages.Clothing,
    },
    {
      name: "Shoes",
      href: "/shop",
      image: categoryImages.Shoes,
    },
    {
      name: "Accessories",
      href: "/shop",
      image: categoryImages.Accessories,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="bg-black px-4 py-3 text-center text-sm font-semibold text-white">
         This website is made by Ritika
      </div>

      {/* Header */}
      <header className="flex items-center justify-between border-b px-8 py-5">
        <Link href="/" className="text-2xl font-bold">
          MY STORE
        </Link>

        <nav className="flex gap-8">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex min-h-[550px] items-center justify-center bg-gray-100 px-8 text-center">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[4px]">
            New Collection
          </p>

          <h1 className="mb-6 text-6xl font-bold">
            Style That Speaks
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600">
            Discover clothing, footwear and accessories designed
            for everyday style.
          </p>

          <Link
            href="/shop"
            className="inline-block bg-black px-8 py-4 text-white"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-20">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Shop by Category
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          {categories.map((category) => (
            <div
              key={category.name}
              className="overflow-hidden border"
            >

              {/* Category Image */}
              <div className="relative h-80 bg-gray-200">

                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-3"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

              </div>

              {/* Category Details */}
              <div className="p-6">

                <h3 className="mb-2 text-3xl font-bold">
                  {category.name}
                </h3>

                <Link
                  href={category.href}
                  className="underline"
                >
                  Shop Now
                </Link>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-black px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">
          MY STORE
        </h2>

        <p className="mt-2 text-gray-400">
          Fashion. Footwear. Accessories.
        </p>
      </footer>

    </main>
  );
}