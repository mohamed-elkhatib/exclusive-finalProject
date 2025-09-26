"use client";

import React from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { IProduct } from "@/interfaces/products.interface";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

export default function ProductItem({ product }: { product: IProduct }) {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();

  const wishlisted = isWishlisted(product._id);

  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="relative group border rounded-lg p-3 hover:shadow-md transition-all duration-300">
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10"
        aria-label="Toggle Wishlist"
      >
        <Heart
          className={cn(
            "w-5 h-5 md:w-6 md:h-6 transition-colors",
            wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          )}
        />
      </button>

      <picture className="relative group overflow-hidden">
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
          className="w-full absolute bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        />
      </picture>

      <h3 className="font-medium line-clamp-1">
        <Link href={`products/${product._id}`}>{product.title}</Link>
      </h3>

      <div className="flex items-center gap-x-4">
        <span className="font-medium text-[var(--color-mainColor)]">
          {product.price} EGP
        </span>
        <div className="text-sm font-semibold text-gray-500 flex items-center">
          <Star className="text-yellow-400 fill-yellow-400 mr-1 w-4 h-4" />
          <span>{product.ratingsAverage}</span>
        </div>
      </div>
    </div>
  );
}
