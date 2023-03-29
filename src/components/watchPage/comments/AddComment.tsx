import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../pages/_app";

function AddComment({ animeEpId }: { animeEpId: string }) {
  const [commentText, setComment] = useState("");
  const [user, setUser] = useState<any>("");
  const { setToast } = useContext(userContext);
  const router = useRouter();
  const parseUser = user ? JSON.parse(user) : "";
  // console.log(parseUser);
  useEffect(() => {
    if (window !== undefined) {
      if (localStorage.getItem("info")) {
        setUser(localStorage.getItem("info"));
      }
    }
  }, []);
  const handelSubmit = async () => {
    const commentbody = commentText;
    const body = {
      by: { userName: parseUser.name, id: parseUser.id },
      comment: commentbody,
      animeEpId,
      reactions: {
        dislike: [],
        like: [],
      },
    };
    console.log(body, "the body");
    const sendReq = await fetch(`https://animotime.onrender.com/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await sendReq.json();
    await setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 5000);
    window.location.reload();
  };
  return (
    <>
      {user ? (
        <div className="flex  items-center justify-center shadow-lg  mb-4 max-w-lg">
          <div className="w-full bg-white dark:bg-gray-900 rounded-lg px-4 pt-6 pb-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 dark:text-slate-200 shadow-sm shadow-gray-300 dark:shadow-black text-lg">
                Add a new comment
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none "
                  name="body"
                  placeholder="Type Your Comment"
                  required
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full  flex items-start  px-3">
              <div className="w-full justify-end flex">
                <button
                  onClick={handelSubmit}
                  className="bg-blue-500 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-blue-800 hover:rotate-1 mb-2 cursor-pointer"
                >
                  post comment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AddComment;
