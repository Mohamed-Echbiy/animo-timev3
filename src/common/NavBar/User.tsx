import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { app } from "../../../firebase/firebaseApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  AvatarIcon,
  ArrowDownIcon,
  GetHelpIcon,
  ArrowUpIcon,
  SettingIcon,
  HeartIcon,
  SignOutIcon,
  SignInIcon,
} from "../Icons";
import { userContext } from "../../../pages/_app";
import { useRouter } from "next/router";

function User() {
  const [isBarOpen, setBar] = useState<Boolean>(false);
  const { userIn, setIsUserIn } = useContext(userContext);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<string | null>(
    localStorage.getItem("info")
  );
  const user = userInfo ? JSON.parse(userInfo) : null;
  useEffect(() => {
    localStorage.getItem("info") && setIsUserIn(true);
  }, [userIn]);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const signIn = async () => {
    const sendReq = await signInWithPopup(auth, provider);
    const userObject: {
      name: string | null;
      image: string | null;
      id: string | null;
    } = {
      name: sendReq.user.displayName,
      image: sendReq.user.photoURL,
      id: sendReq.user.uid,
    };
    localStorage.setItem("info", JSON.stringify(userObject));
    setIsUserIn(true);
    router.push("/");
    window.location.reload();
  };
  const signOut = async () => {
    await auth.signOut();
    localStorage.clear();
    setIsUserIn(false);
    router.push("/");
  };

  console.log(user);
  return (
    <>
      {userIn ? (
        <div className="user flex items-center justify-center gap-4 p-2  bg-white rounded-md relative">
          <div className="user_avatar cursor-pointer text-primary-700">
            {user ? (
              <img
                src={user.image}
                alt="user photo"
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <AvatarIcon />
            )}
          </div>
          <div
            className="user_name cursor-pointer"
            onClick={() => setBar((pre) => !pre)}
          >
            {user ? user.name : "anonymous"}
          </div>
          <div
            className="icon cursor-pointer hover:text-secondary-700"
            onClick={() => setBar((pre) => !pre)}
          >
            {isBarOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
          {isBarOpen && (
            <div className="setting absolute z-50 bottom-[0%] translate-y-full py-3 px-2 left-0 w-full text-center flex flex-col gap-3 rounded items-start justify-center bg-white">
              <Link
                href={`/favorites/${
                  JSON.parse(localStorage.getItem("info")!).id
                }`}
                className="mt-2 flex items-center gap-2"
              >
                <span className="h-5 w-5">
                  <HeartIcon />
                </span>
                <span>My favourite</span>
              </Link>
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
              <li
                className="signOut flex items-center gap-2 justify-center cursor-pointer"
                onClick={signOut}
              >
                <span className="block h-5 w-5">
                  <SignOutIcon />
                </span>
                <span>SignOut</span>
              </li>
            </div>
          )}
        </div>
      ) : (
        <button
          className="signIn py-2 px-4 rounded-lg bg-primary-500 flex items-center gap-2"
          onClick={signIn}
        >
          <span className="block h-5 w-5">
            <SignInIcon />
          </span>
          <span>SignIn</span>
        </button>
      )}
    </>
  );
}

export default User;
