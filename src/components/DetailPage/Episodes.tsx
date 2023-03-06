import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import { PlayIcon } from "../../common/Icons";

function Episodes({ data }: { data: animeDetail }) {
  const title = data.title.userPreferred
    ? data.title.userPreferred
    : data.title.english;
  return (
    <div className="episodes flex flex-wrap justify-center items-center mt-10 gap-3">
      <h4 className="uppercase text-xl w-full mb-4">Episodes</h4>
      {data.episodes.length &&
        data.episodes.map((ep, i) => (
          <Link
            href={`/watch/${ep.id}?animeData=${data.currentEpisode}&ids=${data.id}`}
            className="ep_container w-1/5 flex-grow min-w-[150px] aspect-video max-w-xs"
            key={ep.id}
          >
            <div className="w-full relative h-full">
              <Image
                src={ep.image}
                alt={ep.id}
                fill
                priority={true}
                className="brightness-50 hover:brightness-95 ease-in-out duration-100"
              />
              <div className=" absolute top-1/2 left-1/2 w-6 h-6 p-[7px] rounded-full flex items-center justify-center   box-content text-primary-500 -translate-x-1/2 -translate-y-1/2 bg-black">
                <PlayIcon />
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Episodes;
