import Link from "next/link";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-xl bg-white p-10 text-center">

        <div className="mb-5 text-5xl">
          ✓
        </div>

        <h1 className="mb-4 text-4xl font-bold">
          Order Placed Successfully
        </h1>

        <p className="mb-2 text-gray-600">
          Thank you for your order.
        </p>

        <p className="mb-8">
          Order Number:
          <strong className="ml-2">
            {orderNumber}
          </strong>
        </p>

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