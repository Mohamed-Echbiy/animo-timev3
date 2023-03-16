import NodeCache from "node-cache";

//
import dynamic from "next/dynamic";
import Head from "next/head";
import TopSeries from "../../src/components/top_series/TopSeries";
import { anime } from "../../types/anime";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({
  data,
  data1,
}: {
  data: { currentPage: number; results: [anime] };
  data1: { currentPage: number; results: [anime] };
}) {
  const { results } = data;
  const { results: results1 } = data1;
  const AllData = [...results, ...results1];
  return (
    <div className="min-h-screen bg-slate-200">
      <Head>
        <title>Top Series [animotime]</title>
        <meta
          name="description"
          content="Follow your favorite anime series on Animotime. We offer a wide range of series with both Arabic and English subtitles, so you can enjoy the latest episodes as soon as they're released. Join our anime community and discuss the top series with other fans."
        />
        <meta
          name="keywords"
          content="anime series, top anime series, Arabic subtitles, English subtitles, latest episodes, anime community"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2">
        <Navbar />
        <TopSeries data={AllData} />
      </main>
    </div>
  );
}

export default index;
const cache = new NodeCache({ stdTTL: 91800 * 5, checkperiod: 1200 });

export const getStaticProps = async (context: { req: { url: string } }) => {
  const [req, req1] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=100&format=TV&sort=["SCORE_DESC"]`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API}advanced-search?perPage=100&page=2&format=TV&sort=["SCORE_DESC"]`
    ),
  ]);
  const data = await req.json();
  const data1 = await req1.json();
  return {
    props: {
      data,
      data1,
    },
  };
};
