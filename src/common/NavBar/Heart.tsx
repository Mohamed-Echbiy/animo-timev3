import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { anime } from "../../../types/anime";
import { favorite } from "../../../types/favorites";
import { recent_episodes } from "../../../types/recent_episodes";
import { trending } from "../../../types/trending";
import { addToFavorites } from "../../functions/addFavorite";
import { removeFavorite } from "../../functions/removeFavorite";
import { HeartFillIcon } from "../Icons";

//

// fc to call user favorites

const fetchFavourite = async () => {
  const id = JSON.parse(localStorage.getItem("info")!).id;
  // id of the user
  const req = await fetch(`https://animotime.onrender.com/api/favorites/${id}`);
  const res = await req.json();
  return res.data;
};

//

function Heart({
  data,
}: {
  data: trending | anime | recent_episodes | favorite;
}) {
  const [isItFill, setHeart] = useState<Boolean>(false);
  const [isUserIn, setIsUserIn] = useState<Boolean>(false);
  const [typeOfFavorite, setTypeFavorite] = useState<String>("plan to watch");
  //

  const { data: favorites, isLoading } = useQuery(
    ["fetchFavorite"],
    fetchFavourite
  );

  //
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("info")) {
      setIsUserIn(true);
      const isItExists = favorites
        ? favorites.find((e: { id: string }) => e.id === data.id)
        : null;
      // check if the anime is exists in the favorites
      setHeart(!!isItExists);
      // if anime exists the heart icon will be filled
    }
  }, [isUserIn, isLoading]);

  //

  //

  if (isLoading) {
    // tell I create Loading component
    return <>bobo</>;
  }

  //

  const addOrRemoveFavorite = async () => {
    const body = {
      by: JSON.parse(localStorage.getItem("info")!).id,
      id: data.id,
    };
    // this are params that used to define document and remove it

    const info = {
      by: JSON.parse(localStorage.getItem("info")!).id,
      id: data.id,
      title: data.title.userPreferred,
      image: data.image,
      rating: data.rating,
      type: typeOfFavorite,
      genres: data.genres,
    };
    // this used to add document

    if (isItFill) {
      await removeFavorite(body);
      setHeart(false);
    }
    if (!isItFill) {
      await addToFavorites(info);
      setHeart(true);
    }
  };

  //

  return (
    <>
      {isUserIn && (
        <button
          className={`icon w-5 h-5 md:w-7 md:h-7 z-10 absolute top-3 right-3 hover:text-secondary-600  ${
            isItFill ? "text-secondary-500" : "text-white"
          }`}
          onClick={addOrRemoveFavorite}
        >
          <span>
            <HeartFillIcon />
          </span>
        </button>
      )}
    </>
  );
}

export default Heart;
