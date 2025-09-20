"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

export default function ProductSlider({images}:{images:string[]}) {
    const swipperOption = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-3.5 border-3",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },
  modules: [Pagination],
};
  return (
     <Swiper {...swipperOption}>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                className="w-full h-[37.5rem] object-contain bg-gray-100"
                src={img}
                alt={`${img}-${idx}`}
                width={500}
                height={600}
              />
            </SwiperSlide>
          ))}
        </Swiper>
  )
}
