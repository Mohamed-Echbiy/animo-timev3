import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, Dispatch, SetStateAction, useState } from "react";
//
export const userContext = createContext<
  | {
      userIn: Boolean;
      setIsUserIn: Dispatch<SetStateAction<Boolean>>;
    }
  | Boolean
  | any
>(false);
//
function MyApp({ Component, pageProps }: AppProps) {
  const [userIn, setIsUserIn] = useState<Boolean>(false);
  return (
    <userContext.Provider value={{ userIn, setIsUserIn }}>
      <Component {...pageProps} />
    </userContext.Provider>
  );
}

export default MyApp;
