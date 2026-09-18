"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 2000 ? 0 : 99;
  const total = subtotal + shipping;

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer: form,

          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const responseText = await response.text();

let data: {
  error?: string;
  orderNumber?: string;
} = {};

if (responseText) {
  try {
    data = JSON.parse(responseText);
  } catch {
    console.log("API returned invalid response:", responseText);
  }
}

      if (!response.ok) {
        alert(data.error || "Unable to place order.");
        return;
      }
      if (!data.orderNumber) {
  alert("Order was not created correctly.");
  return;
}

      clearCart();

      router.push(
        `/order-success/${data.orderNumber}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while placing the order."
      );
    }
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-4xl px-8 py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Your cart is empty
          </h1>

          <Link
            href="/shop"
            className="inline-block bg-black px-8 py-4 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-black">

      {/* Header */}
      <header className="border-b bg-white px-8 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            MY STORE
          </Link>

          <Link href="/cart">
            Back to Cart
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-8 py-12 lg:grid-cols-[1fr_420px]">

        {/* Checkout Form */}
        <div>
          <h1 className="mb-8 text-4xl font-bold">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block font-semibold">
                Full Name
              </label>

              <input
                required
                name="name"
                value={form.name}
                onChange={updateField}
                className="w-full border bg-white p-3"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-semibold">
                  Email
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  className="w-full border bg-white p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Phone
                </label>

                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  className="w-full border bg-white p-3"
                />
              </div>

            </div>

            {/* Address 1 */}
            <div>
              <label className="mb-2 block font-semibold">
                Address Line 1
              </label>

              <input
                required
                name="address1"
                value={form.address1}
                onChange={updateField}
                className="w-full border bg-white p-3"
              />
            </div>

            {/* Address 2 */}
            <div>
              <label className="mb-2 block font-semibold">
                Address Line 2
              </label>

              <input
                name="address2"
                value={form.address2}
                onChange={updateField}
                className="w-full border bg-white p-3"
              />
            </div>

            {/* City State PIN */}
            <div className="grid gap-6 md:grid-cols-3">

              <div>
                <label className="mb-2 block font-semibold">
                  City
                </label>

                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={updateField}
                  className="w-full border bg-white p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  State
                </label>

                <input
                  required
                  name="state"
                  value={form.state}
                  onChange={updateField}
                  className="w-full border bg-white p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  PIN Code
                </label>

                <input
                  required
                  name="postalCode"
                  value={form.postalCode}
                  onChange={updateField}
                  className="w-full border bg-white p-3"
                />
              </div>

            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block font-semibold">
                Country
              </label>

              <select
                name="country"
                value={form.country}
                onChange={updateField}
                className="w-full border bg-white p-3"
              >
                <option value="India">
                  India
                </option>
              </select>
            </div>

            {/* Place Order */}
            <button
              type="submit"
              className="w-full bg-black px-8 py-4 font-semibold text-white"
            >
              Place Order
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <aside className="h-fit bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Order Summary
          </h2>

          <div className="space-y-5">

            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex justify-between gap-4 border-b pb-4"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.color} / {item.size}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-6 space-y-3">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </span>
            </div>

            <div className="flex justify-between border-t pt-4 text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

        </aside>

      </section>

    </main>
  );
}