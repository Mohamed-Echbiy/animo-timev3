import { motion } from "framer-motion";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Card from "../../src/common/Card";
import FavoriteCard from "../../src/common/FavoriteCard";
import Navbar from "../../src/common/NavBar/Navbar";
import { favorite } from "../../types/favorites";

function index({ favorites }: { favorites: favorite[] }) {
  const [seeNav, setShowNav] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowNav(true);
    }
  }, []);
  // console.log(favorites);

  return (
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>AnimoTime</title>
        <meta
          name="description"
          content="animo time a website to watch your favorite anime online without any ads"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative">
        {seeNav && <Navbar />}
        <motion.div
          className=" heroSection pt-[220px] md:pt-[158px] gap-2 flex-wrap flex items-center justify-center md:justify-start"
          initial={{ opacity: 0, x: "-100wv" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {favorites.map((e: favorite, i: number) => (
            <div
              className={`min-w-[150px] w-1/4 md:w-1/5 sm:flex-grow max-w-[204px] md:max-w-[242px] lg:max-w-[261px] xl:max-w-[356px]`}
              key={e.id + e._id + e.by}
            >
              <FavoriteCard data={e} />
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

export default index;

//
//

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const { params } = context;
  const req = await fetch(
    `https://animotime.onrender.com/api/favorites/${params.id}`
  );
  const res = await req.json();
  const favorites = res.data;
  return {
    props: {
      favorites,
    },
  };
};
