"use client";
import { Icategory } from "@/interfaces/categories.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swipperOption = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-3.5 border-3",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
  modules: [Pagination],
};
export default function CategoriesSlider({
  categories,
}: {
  categories: Icategory[];
}) {
  return (
    <Swiper className="categories-slider mb-16" {...swipperOption}>
      {categories &&
        categories.map((cat) => (
          <SwiperSlide key={cat._id} className="mb-8">
            <Link href={`/categories/${cat._id}`}>
              <Image
                className="w-full h-[16.875rem] object-contain bg-gray-100 mb-4"
                src={cat.image}
                alt={cat.name}
                width={270}
                height={250}
                loading="lazy"
              />
              <h3 className="font-medium">{cat.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
