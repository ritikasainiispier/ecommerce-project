"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string | null;
  createdAt: string;
};

export default function ShopClient({
  products,
}: {
  products: Product[];
}) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");

  let visibleProducts =
    category === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() ===
            category.toLowerCase()
        );

  visibleProducts = [...visibleProducts];

  if (sort === "low-high") {
    visibleProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    visibleProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "newest") {
    visibleProducts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }

  const categories = [
    "All",
    "Clothing",
    "Shoes",
    "Accessories",
  ];

  return (
    <>
      {/* Filters */}
      <section className="flex flex-wrap items-center justify-between gap-6 border-b px-8 py-6">

        <div className="flex flex-wrap gap-5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={
                category === item
                  ? "font-bold underline"
                  : ""
              }
            >
              {item}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
          className="border px-4 py-2"
        >
          <option value="recommended">
            Recommended
          </option>

          <option value="low-high">
            Price: Low to High
          </option>

          <option value="high-low">
            Price: High to Low
          </option>

          <option value="newest">
            Newest
          </option>
        </select>

      </section>

      {/* Products */}
      <section className="px-8 py-12">

        {visibleProducts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No products found
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {visibleProducts.map((product) => (
              <div key={product.id}>

                {/* Image */}
                <div className="relative mb-4 h-96 overflow-hidden bg-gray-200">

                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-3"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-gray-500">
                        Product Image
                      </span>
                    </div>
                  )}

                </div>

                <p className="mb-1 text-sm text-gray-500">
                  {product.category}
                </p>

                <h2 className="text-xl font-semibold">
                  {product.name}
                </h2>

                <p className="mt-2 text-lg">
                  ₹{product.price}
                </p>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-4 block w-full bg-black px-6 py-3 text-center text-white"
                >
                  View Product
                </Link>

              </div>
            ))}

          </div>
        )}

      </section>
    </>
  );
}