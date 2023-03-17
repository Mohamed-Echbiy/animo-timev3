import { anime } from "../../../types/anime";
import FlexIt from "../../common/FlexIt";
import { MovieIcon, MoviesIconV2 } from "../../common/Icons";
import { CoverCardPastYear } from "../Home/PastYear/CoverCardPastYear";
import PastYearCard from "../Home/PastYear/PastYearCard";

function TopMovies({ data }: { data: anime[] }) {
  const anime1 = data.slice(0, 1);
  console.log(anime1);
  return (
    <main>
      <FlexIt warp="wrap" className=" gap-y-12 pt-[220px]" gap="4">
        <>
          <h1 className="w-full text-subHead mb-4 uppercase flex items-center gap-3">
            Top Movies
            <span className="w-6 h-6">
              <MoviesIconV2 />
            </span>
          </h1>
          <CoverCardPastYear anime1={anime1[0]} />
          {data.slice(1).map((e, i) => (
            <article
              className="flex-grow min-w-[240px] w-1/6 max-w-[250px] md:max-w-[none] text-xs md:text-sm"
              key={i + e.color + e.id + e.malId + "ldfjdlfjsd"}
            >
              <PastYearCard data={e} />
            </article>
          ))}
        </>
      </FlexIt>
    </main>
  );
}

export default TopMovies;
