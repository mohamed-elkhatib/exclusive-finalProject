"use server";
import { getUserToken } from "@/lib/server-utils";
// Get User Card
export async function getUserCart() {
  const token = await getUserToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error Fetched cart ",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetched cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "some thing went wrong ",
    };
  }
}

// Delete all cart
export async function removeUserCart() {
  const token = await getUserToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {


      return {
        data: null,
        success: false,
        message: data.message || "Error Removed cart ",
      };
    }


    return {
      data: data,
      success: true,
      message: data.message || "Removed cart successfully",
    };


  } catch (error) {

    return {
      data: null,
      success: false,
      message: (error as string) || "some thing went wrong ",
    };
  }
}

// Add To cart
export async function addToCart(productId : string) {
  const token = await getUserToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method: "POST",
      headers: {
        "content-type":"application/json",
        token: token as string,
      },
      body: JSON.stringify({productId})
    });
    const data = await res.json();
    if (!res.ok) {

      return {
        data: null,
        success: false,
        message: data.message || "Adding To Cart Failed",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "Added to Card successfully",
    };

  } catch (error) {

    return {
      data: null,
      success: false,
      message: (error as string) || "some thing went wrong ",
    };
  }
}

// Remove from  cart
export async function removeFromCart(productId : string) {
  const token = await getUserToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${productId}`,{
      method: "DELETE",
      headers: {
        "content-type":"application/json",
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {

      return {
        data: null,
        success: false,
        message: data.message || "Removing From Cart Failed",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "Removed from Card successfully",
    };

  } catch (error) {

    return {
      data: null,
      success: false,
      message: (error as string) || "some thing went wrong ",
    };
  }
}

// update Quntity of  cart
export async function updateQtyProductCart(productId : string,count : number) {
  const token = await getUserToken();
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${productId}`,{
      method: "Put",
      headers: {
        "content-type":"application/json",
        token: token as string,
      },
      body:JSON.stringify({count}),
    });
    const data = await res.json();
    if (!res.ok) {

      return {
        data: null,
        success: false,
        message: data.message || "updating quantity of Cart Failed",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "updating quantity of Card successfully",
    };

  } catch (error) {

    return {
      data: null,
      success: false,
      message: (error as string) || "some thing went wrong ",
    };
  }
}
