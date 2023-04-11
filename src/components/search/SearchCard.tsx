import { anime } from "../../../types/anime";
import FlexIt from "../../common/FlexIt";
import PastYearCard from "../Home/PastYear/PastYearCard";

function SearchCard({
  data,
  searchedFor,
}: {
  data: [anime];
  searchedFor: string;
}) {
  return (
    <div>
      <FlexIt warp='wrap' className=' gap-y-12 pt-[220px] ' gap='4'>
        <>
          <h3 className='w-full text-subHead mb-4 uppercase flex items-center gap-3'>
            <span className='text-sm'>you searched for : </span> " {searchedFor}{" "}
            "
          </h3>
          {data.map((e, i) => (
            <div
              className='flex-grow min-w-[240px] w-1/6 max-w-[280px] text-xs md:text-sm '
              key={i * 12 + "''''''" + "ooppoopp"}
            >
              <PastYearCard data={e} />
            </div>
          ))}
        </>
      </FlexIt>
    </div>
  );
}
export default SearchCard;
