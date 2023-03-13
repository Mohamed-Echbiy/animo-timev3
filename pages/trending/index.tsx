// import NodeCache from "node-cache";

//
import dynamic from "next/dynamic";
import Head from "next/head";
import TopSeries from "../../src/components/top_series/TopSeries";
import Trending from "../../src/components/trending/Trending";
import { anime } from "../../types/anime";
import { trending } from "../../types/trending";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({
  data,
  data1,
}: {
  data: { currentPage: number; results: [trending] };
  data1: { currentPage: number; results: [trending] };
}) {
  const { results } = data;
  const { results: results1 } = data1;
  const AllData = [...results, ...results1];
  // console.log(AllData);
  return (
    <div className="min-h-screen bg-slate-200">
      <Head>
        <title>AnimoTime</title>
        <meta
          name="description"
          content="animo time a website to watch your favorite anime online without any ads"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2">
        <Navbar />
        <Trending data={AllData} />
      </main>
    </div>
  );
}

export default index;

// const cache = new NodeCache({ stdTTL: 91800 * 5, checkperiod: 1200 });

export const getStaticProps = async (context: { req: { url: string } }) => {
  // const cachedData = cache.get(context.req.url);
  // if (cachedData) {
  //   console.log("cachedData");
  //   return {
  //     props: cachedData,
  //   };
  // }
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_V}trending?perPage=50`
  );
  const data = await req.json();

  const req1 = await fetch(
    `${process.env.NEXT_PUBLIC_API}trending?page=2&perPage=50`
  );
  const data1 = await req1.json();
  // cache.set(context.req.url, { data }, 1800 * 5);

  return {
    props: {
      data,
      data1,
    },
  };
};
