import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";
import { favorite } from "../../types/favorites";
import FlexIt from "./FlexIt";
import { StarIconMini } from "./Icons";
import Heart from "./NavBar/Heart";

function FavoriteCard({ data }: { data: favorite }) {
  const title: string =
    data.title.length > 27 ? `${data.title.slice(0, 28)}...` : data.title;

  return (
    <div className="  relative group min-w-[150px]  aspect-[.7]   overflow-hidden rounded-xl text-xs lg:text-sm text-white shadow-primary shadow-gray-500">
      <Link href={`/detail/${data.id}`} title={data.title}>
        <Image
          src={data.image}
          alt={data.title}
          fill={true}
          sizes="(max-width: 768px) 50vw,
              (max-width: 995px) 33vw,
              25vw"
          priority={true}
        />
      </Link>
      <Heart data={data} />
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
      </div>
    </div>
  );
}

export default FavoriteCard;
