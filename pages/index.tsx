//
import Head from "next/head";
import HeroSection from "../src/components/Home/HeroSection";
import { anime } from "../types/anime";
import { recent_episodes } from "../types/recent_episodes";
import { trending } from "../types/trending";
import dynamic from "next/dynamic";

import PastYear from "../src/components/Home/PastYear/PastYear";
import RecentEpisodes from "../src/components/Home/recentEpisodes/RecentEpisodes";

const Navbar = dynamic(() => import("../src/common/NavBar/Navbar"));
const Home = ({
  data,
  dataEp,
  dataPastYear,
}: // response_Q,
{
  data: [trending];
  dataEp: [recent_episodes];
  dataPastYear: [anime];
}) => {
  // console.log(response_Q);
  return (
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>AnimoTime</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Welcome to Animotime, your go-to destination for the latest anime content. Explore our vast library of anime with both Arabic and English subtitles. From classic shows to the hottest new releases, we've got you covered. Watch your favorite episodes and connect with other anime fans from around the world. Start your anime journey today with Animotime."
        />
        <meta
          name="keywords"
          content="anime, Animotime, anime website, watch anime, anime episodes, anime community, anime fans, anime streaming, classic anime, new anime releases, anime library, popular anime"
        />
      </Head>
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative">
        <Navbar />
        <HeroSection data={data} />
        <RecentEpisodes data={dataEp} />
        <PastYear data={dataPastYear} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const [req, reqEp] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API}trending?perPage=4`),
    fetch(`${process.env.NEXT_PUBLIC_API}recent-episodes?perPage=10`),
  ]);

  const reqPastYear = await fetch(
    `https://api.consumet.org/meta/anilist/advanced-search?year=2020&perPage=8`
  );
  const res = await req.json();
  const data = await res.results;

  const resEp = await reqEp.json();
  const dataEp = await resEp.results;

  const resPastYear = await reqPastYear.json();
  const dataPastYear = await resPastYear.results;

  return {
    props: {
      data,
      dataEp,
      dataPastYear,
    },
  };
};
