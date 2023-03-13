import React from "react";
import { trending } from "../../../types/trending";
import Card from "../../common/Card";
import FlexIt from "../../common/FlexIt";
import { TredningUp } from "../../common/Icons";

function Trending({ data }: { data: trending[] }) {
  return (
    <div>
      <FlexIt warp="wrap" className=" gap-y-12 pt-[220px]" gap="4">
        <>
          <h3 className="w-full text-subHead mb-4 uppercase flex items-center gap-2">
            Trending
            <span className="w-full h-full">
              <TredningUp />
            </span>
          </h3>
          {data.map((e) => (
            <div className="flex-grow min-w-[240px] w-1/6 max-w-[250px] md:max-w-[none] text-xs md:text-sm">
              <Card data={e} />
            </div>
          ))}
        </>
      </FlexIt>
    </div>
  );
}

export default Trending;
