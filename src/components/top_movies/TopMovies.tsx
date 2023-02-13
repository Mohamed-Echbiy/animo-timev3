import { anime } from "../../../types/anime";
import FlexIt from "../../common/FlexIt";
import PastYearCard from "../Home/PastYear/PastYearCard";

function TopMovies({ data }: { data: [anime] }) {
  return (
    <div>
      <FlexIt warp="wrap" className=" gap-y-12 pt-[220px]" gap="4">
        <>
          <h3 className="w-full text-subHead mb-4 uppercase">Top Movies</h3>
          {data.map((e) => (
            <div className="flex-grow min-w-[150px] w-1/4 lg:w-1/5  max-w-[250px] lg:max-w-sm">
              <PastYearCard data={e} />
            </div>
          ))}
        </>
      </FlexIt>
    </div>
  );
}

export default TopMovies;
