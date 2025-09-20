import AddToCartBtn from "@/components/products/AddToCartBtn";
import ProductSlider from "@/components/products/ProductSlider";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/products.interface";
import { getProductDetails } from "@/services/products.services";
import { Heart, RefreshCcw, Star, Truck } from "lucide-react";
import React from "react";

export default async function ProductDetails({
  params: { productId },
}: {
  params: { productId: string };
}) {
  console.log(productId);

  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16">
          <div className="lg:col-span-2">
            <ProductSlider images={product.images} />
          </div>
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
            <div className="flex items-center gap-x-4 mb-4">
              <span className="font-medium text-2xl ">{product.price}EGP</span>
              <div className="text-sm font-semibold text-gray-500 flex items-center">
                <Star className="text-yellow-400 fill-yellow-400" />
                <span className="block font-medium text-xl">
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
            <p className="text-sm border-b border-b-gray-400 pb-6 mb-6">
              {product.description}
            </p>
            <div className="flex gap-5  mb-10">
              <AddToCartBtn
                productId={productId}
                className=" grow-1 cursor-pointer"
                variant={"destructive"}
              />
              <Button variant={"outline"} className="cursor-pointer">
                <Heart />
              </Button>
            </div>

            <ul className="border border-black/50 divide-y divide-black/50">
              <li className="p-5 flex gap-4">
                <Truck size={40} />
                <div className="font-medium">
                  <p className="mb-2">Free Delivery</p>
                  <span className="text-xs  border-b border-b-gray-800">
                    Enter Your Postal Code For Delivery Availablity
                  </span>
                </div>
              </li>

              <li className="p-5 flex gap-4">
                <RefreshCcw size={40} />
                <div className="font-medium">
                  <p className="mb-2">Return Delivery</p>
                  <span className="text-xs">
                    Free 30 Days Delivery Returns. Details
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
