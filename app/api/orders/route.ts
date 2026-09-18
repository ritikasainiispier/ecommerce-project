import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

type CheckoutItem = {
  id: string;
  quantity: number;
};

type CheckoutBody = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  items: CheckoutItem[];
};

export async function POST(request: Request) {
  try {
    const body: CheckoutBody = await request.json();

    const { customer, items } = body;

    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address1 ||
      !customer?.city ||
      !customer?.state ||
      !customer?.postalCode
    ) {
      return NextResponse.json(
        { error: "Missing customer information." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    // Validate quantities
    for (const item of items) {
      if (
        !item.id ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return NextResponse.json(
          { error: "Invalid cart item." },
          { status: 400 }
        );
      }
    }

    const variantIds = [
      ...new Set(items.map((item) => item.id)),
    ];

    // Fetch trusted variant data from database
    const { data: variants, error: variantsError } =
      await supabaseAdmin
        .from("product_variants")
        .select(`
          id,
          product_id,
          sku,
          color,
          size,
          price,
          stock_quantity,
          active
        `)
        .in("id", variantIds);

    if (variantsError) {
  console.error(variantsError);

  return NextResponse.json(
    {
      error: `Unable to validate products: ${variantsError.message}`,
    },
    { status: 500 }
  );
}

    if (!variants || variants.length !== variantIds.length) {
      return NextResponse.json(
        { error: "One or more products are invalid." },
        { status: 400 }
      );
    }

    const productIds = [
      ...new Set(
        variants.map((variant) => variant.product_id)
      ),
    ];

    // Fetch trusted product prices/names
    const { data: products, error: productsError } =
      await supabaseAdmin
        .from("products")
        .select(`
          id,
          name,
          base_price,
          status
        `)
        .in("id", productIds);

    if (productsError || !products) {
      console.error(productsError);

      return NextResponse.json(
        { error: "Unable to validate product information." },
        { status: 500 }
      );
    }

    const productMap = new Map(
      products.map((product) => [
        product.id,
        product,
      ])
    );

    const variantMap = new Map(
      variants.map((variant) => [
        variant.id,
        variant,
      ])
    );

    let subtotal = 0;

    const validatedItems = [];

    for (const item of items) {
      const variant = variantMap.get(item.id);

      if (!variant || !variant.active) {
        return NextResponse.json(
          { error: "A selected product is unavailable." },
          { status: 400 }
        );
      }

      const product = productMap.get(
        variant.product_id
      );

      if (!product || product.status !== "active") {
        return NextResponse.json(
          { error: "A selected product is unavailable." },
          { status: 400 }
        );
      }

      if (variant.stock_quantity < item.quantity) {
        return NextResponse.json(
          {
            error: `Only ${variant.stock_quantity} units of ${product.name} are available.`,
          },
          { status: 400 }
        );
      }

      const unitPrice =
        variant.price !== null
          ? Number(variant.price)
          : Number(product.base_price);

      const lineTotal =
        unitPrice * item.quantity;

      subtotal += lineTotal;

      validatedItems.push({
        variant_id: variant.id,
        product_name: product.name,
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        quantity: item.quantity,
        unit_price: unitPrice,
        line_total: lineTotal,
      });
    }

    // Server calculates shipping — browser does not control this
    const shippingAmount =
      subtotal >= 2000 ? 0 : 99;

    const discountAmount = 0;

    const totalAmount =
      subtotal +
      shippingAmount -
      discountAmount;

    const orderNumber =
      `ORD-${Date.now()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

    // Create main order
    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .insert({
          order_number: orderNumber,

          customer_name: customer.name,
          email: customer.email,
          phone: customer.phone,

          address_line_1: customer.address1,
          address_line_2:
            customer.address2 || null,

          city: customer.city,
          state: customer.state,
          postal_code: customer.postalCode,
          country: customer.country || "India",

          subtotal,
          shipping_amount: shippingAmount,
          discount_amount: discountAmount,
          total_amount: totalAmount,

          payment_method: "online",
          payment_status: "pending",
          order_status: "pending",
        })
        .select("id, order_number")
        .single();

    if (orderError || !order) {
      console.error(orderError);

      return NextResponse.json(
        { error: "Unable to create order." },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = validatedItems.map(
      (item) => ({
        order_id: order.id,
        ...item,
      })
    );

    const { error: itemError } =
      await supabaseAdmin
        .from("order_items")
        .insert(orderItems);

    if (itemError) {
      console.error(itemError);

      // Clean up incomplete order
      await supabaseAdmin
        .from("orders")
        .delete()
        .eq("id", order.id);

      return NextResponse.json(
        { error: "Unable to create order items." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      subtotal,
      shipping: shippingAmount,
      total: totalAmount,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}