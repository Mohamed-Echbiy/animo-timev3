import dynamic from "next/dynamic";
import Head from "next/head";
import TopMovies from "../../src/components/top_movies/TopMovies";
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
        <title>Top Movies [animotime]</title>
        <meta
          name="description"
          content="Discover the latest and greatest anime movies on Animotime. From action-packed adventures to heartwarming dramas, we've got it all. Watch the top movies with both Arabic and English subtitles and immerse yourself in the world of anime."
        />
        <meta
          name="keywords"
          content="anime movies, top anime movies, Arabic subtitles, English subtitles, action anime movies, drama anime movies"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2">
        <Navbar />
        <TopMovies data={AllData} />
      </main>
    </div>
  );
}

export default index;
// const cache = new NodeCache({ stdTTL: 91800 * 5, checkperiod: 1200 });

export const getStaticProps = async () => {
  const [req, req1] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=100&format=MOVIE&sort=["SCORE_DESC"]`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API}advanced-search?perPage=100&paeg=2&format=MOVIE&sort=["SCORE_DESC"]`
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
