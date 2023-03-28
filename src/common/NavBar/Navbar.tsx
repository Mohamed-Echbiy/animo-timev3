import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Links from "./Links";
import SearchInput from "./SearchInput";
import User from "./User";
import { useTheme } from "next-themes";
import DarkModeSwitcher from "../../common/DarkModeSwitcher";

function Navbar() {
  const [window, setWindow] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (window !== undefined) {
      setWindow(true);
    }
  }, []);

  return (
    <>
      <motion.header
        className="navbar fixed w-full px-1 pl-1 z-50 bg-slate-200 dark:bg-black dark:text-slate-200 top-0 left-0 py-5 xl:py-0 flex justify-center items-center min-h-[96px]  gap-2 capitalize text-xs lg:text-base "
        initial={{ y: "-20vh" }}
        animate={{ y: 0 }}
      >
        <nav className="flex w-full h-full justify-between  max-w-8xl items-center flex-wrap  gap-2">
          {theme === "light" ? (
            <img
              src="/logo.png"
              alt="animotime logo"
              className="rounded-xl  xl:mr-20 w-14 md:w-24 xl:w-32"
              width={"auto"}
              height={"auto"}
              sizes="56px , (min-width: 720px){
               width:  96px
              }"
            />
          ) : (
            <img
              src="/logoDark.png"
              alt="animotime logo"
              width={"auto"}
              height={"auto"}
              className="rounded-xl  xl:mr-20 w-14 md:w-24 xl:w-32"
              sizes="56px , (min-width: 720px){
               width:  96px
              }"
            />
          )}
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
        </nav>
      </motion.header>
      {window && <DarkModeSwitcher />}
    </>
  );
}

export default Navbar;
