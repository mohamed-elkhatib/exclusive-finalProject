"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import {
  removeFromCart,
  removeUserCart,
  updateQtyProductCart,
} from "@/services/cart.services";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();

  async function removeAllCart() {
    const res = await removeUserCart();
    if (res.message === "success") {
      toast.success("cart removed successfully", {
        position: "top-center",
      });
      setCartDetails(null);
    } else {
      toast.error("cart removed failed", {
        position: "top-center",
      });
    }
  }

  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
      });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }

  async function updatequantity(productId: string, count: number) {
    const res = await updateQtyProductCart(productId, count);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
      });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  return (
    <section className="py-20">
      <div className="container mx-auto">
        {cartDetails ? (
          <>
            <section className="mb-20">
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quaintity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails.data.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-5 relative">
                          <Badge
                            onClick={() =>
                              removeProductFromCart(product.product._id)
                            }
                            className="absolute -top-0.5 -start-0.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums cursor-pointer hover:bg-black transition-all duration-100"
                            variant="destructive"
                          >
                            X
                          </Badge>
                          <Image
                            src={product.product.imageCover}
                            alt={product.product.title}
                            width={54}
                            height={54}
                          />
                          <h2>{product.product.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={() =>
                              updatequantity(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            variant={"outline"}
                            size={"sm"}
                          >
                            -
                          </Button>
                          {product.count}
                          <Button
                            onClick={() =>
                              updatequantity(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            variant={"outline"}
                            size={"sm"}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.price * product.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between">
                <Button variant={"outline"}>
                  <Link href={"/products"}>Return To Shop</Link>
                </Button>
                <Button onClick={removeAllCart} variant={"destructive"}>
                  Remove All
                </Button>
              </div>
            </section>
            <section className="flex justify-between">
              <div className="flex items-center gap-4 w-5/12">
                <Input placeholder="coupon code" />
                <Button variant={"destructive"}>Apply Coupon</Button>
              </div>

              <div className="w-5/12 py-8 px-6 border border-gray-950">
                <h3 className="font-bold mb-6 text-xl">Cart total</h3>
                <ul className="divide-y divide-gray-950">
                  <li className="py-6 flex justify-between">
                    <span>Subtotal:</span>{" "}
                    <span>{cartDetails.data.totalCartPrice}</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Shipping:</span> <span>Free</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Total:</span>{" "}
                    <span>{cartDetails.data.totalCartPrice}</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  {" "}
                  <Button variant={"destructive"} asChild>
                    <Link href={"/checkout"}>Proceed To CheckOut</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold">Your Cart Is Empty</h2>
              <Button variant={"destructive"}>
                <Link href={"/products"}>Return To Shop</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
