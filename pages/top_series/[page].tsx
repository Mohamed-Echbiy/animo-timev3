import Head from "next/head";
import React from "react";
import Navbar from "../../src/common/NavBar/Navbar";
import TopSeries from "../../src/components/top_series/TopSeries";
import { anime } from "../../types/anime";

function Page({
  data,
}: {
  data: { currentPage: number; results: [anime]; hasNextPage: boolean };
}) {
  return (
    <div className="min-h-screen bg-slate-200">
      <Head>
        <title>Top Series [animotime]</title>
        <meta
          name="description"
          content="Follow your favorite anime series on Animotime. We offer a wide range of series with both Arabic and English subtitles, so you can enjoy the latest episodes as soon as they're released. Join our anime community and discuss the top series with other fans."
        />
        <meta
          name="keywords"
          content="anime series, top anime series, Arabic subtitles, English subtitles, latest episodes, anime community"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2">
        <Navbar />
        <TopSeries
          data={data.results}
          hasNextPage={data.hasNextPage}
          currentPage={data.currentPage}
        />
      </main>
    </div>
  );
}

export default Page;
export const getStaticPaths = async () => {
  const paths = [
    { params: { page: "2" } },
    { params: { page: "3" } },
    { params: { page: "4" } },
    { params: { page: "5" } },
    { params: { page: "6" } },
    { params: { page: "7" } },
    { params: { page: "8" } },
    { params: { page: "9" } },
    { params: { page: "10" } },
    { params: { page: "11" } },
  ];
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({
  params,
}: {
  params: { page: string };
}) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=20&format=TV&sort=["SCORE_DESC"]&page=${params.page}`
  );
  const data = await req.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
