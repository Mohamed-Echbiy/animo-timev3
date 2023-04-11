import Image from "next/image";
import Link from "next/link";
import React from "react";
import { relations } from "../../../types/relations";

function RelationCard({ data }: { data: relations }) {
  // console.log(data);
  return (
    <Link
      href={`/detail/${data.id}`}
      className=' group relative aspect-[.7] rounded-xl overflow-hidden flex-grow w-2/5 md:w-1/4 xl:w-[15%] max-w-[200px] md:max-w-[280px] min-w-[150px]'
    >
      <Image
        src={data.image}
        alt={"anime cover"}
        fill
        sizes='250px'
        className='hover:scale-110 hover:rotate-2 ease-linear transition-transform duration-200'
        quality={30}
      />
      <div className='detail left-0 group-hover:h-full transition-all ease-linear duration-300 absolute  w-full h-0 bg-black text-cardSm md:text-xs overflow-hidden'>
        <div className='w-full h-full overflow-hidden'>
          <h4 className='title'>
            {data.title?.userPreferred || data?.title?.romaji}
          </h4>
          <p className='relation_type'>data.type</p>
          <p className='rating'>data.rating</p>
          <p className='status'>data.status</p>
          <p className=''>data.</p>
        </div>
      </div>
    </Link>
  );
}

export default RelationCard;
