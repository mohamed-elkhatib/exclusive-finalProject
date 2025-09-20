"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "@/assets/images/slider-image-1.jpeg";
import slide2 from "@/assets/images/slider-image-2.jpeg";
import slide3 from "@/assets/images/slider-image-3.jpeg";
import { Pagination, Autoplay } from "swiper/modules";
import React from "react";
import Image from "next/image";

const swipperOption = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-3.5 border-3",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  modules: [Pagination,Autoplay],
};
const images = [
  {
    path: slide1.src,
    label: "slide1",
  },
  {
    path: slide2.src,
    label: "slide2",
  },
  {
    path: slide3.src,
    label: "slide3",
  },
];
export default function MainSlider() {
  return (
    <section>
      <div className="container mx-auto">
        <Swiper {...swipperOption}>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                className="w-full h-[21.5rem] object-cover"
                src={img.path}
                alt={img.label}
                width={1290}
                height={344}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
