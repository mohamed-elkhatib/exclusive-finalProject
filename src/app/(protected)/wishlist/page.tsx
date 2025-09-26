"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductItem from "@/components/products/ProductItem";

export default function Wishlist() {
  const { wishlist, loading } = useWishlist();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h6 className="text-xl font-semibold mb-4">
        Wishlist ({wishlist.length})
      </h6>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}
