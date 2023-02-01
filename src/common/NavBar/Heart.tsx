import React, { useEffect, useState } from "react";
import { trending } from "../../../types/trending";
import { HeartFillIcon } from "../Icons";

function Heart({ data }: { data: trending }) {
  const [isItFill, setHeart] = useState<Boolean>(false);
  const [isUserIn, setIsUserIn] = useState<Boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("info")) {
      setIsUserIn(true);
    }
  }, [isUserIn]);

  return (
    <>
      {isUserIn && (
        <button
          className={`icon w-7 h-7 z-10 absolute top-3 right-3 hover:text-secondary-600  ${
            isItFill ? "text-secondary-500" : "opacity-70"
          }`}
          onClick={() => console.log("here")}
        >
          <span onClick={() => setHeart((pre) => !pre)}>
            <HeartFillIcon />
          </span>
        </button>
      )}
    </>
  );
}

export default Heart;
