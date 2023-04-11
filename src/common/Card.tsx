import Image from "next/image";
import FlexIt from "./FlexIt";
import { StarIconMini } from "./Icons";
import { trending } from "../../types/trending";
import Link from "next/link";
const Heart = dynamic(() => import("./NavBar/Heart"));
import { anime } from "../../types/anime";
import { useContext, useState } from "react";
import { userContext } from "../../pages/_app";
import dynamic from "next/dynamic";
import { relations } from "../../types/relations";
import ImageLoader from "./ImageLoader";

function Card({ data }: { data: trending | anime | relations }) {
  const { userIn } = useContext(userContext);
  const title: string =
    data.title.userPreferred.length > 27
      ? `${data.title.userPreferred.slice(0, 28)}...`
      : data.title.userPreferred;
  const genres: string[] | undefined =
    data.genres && data.genres?.length > 4
      ? data.genres?.slice(0, 4)
      : data.genres;
  // heath types an properties
  const hearth: {
    title: { userPreferred: string };
    id: string;
    image: string;
    rating: number;
  } = {
    title: {
      userPreferred: data.title.userPreferred,
    },
    id: data.id.toString(),
    image: data.image,
    rating: data.rating,
  };
  // image loading
  const [imgLoad, setImageLoad] = useState(false);
  return (
    <section className=' relative group min-w-[150px]  aspect-[.7]  flex-grow overflow-hidden rounded-xl text-xs lg:text-sm text-white shadow-primary dark:shadow-transparent dark:shadow-none   shadow-gray-500'>
      <Link href={`/detail/${data.id}`} title={data.title.userPreferred}>
        <Image
          src={data.image}
          alt={data.title.userPreferred}
          fill={true}
          sizes='(max-width: 768px) 50vw,
              (max-width: 995px) 33vw,
              25vw'
          priority={true}
          quality={20}
          onLoad={() => setImageLoad(true)}
          className='hover:scale-110 hover:rotate-2 transition-transform duration-200 ease-linear'
        />
        {!imgLoad ? <ImageLoader /> : <></>}
      </Link>
      <Heart data={hearth} />
      <article className='absolute transition-all duration-500 text-cardSm sm:text-xs xl:text-sm ease-in-out p-4 z-10 md:h-fit w-full left-0 -bottom-1  bg-gray-900 backdrop-blur-sm bg-opacity-80'>
        <FlexIt justify='between' items='center'>
          <p className='text-cardSm sm:text-xs lg:text-sm xl:text-base'>
            {title}
          </p>
          <p className='hidden xs:text-cardSm lg:text-sm md:flex items-center gap-2'>
            {(data.rating / 10).toPrecision(2)}
            <span className=' h-2 w-2 md:h-4 md:w-4 text-primary-400'>
              <StarIconMini />
            </span>
          </p>
        </FlexIt>
        {data.genres && data.genres.length && (
          <FlexIt
            justify='start'
            gap='4'
            className='mt-4 text-cardSm sm:text-xs lg:text-xs text-gray-300'
          >
            {genres?.slice(0, 2).map((e, i) => (
              <p key={i * 258109237.6}>{e}</p>
            ))}
          </FlexIt>
        )}
      </article>
    </section>
  );
}

export default Card;
