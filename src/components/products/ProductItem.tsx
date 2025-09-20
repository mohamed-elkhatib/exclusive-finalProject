import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { IProduct } from "@/interfaces/products.interface";

export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <div>
      <picture className="relative  group overflow-hidden">
        <Link href={`products/${product._id}`}>
          <Image
            className="w-full h-[16.875rem] object-contain bg-gray-100 mb-5"
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            loading="lazy"
          />
        </Link>

        <AddToCartBtn
          productId={product._id}
          className=" w-full absolute bottom-0  translate-y-full   opacity-0 group-hover:translate-y-0   group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        />
      </picture>
      <h3 className="font-medium line-clamp-1">
        <Link href={`products/${product._id}`}>{product.title}</Link>
      </h3>
      <div className="flex items-center gap-x-4 ">
        <span className="font-medium text-[var(--color-mainColor)]">
          {product.price}EGP
        </span>
        <div className="text-sm font-semibold text-gray-500 flex items-center">
          <Star className="text-yellow-400 fill-yellow-400" />
          <span>{product.ratingsAverage}</span>
        </div>
      </div>
    </div>
  );
}
