"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="flex items-center justify-between border-b px-8 py-5">
        <Link href="/" className="text-2xl font-bold">
          MY STORE
        </Link>

        <Link href="/shop">
          Continue Shopping
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-16">
        <h1 className="mb-10 text-4xl font-bold">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Your cart is empty
            </h2>

            <Link
              href="/shop"
              className="inline-block bg-black px-8 py-4 text-white"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}-${index}`}
                  className="grid gap-6 border-b pb-6 md:grid-cols-[120px_1fr_auto]"
                >
                  <div className="flex h-32 items-center justify-center bg-gray-200 text-sm text-gray-500">
                    Image
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      Color: {item.color}
                    </p>

                    <p className="text-gray-600">
                      Size: {item.size}
                    </p>

                    <p className="mt-2 font-semibold">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() => removeFromCart(index)}
                      className="mt-3 text-sm underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(
                          index,
                          Number(event.target.value)
                        )
                      }
                      className="w-20 border p-2"
                    />

                    <p className="mt-5 font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 ml-auto max-w-md border-t pt-8">
              <div className="mb-6 flex justify-between text-xl font-bold">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <p className="mb-6 text-sm text-gray-500">
                Shipping and taxes will be calculated at checkout.
              </p>

              <Link
  href="/checkout"
  className="block w-full bg-black px-8 py-4 text-center font-semibold text-white"
>
  Proceed to Checkout
</Link>

              <button
                onClick={clearCart}
                className="mt-4 w-full border border-black px-8 py-4"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}