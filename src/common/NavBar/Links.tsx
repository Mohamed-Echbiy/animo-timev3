import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HomeIcon, TvIcon, MovieIcon, RandomIcon } from "../Icons";

// tailwindcss variable
const after =
  " relative after:absolute after:left-1/2 after:bottom-0 after:w-full after:-translate-x-1/2 after:h-[2px] after:bg-secondary-600 text-black dark:text-white";
function Links() {
  const { pathname } = useRouter();
  const [randomId, setRandomId] = useState(0);
  useEffect(() => {
    const id = Math.floor(Math.random() * 1500);
    setRandomId(id);
  }, []);
  return (
    <ul className="navbar_links flex items-center gap-5 md:gap-10  justify-center text-gray-500 dark:text-slate-400">
      <li className="home_link ">
        <Link
          href="/"
          className={` flex items-center gap-2 py-2  ${
            pathname === "/" && after
          }`}
          title="go to home page"
          aria-label=" home page link"
        >
          <span>
            <HomeIcon />
          </span>
          <span className={`md:block ${pathname === "/" ? "block" : "hidden"}`}>
            Home
          </span>
        </Link>
      </li>
      <li className="top_category flex items-center justify-center gap-5 md:gap-10 ">
        <Link
          href="/top_series"
          className={` flex items-center justify-center gap-2 py-2 ${
            pathname === "/top_series" && after
          }`}
          title="go to tv series page"
          aria-label="tv series page link"
        >
          <span className="block w-6 h-6">
            <TvIcon />
          </span>
          <span
            className={` md:block ${
              pathname === "/top_series" ? "block" : "hidden"
            }`}
          >
            Top series
          </span>
        </Link>
        <Link
          href="/top_movies"
          className={` flex items-center gap-2 py-2 ${
            pathname === "/top_movies" && after
          }`}
          title="go to movies page"
          aria-label="movies page link"
        >
          <span>
            <MovieIcon />
          </span>
          <span
            className={` md:block ${
              pathname === "/top_movies" ? "block" : "hidden"
            }`}
          >
            Top Movies
          </span>
        </Link>
      </li>
      <li
        className={`random_link flex items-center gap-2 py-2 ${
          pathname === "random" && after
        }`}
        title="click to get a random anime"
        aria-label="get a random anime to watch"
      >
        <span>
          <RandomIcon />
        </span>
        <Link
          href={`/detail/${randomId}`}
          className={` md:block ${pathname === "/random" ? "block" : "hidden"}`}
        >
          random
        </Link>
      </li>
    </ul>
  );
}

export default Links;
