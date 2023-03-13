import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import { PlayIcon } from "../../common/Icons";

function Episodes({ data }: { data: animeDetail }) {
  const title = data.title.userPreferred
    ? data.title.userPreferred
    : data.title.romaji;
  const [showAll, setShowAll] = useState(100);
  return (
    <>
      {data.episodes.length ? (
        <div className="episodes flex flex-wrap justify-center items-center mt-10 gap-3">
          <h4 className="uppercase text-xl w-full mb-4">Episodes</h4>
          {data.episodes.length &&
            data.episodes.slice(0, showAll).map((ep, i) => (
              <Link
                href={`/watch/${ep.id}?animeData=${data.currentEpisode}&ids=${data.id}&title=${title}`}
                className="ep_container w-1/5 flex-grow min-w-[150px] aspect-video max-w-xs "
                key={ep.id}
              >
                <div className="w-full relative h-full overflow-hidden rounded-md hover:shadow-primary duration-500 ease-in-out">
                  <Image
                    src={ep.image}
                    alt={ep.id}
                    fill
                    priority={true}
                    className=" brightness-70 saturate-150 hover:brightness-100 hover:saturate-200"
                  />
                  <div className=" absolute top-1/2 left-1/2 w-6 h-6 p-[7px] rounded-full flex items-center justify-center   box-content text-primary-500 -translate-x-1/2 -translate-y-1/2 bg-black">
                    <PlayIcon />
                  </div>
                  <div className="absolute bottom-0 py-2 px-2 uppercase bg-black text-slate-200 left-0 w-full">
                    <span>episode {i + 1}</span>
                  </div>
                </div>
              </Link>
            ))}
          {data.episodes.length > 100 && (
            <div className="w-full flex justify-center">
              <button
                className="w-fit p-2 bg-gray-800 rounded-sm text-slate-200 hover:bg-black transition-colors ease-in-out duration-500 hover:shadow-primary"
                onClick={() =>
                  setShowAll((pre) =>
                    pre === 100 ? data.episodes.length : 100
                  )
                }
              >
                {showAll === 100 ? "Show more" : "Show less"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center mt-10 gap-3 w-full capitalize h-24 md:h-32">
          <p className=" self-start py-6">there are no episodes out yet</p>
          <div className="relative w-16 h-16 md:w-24 md:h-24 self-end">
            <Image src={"/nothing_yet.png"} alt="angry face" fill />
          </div>
        </div>
      )}
    </>
  );
}

export default Episodes;
