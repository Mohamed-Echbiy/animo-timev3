import Image from "next/image";
import Link from "next/link";
import React from "react";
import { recent_episodes } from "../../../../types/recent_episodes";
import { PlayIcon, TvIcon } from "../../../common/Icons";

function RecentEpCard({ data }: { data: recent_episodes }) {
  return (
    <div className="recentCard aspect-[.7] relative min-w-[140px]  rounded-xl text-white shadow-primary shadow-gray-800">
      <Link
        href={`/detail/${data.id}`}
        title={`watch ${data.title.userPreferred}`}
      >
        <div className="rating -translate-x-1/2 absolute -top-6 left-1/2 z-20 justify-center flex items-center  w-12 h-12 bg-primary-500 border-8 rounded-full border-slate-200 border-solid">
          <span className="w-4 h-4 text-black">
            <PlayIcon />
          </span>
        </div>
      </Link>
      <Image
        src={data.image}
        alt={data.title.userPreferred}
        fill={true}
        className="rounded-xl"
        priority={true}
        sizes="(max-width:420px) 150px , (max-width: 820) 280px, (max-width: 1200px) 300px"
      />
      <div className="absolute text-cardSm sm:text-xs xl:text-sm flex items-center flex-col justify-between p-1 md:p-4 z-10 h-fit w-full left-0 bottom-0 bg-gray-900 backdrop-blur-md bg-opacity-70">
        <div className="anime-detail my-3">
          <h3 className="anime_title mb-2">
            {data.title.userPreferred.slice(0, 27)}
          </h3>
          <p className="title_native  text-gray-400 mb-4">
            {data.title.native.slice(0, 18)}
          </p>
          <p className="episode flex items-center gap-4">
            <span>
              <TvIcon />
            </span>
            Ep: {data.episodeNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecentEpCard;
