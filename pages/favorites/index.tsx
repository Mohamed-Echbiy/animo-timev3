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
import Favorites from "../../src/components/favouriteSection/Favorites";
//

//
function index() {
  const [seeNav, setShowNav] = useState(false);
  //
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowNav(true);
    }
  }, []); //

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
          {seeNav && <Favorites />}
        </motion.div>
      </main>
    </div>
  );
}

export default index;

//
//
