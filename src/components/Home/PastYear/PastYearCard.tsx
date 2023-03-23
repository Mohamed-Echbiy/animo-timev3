import { anime } from "../../../../types/anime";
import Image from "next/image";
import { PlayIcon, StarIconMini } from "../../../common/Icons";
import FlexIt from "../../../common/FlexIt";
import Link from "next/link";
// import Heart from "";
const Heart = dynamic(() => import("../../../common/NavBar/Heart"));
import { recommndation } from "../../../../types/recomndation";
import { useContext, useState } from "react";
import ImageLoader from "../../../common/ImageLoader";
import dynamic from "next/dynamic";

function PastYearCard({ data }: { data: anime | recommndation }) {
  const [imageLoad, setImageLoad] = useState(false);

  return (
    <div className="PastYearCard rounded-lg relative group max-w-xs">
      {imageLoad ? (
        <>
          <Heart data={data} />
          <Link
            href={`/detail/${data.id}`}
            title={`watch ${data.title.userPreferred || "watch anime now"}`}
            className=""
          >
            <div className="rating absolute -bottom-6 right-4 z-20 justify-center flex items-center w-10 h-10 md:w-12 md:h-12 bg-primary-500 border-4 md:border-8 rounded-full border-slate-200 border-solid">
              <span className="w-4 h-4 text-black">
                <PlayIcon />
              </span>
            </div>
          </Link>
          <p className=" hidden hover:scale-110 ease-in duration-300 md:flex text-base items-center gap-1 absolute z-20 w-10 h-10 -top-7 left-4 bg-gray-900 text-white p-2 box-content rounded-full outline outline-slate-200">
            {(data.rating / 10).toPrecision(2)}
            <span className="h-4 w-4  text-primary-400 mb-[1px]">
              <StarIconMini />
            </span>
          </p>
        </>
      ) : (
        <></>
      )}
      <section className=" relative group  aspect-[.7] min-w-[150px] flex-grow text-xs lg:text-sm text-white ease-in duration-500 shadow-primary group-hover:shadow-gray-500 ">
        <Link
          href={`/detail/${data.id}`}
          className=" relative w-full h-full  block"
        >
          <Image
            src={data.image}
            quality={20}
            alt={data.title.romaji || "cover image"}
            fill={true}
            sizes="(max-width: 768px) 50vw,
             33vw"
            onLoad={() => setImageLoad(true)}
            className="rounded-md group-hover:saturate-200 ease-in duration-500"
          />
        </Link>
        {!imageLoad ? <ImageLoader /> : <></>}
        <article className="absolute transition-all duration-500 text-cardSm md:text-[12px] ease-in-out p-4 z-10 md:h-fit w-full left-0 bottom-0  bg-gray-900 backdrop-blur-sm bg-opacity-80">
          {imageLoad ? (
            <>
              <FlexIt justify="between" items="center">
                <p>{data.title.userPreferred || data.title.romaji}</p>
              </FlexIt>
              {data.genres && (
                <FlexIt justify="start" gap="4" className="mt-4 text-gray-300">
                  {data.genres.slice(0, 3).map((e, i) => (
                    <p key={i * 258109237.6}>{e}</p>
                  ))}
                </FlexIt>
              )}
            </>
          ) : (
            <></>
          )}
        </article>
      </section>
    </div>
  );
}

export default PastYearCard;
