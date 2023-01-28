import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../src/common/NavBar/Navbar";
import HeroSection from "../src/components/Home/HeroSection";
import RecentEpisodes from "../src/components/RecentEpisodes";
import { recent_episodes } from "../types/recent_episodes";
import { trending } from "../types/trending";

const Home = ({
  data,
  dataEp,
}: {
  data: [trending];
  dataEp: [recent_episodes];
}) => {
  console.log(data);
  return (
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>AnimoTime</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9">
        <Navbar />
        <HeroSection data={data} />
        <RecentEpisodes data={dataEp} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const req = await fetch(`${process.env.API}trending?perPage=4`);
  const res = await req.json();
  const data = await res.results;
  const reqEp = await fetch(`${process.env.API}recent-episodes?perPage=3`);
  const resEp = await reqEp.json();
  const dataEp = await resEp.results;
  return {
    props: {
      data,
      dataEp,
    },
  };
  revalidate: 43200;
};
