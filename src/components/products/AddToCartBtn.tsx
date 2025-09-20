"use client";
import React from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/services/cart.services";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function AddToCartBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const { getCartDetails } = useCart();
  async function addProductToCart(productId: string) {
    const res = await addToCart(productId);
    console.log(res);

    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      getCartDetails();
    } else {
      toast.error(res.message, { position: "top-center" });
    }
  }
  return (
    <Button onClick={() => addProductToCart(productId)} {...props}>
      Add To Cart
    </Button>
  );
}
