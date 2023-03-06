import dynamic from "next/dynamic";
import Head from "next/head";
import RecentEpisodes from "../../src/components/recent-episodes/RecentEpisodes";
import TopSeries from "../../src/components/top_series/TopSeries";
import { anime } from "../../types/anime";
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

export const getServerSideProps = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API}recent-episodes?perPage=34`
  );
  const data = await req.json();

  return {
    props: {
      data,
    },
  };
};
