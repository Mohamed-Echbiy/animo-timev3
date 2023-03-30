import Image from "next/image";
import React, { useContext, useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { PlayIcon } from "../../common/Icons";
import Link from "next/link";
import ImageLoader from "../../common/ImageLoader";
import { userContext } from "../../../pages/_app";

function Hero({ data }: { data: animeDetail }) {
  const title = data.title?.userPreferred
    ? data.title?.userPreferred
    : data.title?.romaji
    ? data.title?.romaji
    : data.title?.english;

  const { setModal } = useContext(userContext);
  const [imgLoad, setImgLoad] = useState(false);
  const [imgLoadSmall, setImgLoadSmall] = useState(false);

  return (
    <>
      <main className="hero_section relative w-full sm:aspect-[9/6.3] mt-10 md:aspect-[9/5.5] lg:aspect-[9/4] rounded-lg p-6 mb-10">
        <Image
          src={data.cover || data.image}
          alt={title}
          fill
          className=" brightness-[20%] sm:rounded-md blur-[7px] sm:blur-none"
          quality={15}
          priority={true}
          onLoad={() => setImgLoad(true)}
        />
        {!imgLoad && <ImageLoader />}
        <div className="content my-6 sm:my-0 relative sm:flex items-center justify-center sm:justify-start h-full w-full gap-4 text-white">
          <div className="image_container mx-auto sm:mx-0 aspect-[.7] w-2/6 min-w-[150px] max-w-[270px] relative border-8 border-solid border-white  rounded-md">
            <Image
              src={data.image}
              alt={title}
              fill
              quality={20}
              sizes="270px"
              priority={true}
              onLoad={() => setImgLoadSmall(true)}
            />
            {!imgLoadSmall && <ImageLoader />}
            <div className="absolute -top-8 left-1/2 rounded-full -translate-x-2/4 w-14 h-14 bg-black flex justify-center items-center gap-[2px] text-primary-500 border-4 border-solid border-white">
              <span className="text-sm font-bold">
                {(data.rating / 10).toPrecision(2)}
              </span>
              <span className="text-xs">⭐</span>
            </div>
          </div>
          <div className="content_info w-full mt-8 sm:mt-0 z-10 flex sm:block flex-col justify-center items-center">
            <h3 className="title text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-start">
              {title}
            </h3>

            <p className=" text-xs mb-2 md:text-sm text-center sm:text-start mt-2">
              {data.title?.native || ""}
            </p>

            <div className="info_sub_hd hidden md:flex w-full mt-4 flex-col md:flex-row  gap-2 uppercase md:items-center  justify-start text-xs md:text-sm  sm:bg-transparent px-4 py-2 sm:p-0 rounded-md flex-wrap">
              <span className="p-[5px]  md:bg-white text-black rounded-md h-fit">
                {data.type}
              </span>
              <span className="p-1 s border md:border-solid md:text-white  md:border-white rounded-md">
                {data.subOrDub}
              </span>
              <div className=" text-sm md:text-xl relative">
                {data.countryOfOrigin}
              </div>
              <div className="w-[1px] hidden md:block bg-white h-7 "></div>
              <p className="capitalize text-white ">
                {data?.currentEpisode} ep
              </p>
              <div className="w-[1px] bg-white hidden md:block h-7 "></div>
              <p className="text-white ">{data.studios?.toString()}</p>
              <div className="w-[1px] hidden md:block bg-white h-7 "></div>
              <p className="text-white ">{data?.season}</p>
            </div>
            {/* info */}
            <div className="flex text-white flex-col sm:hidden w-full capitalize my-5 gap-y-4 py-5 px-2 items-center">
              <h4 className="title text-center pb-2 font-semibold border-2  border-transparent border-b-white border-solid text-xl">
                INFO
              </h4>
              <p className="type">
                <span>type : </span>
                <span>{data.type}</span>
              </p>
              <p className="subOrDub">
                <span>sub or dub : </span>
                <span>{data.subOrDub}</span>
              </p>
              <p className="country">
                <span>country : </span>
                <span>{data.countryOfOrigin}</span>
              </p>
              <p className="currentEp">
                <span>total Episodes : </span>
                <span>{data.currentEpisode}</span>
              </p>
              <p className="studios">
                <span>studios : </span>
                <span>{data.studios?.join(" / ")}</span>
              </p>
              <p className="season">
                <span>season : </span>
                <span>{data.season}</span>
              </p>
              <p className="onGoing">
                <span>status : </span>
                <span>{data.status}</span>
              </p>
            </div>

            <div className="geners flex items-center gap-3 mb-4 md:mt-4 text-xs lg:text-sm flex-wrap">
              {data.genres?.map((e, i) => (
                <span
                  className="p-2 border border-solid text-white border-white rounded-lg"
                  key={e + "jdfldjlf" + 2901239290 * i}
                >
                  {e}
                </span>
              ))}
            </div>
            <div className="status_nextEp_Start_Date my-2 capitalize text-white flex flex-col sm:flex-row w-full items-center text-xs flex-wrap md:text-sm gap-4">
              <p
                className={`${
                  data.status === "Ongoing"
                    ? "text-yellow-500 font-semibold"
                    : data.status === "Completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                status : {data.status}
              </p>
              <p className="start_date">
                <span>started at : </span>
                {new Date(
                  data.startDate?.year,
                  data.startDate?.month,
                  data.startDate?.day
                ).toDateString()}
              </p>
              <p>
                <span>end at : </span>
                {data.status === "Ongoing" &&
                  new Date(
                    data.endDate.year,
                    data.endDate.month,
                    data.endDate.day
                  ).toDateString()}
              </p>
            </div>
            <div className="description text-white mt-4 md:mt-0">
              <p className="uppercase mt-4 mb-2 text-center sm:text-start">
                description
              </p>
              <p className="text-xs md:text-sm">
                <span className=" capitalize hidden sm:inline">
                  {data.description?.slice(0, 200)}
                </span>
                <span className="max-h-[80px] overflow-y-scroll block sm:hidden text-sm py-1">
                  {data.description}
                </span>
                <span className="hidden sm:inline ">...</span>
                <span
                  className=" text-secondary-700 font-bold cursor-pointer hidden sm:inline"
                  onClick={() => setModal(data.description)}
                >
                  more
                </span>
              </p>
            </div>
            {data.episodes?.length ? (
              <div className="flex items-center gap-2 flex-wrap mt-5 mb-7 md:mb-0">
                <Link
                  href={`/watch/${data?.episodes[0]?.id}?animeData=${data.currentEpisode}&ids=${data.id}&title=${title}`}
                  className="    rounded-sm flex max-w-fit px-2 py-1 gap-2 border border-solid md:border-white items-center"
                >
                  <span>watch </span>
                  <span className="h-5 w-5">
                    <PlayIcon />
                  </span>
                </Link>

                {data.nextAiringEpisode && (
                  <div className=" rounded-sm flex max-w-fit px-2 py-1 gap-2 border border-solid md:border-white items-center uppercase ">
                    <span>next ep in </span>
                    {data.status === "Ongoing" ? (
                      Math.floor(
                        data.nextAiringEpisode?.timeUntilAiring / 86000
                      )
                    ) : (
                      <></>
                    )}
                    <span> days</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-secondary-700 font-bold capitalize p-2 bg-slate-200 w-fit mt-4 rounded-sm">
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
