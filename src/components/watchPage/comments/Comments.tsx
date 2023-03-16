import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../pages/_app";
import { commentSchema } from "../../../../types/commentSchema";
import AddComment from "./AddComment";
import CommentContainer from "./CommentContainer";

function Comments({
  data,
  animeEpId,
}: {
  data: { data: commentSchema[] };
  animeEpId: string;
}) {
  const [commentText, setComment] = useState(
    "this anime have a high potentiel"
  );

  const [user, setUser] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      if (localStorage.getItem("info")) {
        setUser(localStorage.getItem("info"));
      }
    }
  }, [user]);

  // console.log(data);
  if (data) {
    return (
      <>
        <div className="">
          <CommentContainer data={data} animeEpId={animeEpId} />
        </div>
      </>
    );
  }

  return <>{user ? <AddComment animeEpId={animeEpId} /> : <></>}</>;
}

export default Comments;
