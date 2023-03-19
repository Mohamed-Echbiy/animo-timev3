//
import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
//
const Character = dynamic(
  () => import("../../src/components/DetailPage/Character")
);

const SidebarRealted = dynamic(
  () => import("../../src/components/DetailPage/SidebarRealted")
);
import { animeDetail } from "../../types/animeDetail";
import Hero from "../../src/components/DetailPage/Hero";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const Recommended = dynamic(
  () => import("../../src/components/DetailPage/Recommended")
);
const Episodes = dynamic(
  () => import("../../src/components/DetailPage/Episodes")
);

function index({ data }: { data: animeDetail; title: string }) {
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
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative overflow-hidden min-h-screen">
        <Navbar />
        <LazyMotion features={domAnimation}>
          <m.main
            className=" heroSection pt-[220px] md:pt-[158px] gap-2 flex-wrap flex items-center justify-center md:justify-start"
            initial={{ opacity: 0, x: "-100wv" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Hero data={data} />
            <Character data={data} />
            <section className="two_side_container flex w-full flex-wrap gap-3 mb-10">
              <Recommended data={data} />
              <SidebarRealted data={data} />
              <Episodes data={data} />
            </section>
          </m.main>
        </LazyMotion>
      </main>
    </div>
  );
}

export default index;

// export const getServerSideProps = async (context: {
//   req: { url: string };
//   params: { id: string };
// }) => {
//   const cachedData = cache.get(context.req.url);
//   if (cachedData) {
//     console.log("cachedData");
//     return {
//       props: cachedData,
//     };
//   }
//   const { params } = context;
//   const req = await fetch(`${process.env.NEXT_PUBLIC_API_V}info/${params.id}`);
//   const res = await req.json();
//   cache.set(context.req.url, { data: res }, 86400 * 5);
//   return {
//     props: {
//       data: res,
//     },
//   };
// };

export const getStaticPaths = async () => {
  const [reqPop, reqPop2, reqPop3, reqPop4, reqPop5] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API}advanced-search?perPage=49`),
    fetch(`${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=49&page=2`),
    fetch(`${process.env.NEXT_PUBLIC_API}advanced-search?perPage=49&page=3`),
    fetch(`${process.env.NEXT_PUBLIC_API_V}advanced-search?perPage=49&page=4`),
    fetch(`${process.env.NEXT_PUBLIC_API_}advanced-search?perPage=49&page=5`),
  ]);
  const resPop = await reqPop.json();
  const resPop2 = await reqPop2.json();
  const resPop3 = await reqPop3.json();
  const resPop4 = await reqPop4.json();
  const resPop5 = await reqPop5.json();

  const data = [
    ...resPop.results,
    ...resPop2.results,
    ...resPop3.results,
    ...resPop4.results,
    ...resPop5.results,
  ];
  const paths = data.map((animeId: { id: string }) => {
    return { params: { id: animeId.id } };
  });
  console.log(paths);
  return { paths, fallback: "blocking" };
};
export async function getStaticProps({ params }: { params: { id: string } }) {
  // console.log(params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}info/${params.id}`);
  const data = await res.json();

  // Pass post data to the page via props
  return { props: { data }, revalidate: 86400 };
}
