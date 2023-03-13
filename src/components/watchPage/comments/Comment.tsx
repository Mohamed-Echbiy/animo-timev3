import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../pages/_app";
import { commentSchema } from "../../../../types/commentSchema";
import { AvatarIcon, ThumbUpIcon, TrashIcon } from "../../../common/Icons";

function Comment({ data }: { data: commentSchema }) {
  const [user, setUser] = useState<any>("");
  const [colorThumb, setColorThumb] = useState(false);
  const [addOne, setAddOne] = useState(0);
  const { setToast } = useContext(userContext);
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("info")) {
        setUser(localStorage.getItem("info"));
        const storage = localStorage.getItem("info");
        const userInfo = storage ? JSON.parse(storage) : { id: "undefiend" };
        const dataUser = data.reactions.like.filter(
          (e) => e.id === userInfo.id
        );
        setColorThumb(!!dataUser.length);
      }
    }
  }, []);
  // console.log(user);
  const userData = user ? JSON.parse(user) : "";

  // delete fc
  const handelDelete = async () => {
    const sendReq = await fetch(
      `https://animotime.onrender.com/api/comments/${data._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await sendReq.json();
    await setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 5000);
    window.location.reload();
  };
  const handelLike = async () => {
    const sendReq = await fetch(
      `https://animotime.onrender.com/api/comments/reaction/${data._id}?user=${
        userData.id
      }&type=${`like`}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await sendReq.json();
    // console.log(response);
    await setToast(true);
    setColorThumb((pre) => !pre);
    setAddOne((pre) => (pre === 0 ? 1 : 0));
    setTimeout(() => {
      setToast(false);
    }, 5000);
  };
  return (
    <>
      <div className={`flex flex-col gap-y-4 rounded-lg bg-white py-4 px-5 `}>
        <div className="name_avatar flex items-center gap-3">
          <AvatarIcon />
          <p>{data.by.userName}</p>
        </div>
        <div
          className={`comment_text px-3 ${
            data.comment.length > 30 && "text-xs"
          }`}
        >
          {data.comment}
        </div>
        <div className="flex justify-between items-center">
          <div className="like relative w-fit ml-3 flex items-center gap-2">
            <span
              className={`w-4 h-4 cursor-pointer ${
                colorThumb && "text-cyan-700"
              }`}
              onClick={handelLike}
            >
              <ThumbUpIcon />
            </span>
            <p className="text-sm font-bold">
              {data.reactions.like.length + addOne}
            </p>
          </div>
          <div className=" cursor-pointer" onClick={handelDelete}>
            {userData.id === data.by.id && <TrashIcon />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
