//
import Head from "next/head";
import HeroSection from "../src/components/Home/HeroSection";
import { anime } from "../types/anime";
import { recent_episodes } from "../types/recent_episodes";
import { trending } from "../types/trending";
import dynamic from "next/dynamic";
import { client } from "../lib/client";
import { downloadLinks } from "../types/downloadData";

// import PastYear from "../src/components/Home/PastYear/PastYear";

// import Upcoming from "../src/components/Home/Upcoming/Upcoming";
const RecentEpisodes = dynamic(
  () => import("../src/components/Home/recentEpisodes/RecentEpisodes")
);
const Navbar = dynamic(() => import("../src/common/NavBar/Navbar"));
const Upcoming = dynamic(
  () => import("../src/components/Home/Upcoming/Upcoming")
);
const PastYear = dynamic(
  () => import("../src/components/Home/PastYear/PastYear")
);
const DownloadEpContainer = dynamic(
  () => import("../src/components/Home/DownloadEp/DownloadEpContainer")
);
const Home = ({
  data,
  dataEp,
  dataPastYear,
  popularData,
  dData,
}: {
  data: [trending];
  dataEp: [recent_episodes];
  dataPastYear: [anime];
  popularData: [anime];
  dData: { allPromo: downloadLinks[] };
}) => {
  // useEffect(() => {
  //   const asynCFecth = async () => {
  //     const req = await client.fetch(`*[_type == "promo" ]{allPromo}[0]`);
  //     const res = await req;
  //     console.log(res, "from the client");
  //   };
  //   asynCFecth();
  // }, []);
  const { allPromo } = dData;
  // console.log(allPromo, "bananaannanananan");
  return (
    <div className=' min-h-screen bg-slate-200 dark:bg-black '>
      <Head>
        <title>AnimoTime - watch anime episodes</title>
        <link rel='icon' href='./logo.png' />
        <meta
          name='description'
          content="Welcome to Animotime, your go-to destination for the latest anime content. Explore our vast library of anime with English subtitles. From classic shows to the hottest new releases, we've got you covered. Watch your favorite episodes and connect with other anime fans from around the world. Start your anime journey today with Animotime."
        />
        <meta
          name='keywords'
          content='anime, Animotime, anime website, watch anime, free anime watching website ,anime episodes, 9 anime , gogo anime ,anime community, anime fans, naruto , one piece , pokemon ,anime streaming, classic anime, new anime releases, anime library, popular anime, animotime'
        />
        <meta name='robots' content='all' />
        <meta
          name='a.validate.02'
          content='IubGGNc1SxteGPGOOPOdFAmGP81l4iAgqeZF'
        />
      </Head>
      <main className=' max-w-8xl m-auto  px-2 md:px-5 lg:px-7 xl:px-9 relative'>
        <Navbar />
        <HeroSection data={data} />
        <Upcoming data={popularData} />
        <RecentEpisodes data={dataEp} />
        <PastYear data={dataPastYear} />
        <DownloadEpContainer data={allPromo} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const [reqPop, req, reqEp, reqPastYear, reqClient] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API}advanced-search?status=NOT_YET_RELEASED`
    ),
    fetch(`${process.env.NEXT_PUBLIC_API}trending?perPage=10`),
    fetch(`${process.env.NEXT_PUBLIC_API}recent-episodes?perPage=10`),
    fetch(`${process.env.NEXT_PUBLIC_API}advanced-search?year=2020&perPage=8`),
    client.fetch(`*[_type == "promo" ]{allPromo}[0]`),
  ]);

  const res = await req.json();
  const data = await res.results;
  //
  const resEp = await reqEp.json();
  const dataEp = await resEp.results;
  //
  const resPastYear = await reqPastYear.json();
  const dataPastYear = await resPastYear.results;
  //
  const resPop = await reqPop.json();
  const popularData = await resPop.results;
  const resDown = await reqClient;
  console.log(reqClient);
  //

  return {
    props: {
      data,
      dataEp,
      dataPastYear,
      popularData,
      dData: resDown,
    },
    revalidate: 5000,
  };
};
