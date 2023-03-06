import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { userContext } from "../../pages/_app";
import { anime } from "../../types/anime";
import { CloseIcon, SearchIcon } from "./Icons";

const getPopular = async () => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}popular?perPage=4`);
  const res = await req.json();
  return res.results;
};

function SearchModel() {
  const [searchValue, setSearch] = useState<String>("");
  const { setSearchModel, isSearchModel } = useContext(userContext);
  const { data, isLoading, refetch } = useQuery("popular", getPopular, {});

  return (
    <AnimatePresence>
      {isSearchModel && (
        <motion.div
          className="searchModel overflow-hidden h-screen text-xs md:text-sm lg:text-base w-screen z-[1000] fixed top-0 left-0 bg-transparent flex justify-center items-center"
          initial={{ opacity: 0, y: "-100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "tween" }}
          exit={{ opacity: 0, y: "-100vh" }}
        >
          <div className="bg-gray-900 opacity-80 top-0 left-0 absolute w-full h-full z-[900]"></div>
          <div className="field min-w-[250px] w-2/6 py-10 min-h-[128px] bg-white opacity-100 z-[1200] rounded-lg flex items-center justify-center flex-col gap-2 relative px-2">
            <div className="relative max-w-[420px] w-full pr-6">
              <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-gray-900 border-solid h-10 rounded-sm px-2  w-full  block m-auto"
                placeholder="type here"
              />
              <span className=" absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer">
                <Link
                  href={`/search/${searchValue}`}
                  title={`search for ${searchValue}`}
                  onClick={() => setSearchModel(false)}
                >
                  <SearchIcon />
                </Link>
              </span>
            </div>
            <div className="previous_search flex justify-center gap-1 flex-wrap py-4">
              {!isLoading &&
                data.map((e: anime, i: number) => {
                  return (
                    <Link
                      href={`/detail/${e.id}`}
                      className={`anime_name text-xs p-1 md:p-2 relative after:absolute after:bottom-0 after:w-full after:left-0 after:h-[1px] after:bg-slate-700`}
                      key={i * 8998900000 + 1292686912}
                      onClick={() => setSearchModel(false)}
                    >
                      {e.title.userPreferred}
                    </Link>
                  );
                })}
            </div>
            <div
              className="close_Search_Modal cursor-pointer absolute top-2 right-2 text-secondary-600 "
              onClick={() => setSearchModel(false)}
            >
              <CloseIcon />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchModel;
