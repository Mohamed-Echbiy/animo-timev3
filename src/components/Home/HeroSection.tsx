import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../common/Card";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { trending } from "../../../types/trending";

function HeroSection({ data }: { data: [trending] }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.main
        className="heroSection pt-[158px] pb-4"
        initial={{ opacity: 0, x: "-100wv" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className=" text-subHead mb-4 uppercase">Trending</h2>
        <Swiper
          className="Swiper-Container"
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
      </m.main>
    </LazyMotion>
  );
}

export default HeroSection;
