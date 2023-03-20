import Image from "next/image";
import { animeDetail } from "../../../types/animeDetail";
import { recommndation } from "../../../types/recomndation";
import PastYearCard from "../Home/PastYear/PastYearCard";

function Recommended({ data }: { data: animeDetail }) {
  // console.log(data.recommendations);

  return (
    <>
      {data.recommendations.length ? (
        <>
          <div className="recomnded justify-center w-full flex items-center flex-grow flex-wrap gap-x-2 gap-y-10 pt-10">
            {data.recommendations.map((e: recommndation, i) => (
              <div
                className="flex-grow w-2/5 md:w-1/4 xl:w-1/6 max-w-[200px] md:max-w-[280px] min-w-[150px]"
                key={e.id + i + "uuu"}
              >
                <PastYearCard data={e} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className=" justify-center flex items-center capitalize flex-grow w-2/4 gap-3">
          <p>there are no recommanded anime associted with this anime</p>
          <div className="relative w-1/2 max-w-[120px] aspect-square">
            <Image
              src="/natuto_error.png"
              alt="crying face"
              fill
              quality={30}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Recommended;
