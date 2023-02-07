import React, { useContext } from "react";
import { useQuery } from "react-query";
import { userContext } from "../../../pages/_app";
import { favorite } from "../../../types/favorites";
import FavoriteCard from "./FavoriteCard";

function Favorites() {
  const { isSpinner } = useContext(userContext);
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
    <div>
      {data.map((e: favorite) => (
        <div
          className={`min-w-[150px] w-1/4 md:w-1/5 sm:flex-grow max-w-[204px] md:max-w-[242px] lg:max-w-[261px] xl:max-w-[356px]`}
          key={e.id + e._id + e.by}
        >
          <FavoriteCard data={e} />
        </div>
      ))}
    </div>
  );
}

export default Favorites;
