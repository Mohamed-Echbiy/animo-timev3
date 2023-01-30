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

function PastYear({ data }: { data: [anime] }) {
  //here we got exactly 3 anime objects
  const [anime1]: anime[] = data;

  return (
    <main className="top_past_year relative overflow-hidden">
      <h3 className=" text-subHead uppercase mb-4">Best Last Year</h3>
      <FlexIt warp="wrap" className="mt-section">
        <div className="pastYear-cover-anime w-full aspect-[9/5] md:aspect-[9/3] relative shadow-primary shadow-gray-900 rounded-lg">
          <Image
            src={anime1.cover}
            alt={anime1.title.userPreferred}
            fill
            className="rounded-lg"
          />
          <div className="details z-10 absolute w-full bg-gradient-to-r from-gray-900 to-transparent h-full">
            <FlexIt
              flex="col"
              items="start"
              className="px-2 md:px-4 text-slate-200 h-full "
              gap="0"
            >
              <h3 className={`title text-base lg:text-xl `}>
                {anime1.title.userPreferred}
              </h3>
              <p className="native-title text-xs lg:text-sm text-gray-400">
                {anime1.title.native}
              </p>
              <div className="mt-4 mb-2 flex items-center gap-4 uppercase text-cardSm sm:text-xs">
                <p className="flex items-center gap-1">
                  <span>
                    <TvIcon />
                  </span>
                  <span>{anime1.type}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span className="h-6 w-6">
                    <CheckMarkIcon />
                  </span>
                  <span className="uppercase">{anime1.status}</span>
                </p>
                <p>
                  <span>{anime1.totalEpisodes} episodes</span>
                </p>
              </div>
              <p className="description_pastYear cursor-all-scroll text-gray-400 hidden md:block max-w-md lg:max-w-lg xl:max-w-xl text-sm my-2 h-20 overflow-y-scroll">
                <span className="block capitalize my-2 text-slate-200">
                  description
                </span>
                {anime1.description}
              </p>
              <Link
                href={`/detail/${anime1.id}`}
                className="my-4 text-xs md:text-sm"
              >
                <button
                  className="flex items-center gap-1 p-2 text-gray-900 hover:text-gray-400 duration-500 rounded-md"
                  style={{ backgroundColor: anime1.color }}
                >
                  <span>watch</span>
                  <span className="w-5 h-5">
                    <PlayIcon />
                  </span>
                </button>
              </Link>
            </FlexIt>
          </div>
        </div>
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
      <div className="rating z-40 hover:scale-110 duration-300 ease-in text-xs md:text-base text-white w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-900 absolute top-14 right-5 gap-1 outline outline-yellow-500 outline-solid flex justify-center items-center">
        <span>{(anime1.rating / 10).toPrecision(2)}</span>
        <span className=" w- h-3 md:w-4 md:h-4 text-primary-500 ">
          <StarIconMini />
        </span>
      </div>
    </main>
  );
}

export default PastYear;
