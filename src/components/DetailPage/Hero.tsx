import Image from "next/image";
import React, { useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { PlayIcon } from "../../common/Icons";
import Link from "next/link";

function Hero({ data }: { data: animeDetail }) {
  const ep = data.episodes[0].id[data.episodes[0].id.length - 1] || 0;
  const title = data.title.romaji ? data.title.romaji : data.title.english;

  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <AnimatePresence>
        {isModal && (
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ y: "100vh" }}
              className="modal_text absolute top-0 left-0 w-full h-screen justify-center items-center z-50 hidden sm:flex"
            >
              <div
                className="backdrop top-0 w-full left-0 h-full absolute cursor-pointer bg-slate-200 opacity-80"
                onClick={() => setIsModal(false)}
              ></div>
              <div className="box_text text-sm md:text-base bg-black text-white rounded-t p-8 max-w-3xl z-50">
                {data.description}
              </div>
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
      <main className="hero_section relative w-full sm:aspect-[9/6]  md:aspect-[9/5] lg:aspect-[9/3.7] rounded-lg p-6 mb-10">
        <Image
          src={data.cover ? data.cover : data.image}
          alt={title}
          fill
          className=" brightness-[15%] rounded-md hidden sm:block"
          quality={15}
          priority={true}
        />
        <div className="content  sm:flex items-center justify-center sm:justify-start h-full w-full gap-4 sm:text-white">
          <div className="image_container mx-auto sm:mx-0 aspect-[.7] w-2/6 min-w-[150px] max-w-[250px] relative border-8 border-solid border-white  rounded-md">
            <Image
              src={data.image}
              alt={title}
              fill
              quality={60}
              priority={true}
            />
            <div className="absolute -top-8 left-1/2 rounded-full -translate-x-2/4 w-14 h-14 bg-black flex justify-center items-center gap-[2px] text-primary-500 border-4 border-solid border-white">
              <span className="text-sm font-bold">
                {(data.rating / 10).toPrecision(2)}
              </span>
              <span className="text-xs">⭐</span>
            </div>
          </div>
          <div className="content_info w-full mt-8 sm:mt-0 z-10 flex sm:block flex-col justify-center items-center">
            <h3 className="title text-xl sm:text-2xl lg:text-3xl text-center sm:text-start">
              {data.title.english}
            </h3>
            {data.title.english !== data.title.native && (
              <p className=" text-xs sm:text-sm text-center sm:text-start mt-2">
                {data.title.native}
              </p>
            )}
            <div className="info_sub_hd mt-4 flex gap-2 uppercase items-center justify-center sm:justify-start text-xs md:text-sm bg-black sm:bg-transparent px-4 py-2 sm:p-0 rounded-md flex-wrap">
              <span className="p-[5px]  bg-white text-black rounded-md h-fit">
                {data.type}
              </span>
              <span className="p-1 s border border-solid text-white  border-white rounded-md">
                {data.subOrDub}
              </span>
              <div className="w-8 h-8 relative">
                <Image
                  src={`https://flagsapi.com/${data.countryOfOrigin}/flat/64.png`}
                  alt={`country flag`}
                  fill
                />
              </div>
              <div className="w-[1px] bg-white h-7 "></div>
              <p className="capitalize text-white ">{data.currentEpisode} ep</p>
              <div className="w-[1px] bg-white h-7 "></div>
              <p className="text-white ">{data.studios[0]}</p>
              <div className="w-[1px] bg-white h-7 "></div>
              <p className="text-white ">{data.season}</p>
            </div>
            <div className="geners flex items-center gap-3 mt-4 text-xs md:text-sm flex-wrap">
              {data.genres.map((e, i) => (
                <span
                  className="p-2 border border-solid border-black sm:border-white rounded-lg"
                  key={e + "jdfldjlf" + 2901239290 * i}
                >
                  {e}
                </span>
              ))}
            </div>
            <div className="description">
              <p className="uppercase mt-4 mb-2">description</p>
              <p className="text-sm md:text-base">
                <span className=" capitalize hidden sm:inline">
                  {data.description.slice(0, 200)}
                </span>
                <span className="max-h-[80px] overflow-y-scroll block sm:hidden text-xs py-1">
                  {data.description}
                </span>
                <span className="hidden sm:inline ">...</span>
                <span
                  className=" text-secondary-700 font-bold cursor-pointer hidden sm:inline"
                  onClick={() => setIsModal(true)}
                >
                  more
                </span>
              </p>
            </div>
            {data.episodes.length ? (
              <Link
                href={`/watch/${data.episodes[0].id}?animeData=${data.currentEpisode}&ids=${data.id}&title=${title}`}
                className=" text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1 h-5 w-fit mt-2 p-1 sm:p-2 lg:p-3  box-content rounded-lg bg-secondary-600"
              >
                Watch <PlayIcon />
              </Link>
            ) : (
              <p className="text-secondary-700 font-bold capitalize p-2 bg-white w-fit mt-4">
                there is no episode available
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Hero;
