import React from "react";
import { animeDetail } from "../../../types/animeDetail";
import RelationCard from "./RelationCard";

function SidebarRealted({ data }: { data: animeDetail }) {
  return (
    <div className=" w-full lg:w-1/5 min-w-[320px] flex gap-2 justify-center items-center flex-wrap h-fit  p-2 rounded-xl">
      <h4 className="mb-4 text-xl uppercase w-full text-center mt-2">
        Realted anime
      </h4>
      {data.relations.slice(0, 2).map((e) => (
        <RelationCard data={e} />
      ))}
    </div>
  );
}

export default SidebarRealted;
