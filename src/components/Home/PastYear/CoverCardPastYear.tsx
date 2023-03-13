import Link from "next/link";
import Image from "next/image";
import { anime } from "../../../../types/anime";
import FlexIt from "../../../common/FlexIt";
import { TvIcon, CheckMarkIcon, PlayIcon } from "../../../common/Icons";
import Heart from "../../../common/NavBar/Heart";

export const CoverCardPastYear = ({ anime1 }: { anime1: anime }) => {
  return (
    <>
      <div className="pastYear-cover-anime group overflow-hidden w-full aspect-[9/5] lg:aspect-[9/3] shadow-primary shadow-gray-700 rounded-lg relative">
        <Image
          src={anime1.cover}
          alt={anime1.title.userPreferred}
          fill
          className="rounded-lg saturate-50 group-hover:saturate-150 group-hover:scale-125 ease-in-out duration-500 "
          sizes="100vw"
          quality={20}
        />
        <div className="details ease-in duration-150  z-10 absolute w-full bg-gradient-to-r from-gray-900 to-transparent h-full">
          <FlexIt
            flex="col"
            items="start"
            className="px-2 md:px-4 text-slate-200 h-full "
            gap="0"
          >
            <h3
              className={`title text-cardSm sm:text-xs md:text-base lg:text-xl `}
            >
              {anime1.title.userPreferred}
            </h3>
            <p className="native-title text-cardSm lg:text-sm text-gray-400">
              {anime1.title.native}
            </p>
            <div className="mt-4 mb-2 flex items-center gap-4 uppercase text-cardSm sm:text-xs">
              <p className="flex items-center gap-1">
                <span className="blcok w-6 h-6">
                  <TvIcon />
                </span>
                <span>{anime1.type}</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="h-6 w-6">
                  <CheckMarkIcon />
                </span>
                <span className="uppercase">{anime1.status}</span>
              </p>
              <p>
                <span>{anime1.totalEpisodes} episodes</span>
              </p>
            </div>
            <p className="description_pastYear cursor-all-scroll text-gray-400 hidden md:block max-w-md lg:max-w-lg xl:max-w-xl text-sm my-2 h-20 overflow-y-scroll">
              <span className="block capitalize my-2 text-slate-200">
                description
              </span>
              {anime1.description}
            </p>
            <Link
              href={`/detail/${anime1.id}`}
              className="my-4 text-xs md:text-sm"
            >
              <button
                className="flex items-center gap-1 p-2 text-gray-900 hover:text-gray-400 duration-500 rounded-md"
                style={{ backgroundColor: anime1.color }}
              >
                <span>watch</span>
                <span className="w-5 h-5">
                  <PlayIcon />
                </span>
              </button>
            </Link>
          </FlexIt>
        </div>
        <Heart data={anime1} />
      </div>
    </>
  );
};
