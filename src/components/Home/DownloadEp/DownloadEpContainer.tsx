import React from "react";
import { Navigation, Autoplay, Keyboard } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { downloadLinks } from "../../../../types/downloadData";

import DownloadEpCard from "./DownloadEpCard";

function DownloadEpContainer({ data }: { data: downloadLinks[] }) {
  return (
    <section className=''>
      <h4 className=' text-lg sm:text-xl md:text-subHead uppercase dark:text-blue-400 my-12'>
        Download Episodes
      </h4>
      {data.length > 3 ? (
        <Swiper
          className='Swiper-Container'
          modules={[Navigation, Autoplay]}
          style={{
            paddingBottom: "50px",
            paddingTop: "80px",
            alignItems: "center",
          }}
          slidesPerView={1}
          breakpoints={{
            760: {
              slidesPerView: 2,
            },
            1220: {
              slidesPerView: 3,
            },
          }}
          grabCursor={true}
          spaceBetween={10}
          navigation={true}
          autoplay={true}
        >
          {data.map((e, i: number) => (
            <SwiperSlide
              key={i + e.id + "kksjdfskdhfsfb!!n"}
              className='min-h-full justify-center flex'
            >
              <div className='max-w-[280px]'>
                <DownloadEpCard data={e} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <article className='w-full flex gap-2 flex-wrap items-stretch '>
          {data.map((e) => (
            <div className='max-w-fit h-full' key={e.image + e.text}>
              <DownloadEpCard data={e} />
            </div>
          ))}
        </article>
      )}
    </section>
  );
}

export default DownloadEpContainer;
