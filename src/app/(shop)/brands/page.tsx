import { IBrand } from "@/interfaces/brand.interface";
import { getBrands } from "@/services/brands.services";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function BrandsPage() {
  const { data: brands }: { data: IBrand[] } = await getBrands();
  console.log(brands);
  return (
    <section className="py-20 ">
      <div className="container mx-auto">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
          {brands && brands.map((brand) => (
            <div key={brand._id}>
              
              <Link href={`brands/${brand._id}`}>
                <Image
                  className=" h-[14.875rem] object-contain bg-gray-100 mb-5"
                  src={brand.image}
                  alt={brand.name}
                  width={270}
                  height={250}
                  loading="lazy"
                />
                <h2 >{brand.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
