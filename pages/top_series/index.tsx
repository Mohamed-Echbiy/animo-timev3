import NodeCache from "node-cache";

//
import dynamic from "next/dynamic";
import Head from "next/head";
import TopSeries from "../../src/components/top_series/TopSeries";
import { anime } from "../../types/anime";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({
  data,
}: {
  data: { currentPage: number; results: [anime]; hasNextPage: boolean };
}) {
  return (
    <div className='min-h-screen bg-slate-200 dark:bg-black'>
      <Head>
        <title>Top Series on Animotime</title>
        <meta
          name='description'
          content="Follow your favorite anime series on Animotime. We offer a wide range of series with both Arabic and English subtitles, so you can enjoy the latest episodes as soon as they're released. Join our anime community and discuss the top series with other fans."
        />
        <meta
          name='keywords'
          content='anime series, top anime series, Arabic subtitles, English subtitles, latest episodes, anime community'
        />
      </Head>
      <main className='max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2'>
        <Navbar />
        <TopSeries
          data={data.results}
          currentPage={data.currentPage}
          hasNextPage={data.hasNextPage}
        />
      </main>
    </div>
  );
}

export default index;
const cache = new NodeCache({ stdTTL: 91800 * 5, checkperiod: 1200 });

export const getStaticProps = async (context: { req: { url: string } }) => {
  const [req] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_V2}advanced-search?perPage=20&format=TV&sort=["SCORE_DESC"]`
    ),
  ]);
  const data = await req.json();

  return {
    props: {
      data,
    },
  };
};
