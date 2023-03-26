import { Swiper, SwiperSlide } from "swiper/react";
import { anime } from "../../../../types/anime";
import { CoverCardPastYear } from "../PastYear/CoverCardPastYear";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

function Upcoming({ data }: { data: [anime] }) {
  const filtredData = data.filter((e) => e.cover);

  return (
    <main className="upcoming_anime mt-section">
      <h3 className="uppercase text-subHead dark:text-secondary-500">
        Upcomming
      </h3>
      <Swiper
        className="Swiper-Container"
        modules={[Navigation, Autoplay]}
        style={{ paddingBottom: "50px", paddingTop: "80px" }}
        slidesPerView={1}
        grabCursor={true}
        spaceBetween={0}
        navigation={true}
        autoplay={{
          delay: 6500,
        }}
      >
        {filtredData.map((e) => (
          <SwiperSlide key={e.cover}>
            <CoverCardPastYear anime1={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default Upcoming;
