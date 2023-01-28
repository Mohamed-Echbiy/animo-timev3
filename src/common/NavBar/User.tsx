import Link from "next/link";
import React, { useState } from "react";
import {
  AvatarIcon,
  ArrowDownIcon,
  GetHelpIcon,
  ArrowUpIcon,
  SettingIcon,
  HeartIcon,
} from "../Icons";

function User() {
  const [isBarOpen, setBar] = useState<Boolean>(false);
  return (
    <div className="user flex items-center justify-center gap-4 p-2  bg-white rounded-md relative">
      <div className="user_avatar cursor-pointer text-primary-700">
        <AvatarIcon />
      </div>
      <div
        className="user_name cursor-pointer"
        onClick={() => setBar((pre) => !pre)}
      >
        Sobina
      </div>
      <div
        className="icon cursor-pointer hover:text-secondary-700"
        onClick={() => setBar((pre) => !pre)}
      >
        {isBarOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      {isBarOpen && (
        <div className="setting absolute z-50 bottom-[0%] translate-y-full py-3 px-2 left-0 w-full text-center flex flex-col gap-3 rounded items-start justify-center bg-white">
          <li className="mt-2 flex items-center gap-2">
            <span className="h-5 w-5">
              <HeartIcon />
            </span>
            <span>My favourite</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-5 w-5">
              <SettingIcon />
            </span>
            <span>Setting</span>
          </li>
          <li className="flex items-center gap-2 justify-center">
            <span className=" block h-5 w-5">
              <GetHelpIcon />
            </span>
            <span>
              <Link href="/help">Help</Link>
            </span>
          </li>
        </div>
      )}
    </div>
  );
}

export default User;
