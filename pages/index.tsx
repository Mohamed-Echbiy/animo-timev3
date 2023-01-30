import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../src/common/NavBar/Navbar";
import HeroSection from "../src/components/Home/HeroSection";
import RecentEpisodes from "../src/components/Home/recentEpisodes/RecentEpisodes";
import PastYear from "../src/components/Home/PastYear/PastYear";
import { anime } from "../types/anime";
import { recent_episodes } from "../types/recent_episodes";
import { trending } from "../types/trending";
import Upcoming from "../src/components/Home/Upcoming/Upcoming";

const Home = ({
  data,
  dataEp,
  dataPastYear,
  dataUpcoming,
}: {
  data: [trending];
  dataEp: [recent_episodes];
  dataPastYear: [anime];
  dataUpcoming: [anime];
}) => {
  return (
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>AnimoTime</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative">
        <Navbar />
        <HeroSection data={data} />
        <RecentEpisodes data={dataEp} />
        <PastYear data={dataPastYear} />
        <Upcoming data={dataUpcoming} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const req = await fetch(`${process.env.API}trending?perPage=4`);
  const res = await req.json();
  const data = await res.results;
  const reqEp = await fetch(`${process.env.API}recent-episodes?perPage=9`);
  const resEp = await reqEp.json();
  const dataEp = await resEp.results;
  const reqPastYear = await fetch(
    `${process.env.API}advanced-search?year=2022&perPage=4`
  );
  const resPastYear = await reqPastYear.json();
  const dataPastYear = await resPastYear.results;
  const reqUpcoming = await fetch(
    `${process.env.API}advanced-search?status=NOT_YET_RELEASED&perPage=14`
  );
  const resUpcoming = await reqUpcoming.json();
  const dataUpcoming = await resUpcoming.results;

  return {
    props: {
      data,
      dataEp,
      dataPastYear,
      dataUpcoming,
    },
    revalidate: 43200,
  };
};
