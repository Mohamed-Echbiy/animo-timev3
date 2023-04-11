import dynamic from "next/dynamic";
import Head from "next/head";
import TopMovies from "../../src/components/top_movies/TopMovies";
import { anime } from "../../types/anime";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({
  data,
}: {
  data: { currentPage: number; results: [anime]; hasNextPage: boolean };
}) {
  const { results } = data;

  return (
    <div className='min-h-screen bg-slate-200 dark:bg-black'>
      <Head>
        <title>Top Movies on Animotime</title>
        <meta
          name='description'
          content="Discover the latest and greatest anime movies on Animotime. From action-packed adventures to heartwarming dramas, we've got it all. Watch the top movies with both Arabic and English subtitles and immerse yourself in the world of anime."
        />
        <meta
          name='keywords'
          content='anime movies, top anime movies, Arabic subtitles, English subtitles, action anime movies, drama anime movies'
        />
      </Head>
      <main className='max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2'>
        <Navbar />
        <TopMovies
          data={results}
          currentPage={data.currentPage}
          hasNextPage={data.hasNextPage}
        />
      </main>
    </div>
  );
}

export default index;
// const cache = new NodeCache({ stdTTL: 91800 * 5, checkperiod: 1200 });

export const getStaticProps = async () => {
  const [req] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_V3}advanced-search?perPage=20&format=MOVIE&sort=["SCORE_DESC"]`
    ),
  ]);
  const data = await req.json();

  return {
    props: {
      data,
    },
  };
};
