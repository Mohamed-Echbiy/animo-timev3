import Image from "next/image";
import FlexIt from "./FlexIt";
import { StarIconMini } from "./Icons";
import { trending } from "../../types/trending";
import Link from "next/link";
// import Heart from "./NavBar/Heart";
import { anime } from "../../types/anime";
import { useContext } from "react";
import { userContext } from "../../pages/_app";

function Card({ data }: { data: trending | anime }) {
  const { userIn } = useContext(userContext);
  const title: string =
    data.title.userPreferred.length > 27
      ? `${data.title.userPreferred.slice(0, 28)}...`
      : data.title.userPreferred;
  const genres: string[] =
    data.genres.length > 4 ? data.genres.slice(0, 4) : data.genres;
  // Conditionally import the Heart component if userIn is true
  const Heart = userIn ? require("./NavBar/Heart").default : null;
  return (
    <div className=" relative group min-w-[150px]  aspect-[.7]  flex-grow overflow-hidden rounded-xl text-xs lg:text-sm text-white shadow-primary shadow-gray-500">
      <Link href={`/detail/${data.id}`} title={data.title.userPreferred}>
        <Image
          src={data.image}
          alt={data.title.userPreferred}
          fill={true}
          sizes="(max-width: 768px) 50vw,
              (max-width: 995px) 33vw,
              25vw"
          priority={true}
          quality={20}
        />
      </Link>
      {Heart && <Heart data={data} />}
      <div className="absolute transition-all duration-500 text-cardSm sm:text-xs xl:text-sm ease-in-out p-4 z-10 md:h-fit w-full left-0 -bottom-1  bg-gray-900 backdrop-blur-sm bg-opacity-80">
        <FlexIt justify="between" items="center">
          <span>{title}</span>
          <p className="hidden md:flex items-center gap-2">
            {(data.rating / 10).toPrecision(2)}
            <span className="h-4 w-4 text-primary-400">
              <StarIconMini />
            </span>
          </p>
        </FlexIt>
        <FlexIt justify="start" gap="4" className="mt-4 text-gray-300">
          {genres.slice(0, 3).map((e, i) => (
            <span key={i * 258109237.6}>{e}</span>
          ))}
        </FlexIt>
      </div>
    </div>
  );
}

export default Card;
