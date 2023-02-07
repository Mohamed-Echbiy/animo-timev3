import FlexIt from "../../../common/FlexIt";
import { recent_episodes } from "../../../../types/recent_episodes";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";
import "swiper/css";
// import "swiper/css/navigation";
import RecentEpCard from "./RecentEpCard";
import { motion } from "framer-motion";

function RecentEpisodes({ data }: { data: [recent_episodes] }) {
  console.log(data);
  return (
    <motion.main
      className="recent_episodes_container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="recent_episodes_title  text-subHead mb-4 mt-section uppercase">
        Recent Episodes
      </h2>
      <Swiper
        className="Swiper-Container"
        // modules={[Navigation]}
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
        {data.map((e: recent_episodes) => (
          <SwiperSlide key={`${e.malId}recentEpisodes-kqkjfqskj`}>
            <RecentEpCard data={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.main>
  );
}

export default RecentEpisodes;
