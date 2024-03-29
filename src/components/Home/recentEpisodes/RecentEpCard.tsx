import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { recent_episodes } from "../../../../types/recent_episodes";
import { PlayIcon, TvIcon } from "../../../common/Icons";
import ImageLoader from "../../../common/ImageLoader";
const Heart = dynamic(() => import("../../../common/NavBar/Heart"));

function RecentEpCard({ data }: { data: recent_episodes }) {
  const [loadImage, setLoadImage] = useState(false);

  return (
    <article className='recentCard aspect-[.7] relative min-w-[140px]  rounded-xl text-white shadow-primary shadow-gray-800 dark:shadow-none'>
      <Link
        href={`/detail/${data.id}`}
        title={`watch ${data.title.userPreferred}`}
      >
        {loadImage && (
          <div className='rating -translate-x-1/2 absolute -top-6 left-1/2 z-20 justify-center flex items-center  w-12 h-12 bg-primary-500 border-8 rounded-full border-slate-200 border-solid'>
            <span className='w-4 h-4 text-black'>
              <PlayIcon />
            </span>
          </div>
        )}
      </Link>
      <Link
        href={`/detail/${data.id}`}
        className='relative w-full h-full overflow-hidden block'
      >
        <Image
          src={data.image}
          alt={data.title.userPreferred}
          fill={true}
          className='rounded-xl hover:scale-110 hover:rotate-2 ease-linear transition-transform duration-200 object-contain'
          quality={20}
          sizes='(max-width: 768px) 50vw,
              (max-width: 995px) 33vw,
              25vw'
          onLoad={() => setLoadImage(true)}
        />
        {!loadImage ? <ImageLoader /> : <></>}
      </Link>

      <section className='absolute text-cardSm sm:text-xs xl:text-sm flex items-center flex-col justify-between p-1 md:p-4 z-10 h-fit w-full left-0 bottom-0 bg-gray-900 backdrop-blur-md bg-opacity-70'>
        <article className='anime-detail my-3'>
          <p className='anime_title mb-2'>
            {data.title.userPreferred.slice(0, 27)}
          </p>
          <p className='episode flex items-center gap-4'>
            <span className='block md:w-6 md:h-6 w-4 h-4 '>
              <TvIcon />
            </span>
            Ep: {data.episodeNumber}
          </p>
        </article>
      </section>
      <Heart data={data} />
    </article>
  );
}

export default RecentEpCard;
