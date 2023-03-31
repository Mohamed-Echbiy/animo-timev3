import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import { PlayIcon, SearchIcon } from "../../common/Icons";
import ImageLoader from "../../common/ImageLoader";

function Episodes({ data }: { data: animeDetail }) {
  console.log(data);
  const title = data.title.romaji
    ? data.title.romaji
    : data.title.userPreferred;
  const [searchFor, SetSearch] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [sortMode, setSortMode] = useState(true);
  const [episodes, setEpisodesArray] = useState<
    { id: string; number: number }[]
  >(data.episodes);

  useEffect(() => {
    setEpisodesArray(data.episodes.sort().reverse());

    async function letsGetEps() {
      if (data.episodes.length < 1 && data.status !== "Not yet aired") {
        console.log("bannana");
        const req = await fetch(`https://api.jikan.moe/v4/anime/${data.malId}`);
        const res = await req.json();
        console.log(res.data.titles[0].title);
        let episodes = [];
        for (let index = 1; index <= data.currentEpisode; index++) {
          episodes.push({
            id: `${res.data.titles[0].title
              .replaceAll(/[^a-zA-Z0-9]+/g, "-")
              .replaceAll(/\b-movie\b/gi, "")
              .replaceAll(/-{2,}/g, "-")
              .toLowerCase()}-episode-${index}`,
            number: index,
          });
        }
        setEpisodesArray(episodes);
      }
    }
    letsGetEps();
  }, [sortMode]);
  console.log(episodes, "episodes");
  return (
    <>
      {episodes.length ? (
        <div className="episodes flex flex-wrap justify-start items-center mt-10 gap-3 ">
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
                  className=" ml-2 cursor-pointer p-1 rounded-md ease-in-out transition-all duration-300 bg-white dark:bg-gray-900 py-2 uppercase"
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
              ? episodes.length &&
                episodes.map((ep, i) => (
                  <Link
                    href={`/watch/${ep.id}?animeData=${data.currentEpisode}&ids=${data.id}&title=${title}`}
                    className="ep_container flex-grow min-w-[68px] max-w-[280px]  aspect-video  ease-in-out transition-all duration-300"
                    key={ep.id}
                  >
                    <div className="w-full relative h-full flex items-center font-semibold justify-center bg-gray-900 text-slate-200 overflow-hidden rounded-md hover:dark:shadow-none hover:shadow-primary duration-500 ease-in-out">
                      <p className="text-xl">{ep.number}</p>
                    </div>
                  </Link>
                ))
              : episodes.length &&
                episodes.map((ep, i) => {
                  if (ep.number === +searchFor) {
                    return (
                      <Link
                        href={`/watch/${ep.id}?animeData=${data.currentEpisode}&ids=${data.id}&title=${title}`}
                        className="ep_container flex-grow min-w-[200px] aspect-video max-w-xs "
                        key={ep.id}
                      >
                        <div className="w-full relative h-full overflow-hidden rounded-md hover:shadow-primary hover:dark:shadow-none duration-500 ease-in-out">
                          <p className="text-xl">{ep.number}</p>
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
