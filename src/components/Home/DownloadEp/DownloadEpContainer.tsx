import React from "react";
import { Navigation, Autoplay } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { downloadLinks } from "../../../../types/downloadData";

import DownloadEpCard from "./DownloadEpCard";

function DownloadEpContainer({ data }: { data: downloadLinks[] }) {
  return (
    <section className="">
      <h4 className=" text-lg sm:text-xl md:text-subHead uppercase dark:text-blue-400 my-12">
        Download Episodes
      </h4>
      {data.length > 3 ? (
        <Swiper
          className="Swiper-Container"
          modules={[Navigation, Autoplay]}
          style={{
            paddingBottom: "50px",
            paddingTop: "80px",
            alignItems: "center",
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            560: {
              slidesPerView: 3,
            },
          }}
          slidesPerView={1}
          grabCursor={true}
          spaceBetween={5}
          navigation={true}
          // autoplay={true}
          centeredSlides
        >
          {data.map((e, i: number) => (
            <SwiperSlide
              key={i + e.id + "kksjdfskdhfsfb!!n"}
              className="min-h-full"
            >
              <div className="max-w-[280px]">
                <DownloadEpCard data={e} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <article className="w-full flex gap-2 flex-wrap items-stretch">
          {data.map((e) => (
            <div className="max-w-fit h-full" key={e.image + e.text}>
              <DownloadEpCard data={e} />
            </div>
          ))}
        </article>
      )}
    </section>
  );
}

export default DownloadEpContainer;