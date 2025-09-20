
import { IProduct } from "@/interfaces/products.interface";
import { getProducts } from "@/services/products.services";
import React from "react";
import ProductItem from "@/components/products/ProductItem";

export default async function ProductsPage() {
  const { data: products }: { data: IProduct[] } = await getProducts();
  console.log(products);

  return (
    <section className="py-10">
      <div className="container mx-auto">
        
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product}/>
            ))}
        </div>
       
      </div>
    </section>
  );
}
