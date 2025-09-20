export async function getBrands() {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands`,
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

// calling brand details API
export async function getBrandDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
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
