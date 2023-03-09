// import NodeCache from "node-cache";

//
import dynamic from "next/dynamic";
import Head from "next/head";
import TopMovies from "../../src/components/top_movies/TopMovies";
import { anime } from "../../types/anime";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({ data }: { data: { currentPage: number; results: [anime] } }) {
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
        <TopMovies data={results} />
      </main>
    </div>
  );
}

export default index;
// const cache = new NodeCache({ stdTTL: 91800 * 5, checkperiod: 1200 });

export const getStaticProps = async () => {
  // const cachedData = cache.get(context.req.url);
  // if (cachedData) {
  //   console.log("cachedData");
  //   return {
  //     props: cachedData,
  //   };
  // }
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=100&format=MOVIE&sort=["SCORE_DESC"]`
  );
  const data = await req.json();
  // cache.set(context.req.url, { data }, 91800 * 5);

  return {
    props: {
      data,
    },
  };
};
