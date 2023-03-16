import Card from "../../common/Card";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { trending } from "../../../types/trending";
import FlexIt from "../../common/FlexIt";
import Link from "next/link";
import { TredningUp } from "../../common/Icons";

function HeroSection({ data }: { data: [trending] }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.main
        className="heroSection pt-[158px] pb-4"
        initial={{ opacity: 0, x: "-100wv" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <section className="w-full mb-4 flex justify-between items-center">
          <h1 className=" text-subHead uppercase flex items-center gap-3">
            Trending{" "}
            <span>
              <TredningUp />
            </span>
          </h1>
          <Link href={"/trending"} className="text-gray-600 text-xs md:text-sm">
            show more {`->>`}
          </Link>
        </section>

        <FlexIt warp="wrap" className="py-10">
          {data.map((e: trending) => (
            <article
              className="flex-grow w-[45%] max-w-sm lg:max-w-sm lg:w-[20%]"
              key={`${e.malId}hdfhqohzedsqdbjsq`}
            >
              <Card data={e} />
            </article>
          ))}
        </FlexIt>
      </m.main>
    </LazyMotion>
  );
}

export default HeroSection;
