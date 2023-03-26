//
import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import React from "react";
//

import { animeDetail } from "../../types/animeDetail";
import Hero from "../../src/components/DetailPage/Hero";
// const Hero = dynamic(() => import("../../src/components/DetailPage/Hero"));
const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const TabSwitcher = dynamic(
  () => import("../../src/components/DetailPage/TabSwitcher")
);

function index({ data }: { data: animeDetail }) {
  // console.log(data);
  const title = data.title?.userPreferred
    ? data.title?.userPreferred
    : data.title?.english;
  const synonyms: string = !!data?.synonyms ? data.synonyms.join(",") : title;

  return (
    <div className=" min-h-screen bg-slate-200 dark:bg-black">
      <Head>
        <title>{(title || "Animotime") + ` Animotime`}</title>
        <meta
          name="description"
          content={`watch ${title} with Arabic and English subtitles: Catch up on ${title} on Animotime. Follow the characters, as they continue their journey in this epic anime. Discover recommended anime to watch and join our anime community to share your thoughts on ${title}.`}
        />
        <meta
          name="keywords"
          content={
            synonyms +
            ` watch ${title} , animotime ${title}, discuss ${title} on animotime`
          }
        />
        <Script
          data-cfasync="false"
          src="//dlh8c15zw7vfn.cloudfront.net/?zchld=981396"
        />
        <Script
          data-cfasync="false"
          src="//dlh8c15zw7vfn.cloudfront.net/?zchld=981397"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative overflow-hidden min-h-screen">
        <Navbar />
        <LazyMotion features={domAnimation}>
          <m.main
            className=" heroSection pt-[220px] md:pt-[178px] gap-2 flex-wrap flex items-center justify-center md:justify-start"
            initial={{ opacity: 0, x: "-100wv" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Hero data={data} />
            <TabSwitcher data={data} />
          </m.main>
        </LazyMotion>
      </main>
    </div>
  );
}

export default index;

export const getStaticPaths = async () => {
  //reqPop2, reqPop3
  const [reqPop, reqPop2] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=100&format=TV`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=100&page=2&format=TV`
    ),
    // fetch(`${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=100&page=3`),
  ]);
  const resPop = await reqPop.json();
  const resPop2 = await reqPop2.json();
  // const resPop3 = await reqPop3.json();

  //...resPop2.results, ...resPop3.results
  const slliceData = resPop2.results;
  const data = [...resPop.results, ...slliceData];
  const paths = data.map((animeId: { id: string }) => {
    return { params: { id: animeId.id } };
  });
  console.log(paths);
  return { paths, fallback: "blocking" };
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const url = Number.isInteger(+params.id / 2)
    ? `${process.env.NEXT_PUBLIC_API_V2}`
    : `${process.env.NEXT_PUBLIC_API_V3}`;

  try {
    const res = await fetch(`${url}info/${params.id}`);
    console.log(res.status);
    const data = await res.json();
    return { props: { data }, revalidate: 86400 };
  } catch (error) {
    console.log(error);
    try {
      const req = await fetch(
        `https://api.consumet.org/meta/anilist/info/${params.id}`
      );
      console.log(req.status);
      const data = await req.json();
      return { props: { data }, revalidate: 86400 };
    } catch (error) {
      console.log(error);
    }
  }
  // Pass post data to the page via props
}
// revalidate: 86400;
// revalidate: 86400;
