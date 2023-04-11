import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { favorite } from "../../../types/favorites";
import FlexIt from "../../common/FlexIt";
import { StarIconMini } from "../../common/Icons";
import Heart from "../../common/NavBar/Heart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function FavoriteCard({ data }: { data: favorite }) {
  const title =
    typeof data.title === typeof "string"
      ? data.title
      : data.title.userPreferred;
  const [show, setShow] = useState(true);
  const [imgLoading, setImgLoading] = useState(false);
  return (
    <>
      {show && (
        <div className='flex-grow min-w-[150px] w-1/4 md:w-1/5 sm:flex-grow max-w-[204px] md:max-w-[242px] lg:max-w-[261px] xl:max-w-[356px]'>
          <div
            className={`relative group min-w-[150px]  aspect-[.7] overflow-hidden rounded-xl text-xs lg:text-sm text-white shadow-primary shadow-gray-500`}
          >
            <Link href={`/detail/${data.id}`} title={`${title}`}>
              <Image
                src={data.image}
                alt={`${title}`}
                fill={true}
                sizes='(max-width: 768px) 50vw,
              (max-width: 995px) 33vw,
              25vw'
                priority={true}
                onLoad={() => setImgLoading(true)}
                className='hover:scale-110 hover:rotate-2 ease-linear transition-transform duration-200'
              />
            </Link>
            {!imgLoading && (
              <Skeleton
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  display: "block",
                  zIndex: "300000",
                }}
                containerClassName='absolute w-full h-full'
              />
            )}
            <Heart data={data} setShow={setShow} />
            <div className='absolute transition-all duration-500 text-cardSm sm:text-xs xl:text-sm ease-in-out p-4 z-10 md:h-fit w-full left-0 -bottom-1  bg-gray-900 backdrop-blur-sm bg-opacity-80'>
              <FlexIt justify='between' items='center'>
                <span>{`${title}`}</span>
                <p className='hidden md:flex items-center gap-2'>
                  {(data.rating / 10).toPrecision(2)}
                  <span className='h-4 w-4 text-primary-400'>
                    <StarIconMini />
                  </span>
                </p>
              </FlexIt>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FavoriteCard;
