import React, { useState } from "react";
import Image from "next/image";
import FlexIt from "./FlexIt";
import { HeartFillIcon, HeartIcon, StarIconMini } from "./Icons";
import { trending } from "../../types/trending";

function Card({ data }: { data: trending }) {
  const title: string =
    data.title.english.length > 27
      ? `${data.title.english.slice(0, 28)}...`
      : data.title.english;
  const genres: string[] =
    data.genres.length > 4 ? data.genres.slice(0, 4) : data.genres;
  const [isItFill, setHeart] = useState<Boolean>(false);
  return (
    <div className=" relative group min-w-[150px]  aspect-[.7]  flex-grow overflow-hidden rounded-xl text-xs lg:text-sm text-white shadow-primary shadow-gray-500">
      <Image
        src={data.image}
        alt={data.title.english}
        fill={true}
        sizes="(max-width: 768px) 50vw,
              (max-width: 995px) 33vw,
              25vw"
        priority={true}
      />
      <div
        className={`icon w-7 h-7 z-10 absolute top-3 right-3 hover:text-secondary-600  ${
          isItFill ? "text-secondary-500" : "opacity-70"
        }`}
        onClick={() => setHeart((pre) => !pre)}
      >
        <HeartFillIcon />
      </div>
      <div className="absolute transition-all duration-500 text-cardSm sm:text-xs xl:text-sm ease-in-out p-4 z-10 md:h-fit w-full left-0 -bottom-1  bg-gray-900 backdrop-blur-sm bg-opacity-80">
        <FlexIt justify="between" items="center">
          <span>{title}</span>
          <p className="hidden md:flex items-center gap-2">
            {(data.rating / 10).toPrecision(2)}
            <span className="h-4 w-4 text-primary-400">
              <StarIconMini />
            </span>
          </p>
        </FlexIt>
        <FlexIt justify="start" gap="4" className="mt-4 text-gray-300">
          {genres.map((e, i) => (
            <span key={i * 258109237.6}>{e}</span>
          ))}
        </FlexIt>
      </div>
    </div>
  );
}

export default Card;
