import { getBrandDetails } from "@/services/brands.services";
import React from "react";
import { IBrand } from "@/interfaces/brand.interface";
import Image from "next/image";

export default async function BrandDetails({
  params: { brandId },
}: {
  params: { brandId: string };
}) {
  console.log(brandId);
  const { data: brand }: { data: IBrand } = await getBrandDetails(brandId);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16">
          <div className="lg:col-span-2">
            <Image
              className="w-full h-[37.5rem] object-contain bg-gray-100"
              src={brand.image}
              alt={brand.name}
              width={500}
              height={600}
            />
          </div>
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-semibold mb-4">{brand.name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
