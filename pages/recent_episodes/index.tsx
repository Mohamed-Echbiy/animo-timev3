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
        <title>Recent Episodes [animotime]</title>
        <meta
          name="description"
          content="Stay up-to-date with the latest anime episodes on Animotime. We update our library regularly with new episodes, so you never miss a beat. Watch recent episodes with both Arabic and English subtitles and be the first to know what happens next."
        />
        <meta
          name="keywords"
          content="anime episodes, latest anime episodes, Arabic subtitles, English subtitles, new episodes
"
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

export const getStaticProps = async (context: { req: { url: string } }) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_V}recent-episodes?perPage=20`
  );
  const data = await req.json();
  return {
    props: {
      data,
      revalidate: 86000,
    },
  };
};
