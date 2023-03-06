import { animeDetail } from "../../../types/animeDetail";
import { recommndation } from "../../../types/recomndation";
import PastYearCard from "../Home/PastYear/PastYearCard";

function Recommended({ data }: { data: animeDetail }) {
  console.log(data.recommendations);

  return (
    <>
      {data.recommendations.length ? (
        <>
          <h4 className="text-xl mb-4 w-full uppercase">recommanded</h4>
          <div className="recomnded w-3/4 flex items-center flex-grow flex-wrap gap-x-2 gap-y-10">
            {data.recommendations.slice(0, 8).map((e: recommndation, i) => (
              <div
                className="flex-grow min-w-[150px] w-1/4 lg:w-1/5  max-w-[250px] lg:max-w-xs  rounded-xl"
                key={e.id + i + "uuu"}
              >
                <PastYearCard data={e} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Recommended;
