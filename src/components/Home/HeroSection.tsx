import Card from "../../common/Card";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { trending } from "../../../types/trending";
import FlexIt from "../../common/FlexIt";
import Link from "next/link";

function HeroSection({ data }: { data: [trending] }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.main
        className="heroSection pt-[158px] pb-4"
        initial={{ opacity: 0, x: "-100wv" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="w-full mb-4 flex justify-between items-center">
          <h2 className=" text-subHead  uppercase">Trending</h2>
          <Link href={"/trending"} className="text-gray-600 text-xs md:text-sm">
            show more {`->>`}
          </Link>
        </div>

        <FlexIt warp="wrap" className="py-10">
          {data.map((e: trending) => (
            <div
              className="flex-grow w-[45%] lg:w-[20%]"
              key={`${e.malId}hdfhqohzedsqdbjsq`}
            >
              <Card data={e} />
            </div>
          ))}
        </FlexIt>
      </m.main>
    </LazyMotion>
  );
}

export default HeroSection;
