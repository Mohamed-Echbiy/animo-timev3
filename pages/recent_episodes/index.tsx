// import NodeCache from "node-cache";
//
import dynamic from "next/dynamic";
import Head from "next/head";
import RecentEpisodes from "../../src/components/recent-episodes/RecentEpisodes";
import { recent_episodes } from "../../types/recent_episodes";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({
  data,
}: {
  data: { currentPage: number; results: [recent_episodes] };
}) {
  const { results } = data;

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
        <RecentEpisodes data={results} />
      </main>
    </div>
  );
}

export default index;

// const cache = new NodeCache({ stdTTL: 1000 * 5, checkperiod: 1200 });

export const getStaticProps = async (context: { req: { url: string } }) => {
  // const cachedData = cache.get(context.req.url);
  // if (cachedData) {
  //   console.log("cachedData");
  //   return {
  //     props: cachedData,
  //   };
  // }
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_V}recent-episodes?perPage=34`
  );
  const data = await req.json();
  // cache.set(context.req.url, { data }, 1000 * 5);
  return {
    props: {
      data,
      revalidate: 2000 * 10,
    },
  };
};
