import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Links from "./Links";
import SearchInput from "./SearchInput";
import User from "./User";

function Navbar() {
  //  const { isSearchModel } = useContext(userContext);
  const [window, setWindow] = useState(false);
  useEffect(() => {
    if (window !== undefined) {
      setWindow(true);
    }
  }, []);

  return (
    <motion.nav
      className="navbar fixed w-full px-1 pl-1 z-50 bg-slate-200 top-0 left-0 py-5 xl:py-0 flex justify-center items-center min-h-[96px]  gap-2 capitalize text-xs lg:text-base "
      initial={{ y: "-20vh" }}
      animate={{ y: 0 }}
    >
      {/* <LoadingLink loadingState={loadingState} /> */}
      <div className="flex w-full h-full justify-between  max-w-8xl items-center flex-wrap  gap-2">
        <img
          src="/logo.png"
          alt="animotime logo"
          className="rounded-xl  xl:mr-20 w-14 md:w-24 xl:w-32"
        />

        <div className="navbar_logo items-center flex-grow  hidden xl:flex">
          <Links />
        </div>
        <div className="navbar_search flex items-center gap-5 md:gap-10 ">
          <SearchInput />
          {window && <User />}
        </div>
        <div className="flex w-full navbar_logo justify-center items-center mt-5 flex-grow xl:hidden">
          <Links />
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
