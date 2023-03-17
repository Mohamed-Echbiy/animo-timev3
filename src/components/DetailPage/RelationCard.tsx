import Image from "next/image";
import Link from "next/link";
import React from "react";
import { relations } from "../../../types/relations";

function RelationCard({ data }: { data: relations }) {
  return (
    <Link
      href={`/detail/${data.id}`}
      className="relative aspect-[.7] min-w-[150px] max-w-[250px] flex-grow border-8 border-gray-900 border-solid "
    >
      <Image
        src={data.image}
        alt={data.title.userPreferred || "anime cover"}
        fill
        className=""
      />
    </Link>
  );
}

export default RelationCard;
