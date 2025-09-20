"use server";
import { getUserToken } from "@/lib/server-utils";
import {
  addressFormSchema,
  addressFormStateType,
} from "@/schema/address.Schema";

export async function handlePayment(
  formState: addressFormStateType,
  formData: FormData
) : Promise<addressFormStateType>{
  const shippingAddress = {
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod");
  const parsedData = addressFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });
  console.log("cartId", cartId);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
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
        error: {},
        message: data.message || "payment Failed",
        callbackUrl: "/cart",
      };
    }
    return {
      success: true,
      error: {},
      message: data.message || "order placed successfully",
      callbackUrl: paymentMethod === "cash" ? "/allorders" : data.session.url ,
    };
  } catch (error) {
    return {
      success: false,
      error: {},
      message: (error as string) || "something went wrong",
    };
  }
}
