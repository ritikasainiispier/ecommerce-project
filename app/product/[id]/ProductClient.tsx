"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

type Variant = {
  id: string;
  sku: string;
  color: string;
  size: string;
  price: number | null;
  stock_quantity: number;
  active: boolean;
};

type ProductImage = {
  image_url: string;
  color: string | null;
  sort_order: number | null;
};

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  variants: Variant[];
  images: ProductImage[];
};

export default function ProductClient({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  const availableVariants = product.variants.filter(
    (variant) =>
      variant.active &&
      variant.stock_quantity > 0
  );

  const colors = Array.from(
    new Set(
      availableVariants.map(
        (variant) => variant.color
      )
    )
  );

  const firstVariant = availableVariants[0];

  const [color, setColor] = useState(
    firstVariant?.color ?? ""
  );

  const initialSizes = availableVariants.filter(
    (variant) =>
      variant.color === firstVariant?.color
  );

  const [size, setSize] = useState(
    initialSizes[0]?.size ?? ""
  );

  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  const [activeImageIndex, setActiveImageIndex] =
    useState(0);

  const sizesForColor = availableVariants.filter(
    (variant) => variant.color === color
  );

  const selectedVariant =
    availableVariants.find(
      (variant) =>
        variant.color === color &&
        variant.size === size
    );

  const selectedPrice =
    selectedVariant?.price !== null &&
    selectedVariant?.price !== undefined
      ? Number(selectedVariant.price)
      : product.basePrice;

  const stock =
    selectedVariant?.stock_quantity ?? 0;

  const colorImages = product.images
    .filter(
      (image) =>
        image.color?.toLowerCase() ===
        color.toLowerCase()
    )
    .sort(
      (a, b) =>
        (a.sort_order ?? 0) -
        (b.sort_order ?? 0)
    );

  const galleryImages =
    colorImages.length > 0
      ? colorImages
      : product.images;

  const selectedImage =
    galleryImages[activeImageIndex]?.image_url ??
    galleryImages[0]?.image_url ??
    null;

  function handleColorChange(
    newColor: string
  ) {
    setColor(newColor);

    setActiveImageIndex(0);

    const firstSizeForColor =
      availableVariants.find(
        (variant) =>
          variant.color === newColor
      );

    setSize(
      firstSizeForColor?.size ?? ""
    );

    setQuantity(1);
  }

  function handleAddToCart() {
    if (!selectedVariant || stock < 1) {
      return;
    }

    addToCart({
      id: selectedVariant.id,
      name: product.name,
      price: selectedPrice,
      color,
      size,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-8 py-16 lg:grid-cols-2">

      {/* LEFT SIDE - PRODUCT IMAGE GALLERY */}
      <div>

        {/* Main Image */}
        <div className="relative h-[650px] w-full bg-gray-100">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={`${product.name} - ${color}`}
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-gray-500">
                Product Image
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {galleryImages.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {galleryImages.map(
              (image, index) => (
                <button
                  key={`${image.image_url}-${index}`}
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(index)
                  }
                  className={`relative h-28 overflow-hidden border ${
                    activeImageIndex === index
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image.image_url}
                    alt={`${product.name} image ${
                      index + 1
                    }`}
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                  />
                </button>
              )
            )}
          </div>
        )}

      </div>

      {/* RIGHT SIDE - PRODUCT DETAILS */}
      <div className="flex flex-col justify-center">

        <p className="mb-3 text-sm uppercase tracking-[3px] text-gray-500">
          {product.category}
        </p>

        <h1 className="mb-4 text-4xl font-bold">
          {product.name}
        </h1>

        <p className="mb-8 text-2xl font-semibold">
          ₹{selectedPrice}
        </p>

        <p className="mb-8 leading-7 text-gray-600">
          {product.description}
        </p>

        {availableVariants.length === 0 ? (
          <div>
            <p className="mb-6 font-semibold text-red-600">
              Currently out of stock
            </p>

            <Link
              href="/shop"
              className="underline"
            >
              Back to Shop
            </Link>
          </div>
        ) : (
          <>

            {/* Color */}
            <div className="mb-6">
              <label className="mb-3 block font-semibold">
                Color
              </label>

              <select
                value={color}
                onChange={(event) =>
                  handleColorChange(
                    event.target.value
                  )
                }
                className="w-full border border-gray-300 p-3"
              >
                {colors.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div className="mb-6">
              <label className="mb-3 block font-semibold">
                Size
              </label>

              <select
                value={size}
                onChange={(event) => {
                  setSize(
                    event.target.value
                  );

                  setQuantity(1);
                }}
                className="w-full border border-gray-300 p-3"
              >
                {sizesForColor.map(
                  (variant) => (
                    <option
                      key={variant.id}
                      value={variant.size}
                    >
                      {variant.size}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Stock */}
            <p className="mb-6 text-sm text-gray-600">
              {stock}{" "}
              {stock === 1
                ? "item"
                : "items"}{" "}
              available
            </p>

            {/* Quantity */}
            <div className="mb-8">
              <label className="mb-3 block font-semibold">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                max={stock}
                value={quantity}
                onChange={(event) => {
                  const value = Number(
                    event.target.value
                  );

                  setQuantity(
                    Math.min(
                      Math.max(
                        1,
                        value
                      ),
                      stock
                    )
                  );
                }}
                className="w-24 border border-gray-300 p-3"
              />
            </div>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black px-8 py-4 font-semibold text-white"
            >
              {added
                ? "Added to Cart ✓"
                : "Add to Cart"}
            </button>

            {/* View Cart */}
            <Link
              href="/cart"
              className="mt-4 block w-full border border-black px-8 py-4 text-center font-semibold"
            >
              View Cart
            </Link>

            {/* Back to Shop */}
            <Link
              href="/shop"
              className="mt-6 text-center underline"
            >
              Back to Shop
            </Link>

          </>
        )}

      </div>

    </section>
  );
}