export async function getProducts(limit = 40) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// calling product details API
export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
