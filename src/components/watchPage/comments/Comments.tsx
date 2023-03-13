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

  return (
    <>
      {user ? (
        <AddComment animeEpId={animeEpId} />
      ) : (
        <div className="comment_section  pt-12 pl-3">
          <div className="flex w-full items-center gap-3 flex-wrap h-24 justify-center">
            <h2 className="uppercase self-start">
              no comment yet sign in and be the first
            </h2>
            <div className=" relative w-12 h-12">
              <Image fill src={"/nothing_yet.png"} alt="image" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Comments;
