import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/navigation";
import { anime } from "../../../../types/anime";
import Card from "../../../common/Card";
import FlexIt from "../../../common/FlexIt";
import {
  CheckMarkIcon,
  PlayIcon,
  StarIconMini,
  TvIcon,
} from "../../../common/Icons";
import PastYearCard from "./PastYearCard";
import { CoverCardPastYear } from "./CoverCardPastYear";
import { motion } from "framer-motion";

function PastYear({ data }: { data: [anime] }) {
  //here we got exactly 3 anime objects
  const [anime1]: anime[] = data;

  return (
    <motion.main
      className="top_past_year relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className=" text-subHead uppercase mb-4 mt-section">
        Best Last Year
      </h3>
      <FlexIt warp="wrap" className="mt-section">
        {/**/}
        <CoverCardPastYear anime1={anime1} />
        <div className="w-full">
          <Swiper
            className="Swiper-Container"
            // modules={[Navigation]}
            style={{ paddingBottom: "50px", paddingTop: "50px" }}
            breakpoints={{
              769: {
                slidesPerView: 3,
              },
            }}
            slidesPerView={2}
            grabCursor={true}
            spaceBetween={15}

            // navigation={true}
          >
            {data.slice(1).map((e: anime, i: number) => (
              <SwiperSlide key={i + e.id + "kksjdfskdhfsfbn"}>
                <PastYearCard data={e} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </FlexIt>
      <div className="rating z-40 hover:scale-110 duration-300 ease-in text-xs md:text-base text-white w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-900 absolute top-28 md:top-24 right-5 gap-1 outline outline-yellow-500 outline-solid flex justify-center items-center">
        <span>{(anime1.rating / 10).toPrecision(2)}</span>
        <span className=" w- h-3 md:w-4 md:h-4 text-primary-500 ">
          <StarIconMini />
        </span>
      </div>
    </motion.main>
  );
}

export default PastYear;
