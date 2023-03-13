import NodeCache from "node-cache";
//
import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import Character from "../../src/components/DetailPage/Character";
import Hero from "../../src/components/DetailPage/Hero";
import SidebarRealted from "../../src/components/DetailPage/SidebarRealted";
import { animeDetail } from "../../types/animeDetail";
const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const Recommended = dynamic(
  () => import("../../src/components/DetailPage/Recommended")
);
const Episodes = dynamic(
  () => import("../../src/components/DetailPage/Episodes")
);

function index({ data }: { data: animeDetail }) {
  console.log(data.title);
  return (
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>AnimoTime</title>
        <meta
          name="description"
          content="animo time a website to watch your favorite anime online without any ads"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative overflow-hidden min-h-screen">
        <Navbar />
        <LazyMotion features={domAnimation}>
          <m.div
            className=" heroSection pt-[220px] md:pt-[158px] gap-2 flex-wrap flex items-center justify-center md:justify-start"
            initial={{ opacity: 0, x: "-100wv" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Hero data={data} />
            <Character data={data} />
            <main className="two_side_container flex w-full flex-wrap gap-3 mb-10">
              <Recommended data={data} />
              <SidebarRealted data={data} />
              <Episodes data={data} />
            </main>
          </m.div>
        </LazyMotion>
      </main>
    </div>
  );
}

export default index;

const cache = new NodeCache({ stdTTL: 86400 * 5, checkperiod: 1200 });

export const getServerSideProps = async (context: {
  req: { url: string };
  params: { id: string };
}) => {
  const cachedData = cache.get(context.req.url);
  if (cachedData) {
    console.log("cachedData");
    return {
      props: cachedData,
    };
  }
  const { params } = context;
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}info/${params.id}`);
  const res = await req.json();
  cache.set(context.req.url, { data: res }, 86400 * 5);
  return {
    props: {
      data: res,
    },
  };
};
