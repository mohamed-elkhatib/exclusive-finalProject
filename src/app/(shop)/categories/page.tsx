import { Icategory } from "@/interfaces/categories.interface";
import { getCategories } from "@/services/categories.services";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CategoriesPage() {
  const { data: categories }: { data: Icategory[] } = await getCategories();
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
          {categories && categories.map((cat) => (
            <div key={cat._id}>
              
              <Link href={`/shop/categories/${cat._id}`}>
                <Image
                  className=" h-[14.875rem] object-contain bg-gray-100 mb-5"
                  src={cat.image}
                  alt={cat.name}
                  width={270}
                  height={250}
                  loading="lazy"
                />
                <h2 >{cat.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
