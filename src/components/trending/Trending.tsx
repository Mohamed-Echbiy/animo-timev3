import React from "react";
import { trending } from "../../../types/trending";
import Card from "../../common/Card";
import FlexIt from "../../common/FlexIt";

function Trending({ data }: { data: [trending] }) {
  return (
    <div>
      <FlexIt warp="wrap" className=" gap-y-12 pt-[220px]" gap="4">
        <>
          <h3 className="w-full text-subHead mb-4 uppercase">Trending</h3>
          {data.map((e) => (
            <div className="flex-grow min-w-[150px] w-1/4 lg:w-1/5  max-w-[250px] lg:max-w-sm">
              <Card data={e} />
            </div>
          ))}
        </>
      </FlexIt>
    </div>
  );
}

export default Trending;
