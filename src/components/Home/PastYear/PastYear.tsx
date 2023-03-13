import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { anime } from "../../../../types/anime";
import FlexIt from "../../../common/FlexIt";
import { StarIconMini } from "../../../common/Icons";
import PastYearCard from "./PastYearCard";
import { CoverCardPastYear } from "./CoverCardPastYear";
function PastYear({ data }: { data: [anime] }) {
  //here we got exactly 3 anime objects
  const [anime1]: anime[] = data;

  return (
    <main className="top_past_year relative overflow-hidden">
      <h3 className=" text-subHead uppercase mb-4 mt-section">Best 2020</h3>
      <FlexIt warp="wrap" className="mt-section">
        <CoverCardPastYear anime1={anime1} />
        <div className="w-full">
          <Swiper
            className="Swiper-Container"
            modules={[Navigation, Autoplay]}
            style={{ paddingBottom: "50px", paddingTop: "80px" }}
            breakpoints={{
              320: {
                slidesPerView: 3,
              },
              769: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            slidesPerView={2}
            grabCursor={true}
            spaceBetween={15}
            navigation={true}
            autoplay={true}
          >
            {data.slice(1).map((e: anime, i: number) => (
              <SwiperSlide key={i + e.id + "kksjdfskdhfsfbn"}>
                <PastYearCard data={e} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </FlexIt>
      <div className="rating z-40 hover:scale-110 duration-300 ease-in text-cardSm md:text-base text-white w-8 h-8 md:w-16 md:h-16 rounded-full bg-gray-900 absolute top-28 md:top-24 left-5 gap-1 outline outline-slate-200 outline-solid flex justify-center items-center">
        <span>{(anime1.rating / 10).toPrecision(2)}</span>
        <span className=" w-2 h-2 md:w-4 md:h-4 text-primary-500 ">
          <StarIconMini />
        </span>
      </div>
    </main>
  );
}

export default PastYear;
