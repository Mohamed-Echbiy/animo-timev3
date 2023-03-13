import { anime } from "../../../types/anime";
import FlexIt from "../../common/FlexIt";
import PastYearCard from "../Home/PastYear/PastYearCard";

function TopSeries({ data }: { data: anime[] }) {
  return (
    <div>
      <FlexIt warp="wrap" className=" gap-y-12 pt-[220px] gap-x-2 lg:gap-x-2">
        <>
          <h3 className="w-full text-subHead mb-4 uppercase">Top Series</h3>
          {data.map((e) => (
            <div className="flex-grow min-w-[240px] w-1/6 max-w-[250px] md:max-w-[none] text-xs md:text-sm">
              <PastYearCard data={e} />
            </div>
          ))}
        </>
      </FlexIt>
    </div>
  );
}

export default TopSeries;
