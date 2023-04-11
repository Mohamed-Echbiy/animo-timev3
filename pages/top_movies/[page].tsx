import Head from "next/head";
import React from "react";
import Navbar from "../../src/common/NavBar/Navbar";
import TopMovies from "../../src/components/top_movies/TopMovies";
import { anime } from "../../types/anime";

function page({
  data,
}: {
  data: { currentPage: number; results: [anime]; hasNextPage: boolean };
}) {
  console.log(data.currentPage, data);
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
          data={data.results}
          currentPage={data.currentPage}
          hasNextPage={data.hasNextPage}
        />
      </main>
    </div>
  );
}

export default page;

export const getStaticPaths = async () => {
  const paths = [
    { params: { page: "2" } },
    { params: { page: "3" } },
    { params: { page: "4" } },
    { params: { page: "5" } },
    { params: { page: "6" } },
    { params: { page: "7" } },
  ];
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({
  params,
}: {
  params: { page: string };
}) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_V3}advanced-search?perPage=10&format=MOVIE&page=${params.page}`
  );
  console.log(req.status, req.statusText);

  const data = await req.json();
  console.log(data.results.length);
  return {
    props: {
      data,
    },
  };
};
