import { Icategory } from "@/interfaces/categories.interface";
import React from "react";
import CategoriesSlider from "./CategoriesSlider";
import SectionTitle from "@/components/shared/SectionTitle";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/services/categories.services";

export default async function CategoriesSection() {
  const { data: categories }: { data: Icategory[] } = await getCategories();

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <SectionTitle title={"Categories"} subtitle={"Browse By Category"} />
        <CategoriesSlider categories={categories} />
        <Separator />
      </div>
    </section>
  );
}
