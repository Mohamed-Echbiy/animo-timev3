import React from "react";
import { anime } from "../../../../types/anime";
import Image from "next/image";
import { PlayIcon, StarIconMini } from "../../../common/Icons";
import FlexIt from "../../../common/FlexIt";
import Link from "next/link";
import Heart from "../../../common/NavBar/Heart";

function PastYearCard({ data }: { data: anime }) {
  return (
    <div className="PastYearCard relative">
      <Heart data={data} />
      <Link
        href={`/detail/${data.id}`}
        title={`watch ${data.title.userPreferred}`}
        className=""
      >
        <div className="rating absolute -bottom-6 right-4 z-20 justify-center flex items-center w-12 h-12 bg-primary-500 border-8 rounded-full border-slate-200 border-solid">
          <span className="w-4 h-4 text-black">
            <PlayIcon />
          </span>
        </div>
      </Link>
      <p className=" hidden hover:scale-110 ease-in duration-300 md:flex text-base items-center gap-1 absolute z-20 w-12 h-12 -top-7 left-2 bg-gray-900 text-white p-2 box-content rounded-full outline outline-slate-200">
        {(data.rating / 10).toPrecision(2)}
        <span className="h-4 w-4  text-primary-400 mb-[1px]">
          <StarIconMini />
        </span>
      </p>
      <div className=" relative group min-w-[150px]  aspect-[.7]  flex-grow overflow-hidden rounded-xl text-xs lg:text-sm text-white shadow-primary shadow-gray-500">
        <Image
          src={data.image}
          quality={20}
          alt={data.title.english}
          fill={true}
          sizes="(max-width: 768px) 50vw,
             33vw"
        />

        <div className="absolute transition-all duration-500 text-cardSm md:text-xs xl:text-sm ease-in-out p-4 z-10 md:h-fit w-full left-0 bottom-0  bg-gray-900 backdrop-blur-sm bg-opacity-80">
          <FlexIt justify="between" items="center">
            <span>{data.title.userPreferred}</span>
          </FlexIt>
          <FlexIt justify="start" gap="4" className="mt-4 text-gray-300">
            {data.genres.slice(0, 3).map((e, i) => (
              <span key={i * 258109237.6}>{e}</span>
            ))}
          </FlexIt>
        </div>
      </div>
    </div>
  );
}

export default PastYearCard;
