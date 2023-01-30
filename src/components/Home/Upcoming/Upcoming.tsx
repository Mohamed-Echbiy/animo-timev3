import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { anime } from "../../../../types/anime";
import { CoverCardPastYear } from "../PastYear/CoverCardPastYear";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { motion } from "framer-motion";

function Upcoming({ data }: { data: [anime] }) {
  const filtredData = data.filter((e) => e.cover);
  //   console.log(filtredData);

  return (
    <motion.main
      className="upcoming_anime mt-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="uppercase text-subHead">Upcoming</h3>
      <Swiper
        className="Swiper-Container"
        modules={[Navigation]}
        style={{ paddingBottom: "50px", paddingTop: "80px" }}
        slidesPerView={1}
        grabCursor={true}
        spaceBetween={0}
        navigation={true}
      >
        {filtredData.map((e) => (
          <SwiperSlide key={e.cover}>
            <CoverCardPastYear anime1={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.main>
  );
}

export default Upcoming;
