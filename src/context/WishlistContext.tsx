"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import {toast} from "sonner";
import { IProduct } from "@/interfaces/products.interface";

interface WishlistContextType {
  wishlist: IProduct[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // get wishlist
 const fetchWishlist = useCallback(async () => {
  if (!session?.user?.token) {
    console.warn("No session token found");
    setWishlist([]);
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token: session.user.token,
      },
    });
    const data = await res.json();

    console.log("Wishlist API response:", data); // 👀 Debug

    if (res.ok) {
      setWishlist(data.data);
    } else {
      console.error("Error from wishlist API:", data.message);
      setWishlist([]);
    }
  } catch (error) {
    console.error("Failed to fetch wishlist", error);
    setWishlist([]);
  } finally {
    setLoading(false);
  }
}, [session]);



  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);


// add  to wishlist
  const addToWishlist = async (productId: string) => {
    if (!session) {
      toast.error("You must be logged in to add to wishlist.");
      return;
    }
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session?.user?.token,
          },
          body: JSON.stringify({ productId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchWishlist();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      toast.error("Failed to add to wishlist.");
    }
  };

  // remove from wishlist
  const removeFromWishlist = async (productId: string) => {
    if (!session) {
      toast.error("You must be logged in to remove from wishlist.");
      return;
    }
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            token: session.user.token,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchWishlist();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      toast.error("Failed to remove from wishlist.");
    }
  };

  //to check iswishlisted
  const isWishlisted = (productId: string) => {
    return wishlist.some((product) => product._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};