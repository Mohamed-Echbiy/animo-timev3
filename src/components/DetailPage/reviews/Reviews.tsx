import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../../common/Loading";
import ReviewCard from "./ReviewCard";

export interface reviewDetail {
  is_preliminary: string;
  is_spoiler: string;
  reactions: {
    confusing: number;
    creative: number;
    funny: number;
    informative: number;
    love_it: number;
    nice: number;
    overall: number;
    well_written: number;
  };
  review: string;
  score: number;
  tags: string[];
  type: string;
  user: {
    username: string;
  };
}

function Reviews({ malId }: { malId: number }) {
  const fetchReviews = async () => {
    const req = await fetch(`https://api.jikan.moe/v4/anime/${malId}/reviews`);
    const data = await req.json();
    return data.data;
  };
  const { data, isLoading } = useQuery(["fetchReviews", malId], fetchReviews);

  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <section className='flex flex-wrap items-center gap-2 gap-y-4 mt-12'>
      {data.map((e: reviewDetail) => {
        if (e.type === "anime") {
          return <ReviewCard data={e} key={e.is_preliminary + e.review} />;
        } else {
          return <></>;
        }
      })}
    </section>
  );
}

export default Reviews;
