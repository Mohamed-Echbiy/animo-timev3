import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { userContext } from "../../../pages/_app";
import { favorite } from "../../../types/favorites";
import FlexIt from "../../common/FlexIt";
import FavoriteCard from "./FavoriteCard";

function Favorites({ data }: { data: favorite[] }) {
  const { isSpinner } = useContext(userContext);
  return (
    <FlexIt warp="wrap" className="w-full">
      {data.map((e: favorite) => (
        <FavoriteCard data={e} key={e.id + e._id + e.by} />
      ))}
    </FlexIt>
  );
}

export default Favorites;
