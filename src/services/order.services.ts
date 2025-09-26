"use server";
import { getUserToken } from "@/lib/server-utils";
import {
  addressFormSchema,
  addressFormStateType,
} from "@/schema/address.Schema";

export async function handlePayment(
  formState: addressFormStateType,
  formData: FormData
): Promise<addressFormStateType> {
  const shippingAddress = {
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };

  const cartId = formData.get("cartId") as string;

  const rawPaymentMethod = formData.get("paymentMethod");

  if (rawPaymentMethod !== "cash" && rawPaymentMethod !== "card") {
    return {
      success: false,
      error: {
        cartId: [],
        details: [],
        city: [],
        phone: [],
        paymentMethod: ["Invalid payment method"],
      },
      message: "Invalid payment method",
      callbackUrl: "/cart",
    };
  }

  const paymentMethod = rawPaymentMethod;

  const parsedData = addressFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
      callbackUrl: "/cart",
    };
  }

  const endPoint =
    paymentMethod === "cash"
      ? `api/v1/orders/${cartId}`
      : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/${endPoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {
          cartId: [],
          details: [],
          city: [],
          phone: [],
          paymentMethod: [],
        },
        message: data.message || "Payment failed",
        callbackUrl: "/cart",
        paymentMethod,
      };
    }

    return {
      success: true,
      error: {
        cartId: [],
        details: [],
        city: [],
        phone: [],
        paymentMethod: [],
      },
      message: data.message || "Order placed successfully",
      callbackUrl:
        paymentMethod === "cash" ? "/allorders" : data.session?.url ?? "/cart",
      paymentMethod,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        cartId: [],
        details: [],
        city: [],
        phone: [],
        paymentMethod: [],
      },
      message: "Something went wrong",
      callbackUrl: "/cart",
    };
  }
}
