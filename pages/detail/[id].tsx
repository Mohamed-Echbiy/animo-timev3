//
import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import React from "react";
//

import { animeDetail } from "../../types/animeDetail";
// import Hero from "../../src/components/DetailPage/Hero";
const Hero = dynamic(() => import("../../src/components/DetailPage/Hero"));
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
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>{(title || "animotime") + ` --animotime`}</title>
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
  //
  const [reqPop, reqPop2, reqPop3, reqPop4, reqPop5, reqPop6, reqPop7] =
    await Promise.all([
      fetch(
        `https://animotime-api-3.vercel.app/meta/anilist/advanced-search?perPage=100`
      ),
      fetch(
        `https://animotime-api-3.vercel.app/meta/anilist/advanced-search?perPage=100&page=2`
      ),
      fetch(
        `https://animotime-api-3.vercel.app/meta/anilist/advanced-search?perPage=100&page=3`
      ),
      fetch(`${process.env.NEXT_PUBLIC_API}advanced-search?perPage=49&page=4`),
      fetch(
        `https://animotime-api-3.vercel.app/meta/anilist/advanced-search?perPage=100&page=4`
      ),
      fetch(
        `https://animotime-api-3.vercel.app/meta/anilist/advanced-search?perPage=100&page=5`
      ),
      fetch(
        `https://animotime-api-3.vercel.app/meta/anilist/advanced-search?perPage=100&page=6`
      ),
    ]);
  const resPop = await reqPop.json();
  const resPop2 = await reqPop2.json();
  const resPop3 = await reqPop3.json();
  const resPop4 = await reqPop4.json();
  const resPop5 = await reqPop5.json();
  const resPop6 = await reqPop6.json();
  const resPop7 = await reqPop7.json();
  const data = [
    ...resPop.results,
    ...resPop2.results,
    ...resPop3.results,
    ...resPop4.results,
    ...resPop5.results,
    ...resPop6.results,
    ...resPop7.results,
  ];
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

  async function backupFetch() {
    console.error("########## the backupfc fired #######");

    const req = await fetch(
      `https://api.consumet.org/meta/anilist/info/${params.id}`
    );
    console.log(res.status, "fireeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee----->>>>");
    const response = await req.json();
    return response;
  }

  const res = await fetch(`${url}info/${params.id}`);
  console.log(res.status);
  const data = res.status === 200 ? await res.json() : await backupFetch();

  // Pass post data to the page via props
  return { props: { data }, revalidate: 86400 };
}
