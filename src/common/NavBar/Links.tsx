import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HomeIcon, TvIcon, MovieIcon, RandomIcon } from "../Icons";

// tailwindcss variable
const after =
  " after:absolute after:left-1/2 after:bottom-0 after:w-full after:-translate-x-1/2 after:h-[2px] after:bg-secondary-600 text-black";

function Links() {
  const { pathname } = useRouter();
  return (
    <ul className="navbar_links flex items-center gap-5 md:gap-10  justify-center text-gray-500">
      <li className="home_link ">
        <Link
          href="/"
          className={` flex items-center gap-2 py-2 relative ${
            pathname === "/" && after
          }`}
        >
          <span>
            <HomeIcon />
          </span>
          <span className={`md:block ${pathname === "/" ? "block" : "hidden"}`}>
            Home
          </span>
        </Link>
      </li>
      <li className="top_category flex items-center justify-center gap-5 md:gap-10">
        <Link
          href="/top_series"
          className={` flex items-center justify-center gap-2 py-2 ${
            pathname === "/top_series" && after
          }`}
        >
          <span>
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
      >
        <span>
          <RandomIcon />
        </span>
        <Link
          href="/random"
          className={` md:block ${pathname === "/random" ? "block" : "hidden"}`}
        >
          random
        </Link>
      </li>
    </ul>
  );
}

export default Links;
