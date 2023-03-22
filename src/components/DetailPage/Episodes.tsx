import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import {
  PlayIcon,
  SearchIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "../../common/Icons";
import ImageLoader from "../../common/ImageLoader";

function Episodes({ data }: { data: animeDetail }) {
  const title = data.title.userPreferred
    ? data.title.userPreferred
    : data.title.romaji;
  const [searchFor, SetSearch] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [sortMode, setSortMode] = useState(true);
  const [episodes, setEpisodesArray] = useState(data.episodes);

  useEffect(() => {
    setEpisodesArray(data.episodes.sort().reverse());
  }, [sortMode]);

  return (
    <>
      {data.episodes.length ? (
        <div className="episodes flex flex-wrap justify-center items-center mt-10 gap-3 ">
          <div className="w-full flex items-center gap-2 gap-y-4 mb-3 flex-wrap">
            <input
              type="number"
              name="search"
              className="py-2 px-4 bg-gray-300 text-black rounded-sm capitalize"
              placeholder="type episode number"
              onChange={(e) => {
                setSortMode(false);
                SetSearch(e.target.value);
              }}
            />
            <SearchIcon />
            {!searchFor ? (
              <div className="ml-5 uppercase text-xs md:text-sm xl:text-base flex items-center w-fit">
                <span>sort by </span>
                <select
                  className=" ml-2 cursor-pointer p-1 rounded-md ease-in-out transition-all duration-300 bg-white uppercase"
                  onChange={(e) => setSortMode(!!e.target.value)}
                >
                  <option value="recent">recent</option>
                  <option value="">oldest</option>
                </select>
              </div>
            ) : (
              <></>
            )}
          </div>
          <>
            {!searchFor
              ? data.episodes.length &&
                episodes.map((ep, i) => (
                  <Link
                    href={`/watch/${ep.id}?animeData=${data.currentEpisode}&ids=${data.id}&title=${title}`}
                    className="ep_container flex-grow min-w-[200px] aspect-video max-w-xs ease-in-out transition-all duration-300"
                    key={ep.id}
                  >
                    <div className="w-full relative h-full overflow-hidden rounded-md hover:shadow-primary duration-500 ease-in-out">
                      <Image
                        src={ep.image}
                        alt={ep.id}
                        fill
                        priority={true}
                        className=" brightness-70 saturate-150 hover:brightness-100 hover:saturate-200"
                        onLoad={() => setImgLoaded(true)}
                      />

                      {imgLoaded ? <></> : <ImageLoader />}
                      <div className=" absolute top-1/2 left-1/2 w-6 h-6 p-[7px] rounded-full flex items-center justify-center   box-content text-primary-500 -translate-x-1/2 -translate-y-1/2 bg-black">
                        <PlayIcon />
                      </div>
                      <div className="absolute bottom-0 py-2 px-2 text-xs uppercase bg-black text-slate-200 left-0 w-full">
                        <span>episode {ep.number}</span>
                      </div>
                    </div>
                  </Link>
                ))
              : data.episodes.length &&
                episodes.map((ep, i) => {
                  if (ep.number === +searchFor) {
                    return (
                      <Link
                        href={`/watch/${ep.id}?animeData=${data.currentEpisode}&ids=${data.id}&title=${title}`}
                        className="ep_container flex-grow min-w-[200px] aspect-video max-w-xs "
                        key={ep.id}
                      >
                        <div className="w-full relative h-full overflow-hidden rounded-md hover:shadow-primary duration-500 ease-in-out">
                          <Image
                            src={ep.image}
                            alt={ep.id}
                            fill
                            priority={true}
                            className=" brightness-70 saturate-150 hover:brightness-100 hover:saturate-200"
                            onLoad={() => setImgLoaded(true)}
                          />

                          {imgLoaded ? <></> : <ImageLoader />}
                          <div className=" absolute top-1/2 left-1/2 w-6 h-6 p-[7px] rounded-full flex items-center justify-center   box-content text-primary-500 -translate-x-1/2 -translate-y-1/2 bg-black">
                            <PlayIcon />
                          </div>
                          <div className="absolute bottom-0 py-2 px-2 text-xs uppercase bg-black text-slate-200 left-0 w-full">
                            <span>episode {ep.number}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  } else {
                    return <></>;
                  }
                })}
          </>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center mt-10 gap-3 w-full capitalize h-24 md:h-32">
          <p className=" self-start py-6">there are no episodes out yet</p>
          <div className="relative w-16 h-16 md:w-24 md:h-24 self-end">
            <Image src={"/nothing_yet.png"} alt="angry face" fill quality={5} />
          </div>
        </div>
      )}
    </>
  );
}

export default Episodes;
