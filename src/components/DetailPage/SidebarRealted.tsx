import React from "react";
import { animeDetail } from "../../../types/animeDetail";
import Card from "../../common/Card";
import RelationCard from "./RelationCard";

function SidebarRealted({ data }: { data: animeDetail }) {
  const excludeTypeManga = data.relations
    ?.filter((notManga) => notManga?.type !== "MANGA")
    .sort((p1, p2) =>
      p1.rating < p2.rating ? 1 : p1.rating > p2.rating ? -1 : 0
    );
  return (
    <div className=" w-full flex gap-3 gap-y-5 overflow-hidden  justify-center items-center flex-wrap h-fit  p-2 rounded-xl mt-12">
      {!!excludeTypeManga.length ? (
        <>
          {excludeTypeManga.map((e, i) => (
            <div
              className="flex-grow w-2/5 md:w-1/4 xl:w-[15%] max-w-[200px] md:max-w-[280px] min-w-[150px] text-xs"
              key={e.id + i + "ppppppp8889862168478233310" + "fsdfsfskdfhsk"}
            >
              <Card data={e} />
            </div>
          ))}
        </>
      ) : (
        <div className="w-full h-36 flex items-center justify-center">
          <p>
            No realted anime associeted with{" "}
            {data.title?.romaji || data.title?.userPreferred}
          </p>
        </div>
      )}
    </div>
  );
}

export default SidebarRealted;
