import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../common/Card";
import { motion } from "framer-motion";
import { trending } from "../../../types/trending";

function HeroSection({ data }: { data: [trending] }) {
  return (
    <motion.main
      className="heroSection mt-section py-4"
      initial={{ opacity: 0, x: "-100wv" }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h2 className=" capitalize text-subHead mb-4 ">Trending</h2>
      <Swiper
        className=""
        lazy={true}
        style={{ paddingBottom: "20px" }}
        breakpoints={{
          769: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        slidesPerView={2}
        grabCursor={true}
        spaceBetween={15}
      >
        {data.map((e: trending) => (
          <SwiperSlide key={`${e.malId}hdfhqohzedsqdbjsq`}>
            <Card data={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.main>
  );
}

export default HeroSection;
