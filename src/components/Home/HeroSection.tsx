import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../common/Card";
import { motion } from "framer-motion";
import { trending } from "../../../types/trending";
import { Navigation } from "swiper";
import "swiper/css/navigation";

function HeroSection({ data }: { data: [trending] }) {
  return (
    <motion.main
      className="heroSection pt-[158px] pb-4"
      initial={{ opacity: 0, x: "-100wv" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className=" text-subHead mb-4 uppercase">Trending</h2>
      <Swiper
        className="Swiper-Container"
        modules={[Navigation]}
        style={{ paddingBottom: "50px", paddingTop: "50px" }}
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
        // navigation={true}
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
