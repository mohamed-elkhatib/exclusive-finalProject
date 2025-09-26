
import {  getDetailsCategories } from "@/services/categories.services";
import Image from "next/image";
import React from "react";

export default async function CategoryDetails({
   params: { catsId },
 }: {
   params: { catsId: string };
}) {

  console.log(catsId);
   const { data: cat }= await getDetailsCategories({id :catsId});
  return <section className="py-20">
        <div className="container mx-auto">
          {cat && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16">
            <div className="lg:col-span-2">
              <Image
                className="w-full h-[37.5rem] object-contain bg-gray-100"
                src={cat.image}
                alt={cat.name}
                width={500}
                height={600}
              />
            </div>
            <div className="lg:col-span-1">
              <h1 className="text-2xl font-semibold mb-4">{cat.name}</h1>
            </div>
          </div>}
        </div>
      </section>
}
