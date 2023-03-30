import React, { useContext, useState } from "react";
import { userContext } from "../../../../pages/_app";
import { AvatarIcon } from "../../../common/Icons";
import { reviewDetail } from "./Reviews";

function ReviewCard({ data }: { data: reviewDetail }) {
  const { setModal, modal } = useContext(userContext);
  return (
    <div
      className={`container ease-linear duration-500 transition-all flex-grow min-w-[320px] w-1/4 shadow-primary shadow-black flex flex-col  max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 dark:bg-gray-900 dark:text-gray-100`}
    >
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <div className="user_avatar cursor-pointer text-primary-700 dark:text-primary-400 text-xs flex items-center h-full">
            <AvatarIcon />
          </div>
          <div>
            <h6 className="font-bold">{data.user.username}</h6>
            {data.is_spoiler ? (
              <span className="text-secondary-500 text-xs uppercase">
                spoiler
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 dark:text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 fill-current"
          >
            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
          </svg>
          <span className="text-xl font-bold">{data.score} / 10</span>
        </div>
      </div>
      <div className="p-4 space-y-2 text-base dark:text-gray-400">
        <p>
          {data.review.length > 200
            ? `${data.review.slice(0, 200)}...`
            : data.review}
        </p>
      </div>
      <div className="w-full flex justify-end mt-6">
        {data.review.length > 200 && (
          <button
            className="p-3  bg-blue-800 hover:dark:rotate-2 hover:bg-blue-500 rounded-md text-sm ease-linear transition-all duration-500"
            onClick={() =>
              setModal((pre: string) => (!!pre ? "" : data.review))
            }
          >
            show more !
          </button>
        )}
      </div>
      {/* <div className="ratings mt-4 flex gap-2 text-xs">
        <span className="p-1 dark:bg-black bg-slate-200">
          😕 {data.reactions.confusing}
        </span>
        <span className="p-1 dark:bg-black bg-slate-200">
          🎨 {data.reactions.creative}
        </span>
        <span className="p-1 dark:bg-black bg-slate-200">
          🤣 {data.reactions.funny}
        </span>
        <span className="p-1 dark:bg-black bg-slate-200">
          💡 {data.reactions.informative}
        </span>
        <span className="p-1 dark:bg-black bg-slate-200">
          💘 {data.reactions.love_it}
        </span>
        <span className="p-1 dark:bg-black bg-slate-200">
          👍 {data.reactions.nice}
        </span>
        <span className="p-1 dark:bg-black bg-slate-200">
          ✍️ {data.reactions.well_written}
        </span>
      </div> */}
    </div>
  );
}

export default ReviewCard;
