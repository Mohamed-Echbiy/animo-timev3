import { motion } from "framer-motion";
import Image from "next/image";
import Links from "./Links";
import SearchInput from "./SearchInput";
import User from "./User";

function Navbar() {
  return (
    <motion.nav
      className="navbar py-5 xl:py-0 flex justify-between items-center min-h-[96px]  gap-2 capitalize text-xs lg:text-base flex-wrap"
      initial={{ y: "-20vh" }}
      animate={{ y: 0 }}
    >
      <Image
        src="/logo.png"
        alt="animotime logo"
        width={150}
        height={64}
        className="rounded-xl xl:mr-20"
      />

      <div className="navbar_logo items-center flex-grow  hidden xl:flex">
        <Links />
      </div>
      <div className="navbar_search flex items-center gap-5 md:gap-10">
        <SearchInput />
        <User />
      </div>
      <div className="flex w-full navbar_logo justify-center items-center mt-5 flex-grow xl:hidden">
        <Links />
      </div>
    </motion.nav>
  );
}

export default Navbar;
