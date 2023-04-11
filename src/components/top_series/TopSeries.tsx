import Link from "next/link";
import { useEffect, useState } from "react";
import { anime } from "../../../types/anime";
import FlexIt from "../../common/FlexIt";
import { ListCardIcon, GridCardsIcon } from "../../common/Icons";
import { CoverCardPastYear } from "../Home/PastYear/CoverCardPastYear";
import PastYearCard from "../Home/PastYear/PastYearCard";

function TopSeries({
  data,
  currentPage,
  hasNextPage,
}: {
  data: anime[];
  currentPage: number;
  hasNextPage: boolean;
}) {
  const [bigCard, setBigCard] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 420) {
      setBigCard(true);
    }
  }, []);
  return (
    <main>
      <FlexIt warp='wrap' className=' gap-y-12 pt-[220px] gap-x-2 lg:gap-x-2'>
        <>
          <h1 className='w-full text-subHead mb-4 uppercase dark:text-blue-500'>
            Top Series
          </h1>
          <section className='w-full mt-2 mb-5 flex items-center gap-4'>
            <p
              onClick={() => setBigCard((pre) => !pre)}
              className={`h-12 w-12 p-4 rounded-md cursor-pointer dark:text-white ${
                bigCard && "bg-gray-300 dark:text-black"
              } text-black`}
            >
              <ListCardIcon />
            </p>
            <p
              onClick={() => setBigCard((pre) => !pre)}
              className={`w-12 h-12 p-4 rounded-md cursor-pointer text-black dark:text-white ${
                !bigCard && "bg-gray-300 dark:text-black "
              }`}
            >
              <GridCardsIcon />
            </p>
          </section>

          {data?.length > 0 && bigCard
            ? data?.map((e) => (
                <div className='w-full'>
                  <CoverCardPastYear anime1={e} />
                </div>
              ))
            : data?.map((e, i) => (
                <article
                  className='flex-grow min-w-[240px] w-1/6 max-w-[250px] md:max-w-[none] text-xs md:text-sm'
                  key={i + e.color + e.id + e.malId + "ldfjdlfjsd"}
                >
                  <PastYearCard data={e} />
                </article>
              ))}
        </>
      </FlexIt>
      <div className=' w-fit py-2 flex gap-3 items-center flex-row-reverse uppercase mt-10'>
        {currentPage >= 200 ? (
          <></>
        ) : (
          <Link
            href={`/top_series/${currentPage + 1}`}
            className='p-4 dark:bg-white text-white bg-black rounded-md dark:text-black'
          >
            Next
          </Link>
        )}
        {currentPage <= 200 ? (
          <div className='flex flex-row-reverse gap-3'>
            {currentPage + 2 <= 200 ? (
              <Link
                href={`/top_series/${currentPage + 1}`}
                className='p-4 dark:bg-white text-white bg-black rounded-md dark:text-black'
              >
                {currentPage + 1}
              </Link>
            ) : (
              <></>
            )}

            {currentPage + 3 <= 200 ? (
              <Link
                href={`/top_series/${currentPage + 2}`}
                className='p-4 dark:bg-white text-white bg-black rounded-md dark:text-black'
              >
                {currentPage + 2}
              </Link>
            ) : (
              <></>
            )}

            {currentPage + 4 <= 200 ? (
              <Link
                href={`/top_series/${currentPage + 3}`}
                className='p-4 dark:bg-white text-white bg-black rounded-md dark:text-black'
              >
                {currentPage + 3}
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {currentPage !== 1 ? (
          <Link
            href={`/top_series/${currentPage - 1 === 1 ? "" : currentPage - 1}`}
            className='p-4 dark:bg-white text-white bg-black rounded-md dark:text-black'
          >
            prev
          </Link>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}

export default TopSeries;
