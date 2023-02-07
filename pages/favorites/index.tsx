import { motion } from "framer-motion";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../src/common/Card";
import FavoriteCard from "../../src/components/favouriteSection/FavoriteCard";
import Navbar from "../../src/common/NavBar/Navbar";
import { favorite } from "../../types/favorites";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { userContext } from "../_app";
//

//
function index() {
  const [seeNav, setShowNav] = useState(false);
  const { isSpinner } = useContext(userContext);
  //
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowNav(true);
    }
  }, []); //

  const fetchFavorite = async () => {
    const req = await fetch(
      `https://animotime.onrender.com/api/favorites/${
        JSON.parse(localStorage.getItem("info")!).id
      }`
    );
    const res = await req.json();
    return res.data;
  };
  //
  const { data, isLoading } = useQuery(["favorite", isSpinner], fetchFavorite);
  //
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span>loading ...</span>
      </div>
    );
  }
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
          <h3 className="text-subHead uppercase w-full mb-12">My Favorites</h3>
          {data.map((e: favorite, i: number) => (
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
