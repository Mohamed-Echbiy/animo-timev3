import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { userContext } from "../../../pages/_app";
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

interface data {
  data: trending | anime | recent_episodes | favorite;
  setShow?: Dispatch<SetStateAction<boolean>> | undefined;
}

function Heart({ data, setShow }: data) {
  const { pathname } = useRouter();
  const [isItFill, setHeart] = useState<Boolean>(false);
  const [isUserIn, setIsUserIn] = useState<Boolean>(false);
  const [typeOfFavorite, setTypeFavorite] = useState<String>("plan to watch");
  const { setSpinner, setToast } = useContext(userContext);
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
    return <></>;
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
      setSpinner(true);
      await removeFavorite(body);
      if (pathname === "/favorites/[id]") {
        setShow(false);
        console.log("show");
      } else {
        setHeart((pre) => !pre);
        console.log("heart");
      }
      setSpinner(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
    }
    if (!isItFill) {
      setSpinner(true);
      await addToFavorites(info);
      if (pathname === "/favorites/[id]") {
        setShow(false);
      } else {
        setHeart((pre) => !pre);
      }
      await setSpinner(false);
      await setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
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
