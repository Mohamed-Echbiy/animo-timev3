import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingLink from "../src/common/LoadingLink";
import SearchModel from "../src/common/SearchModel";
import Spinner from "../src/common/Spinner";
import Toast from "../src/common/Toast";
//
export const userContext = createContext<
  | {
      userIn: Boolean;
      setIsUserIn: Dispatch<SetStateAction<Boolean>>;
    }
  | Boolean
  | any
>(false);
const queryClient = new QueryClient();
//
function MyApp({ Component, pageProps }: AppProps) {
  const [userIn, setIsUserIn] = useState<Boolean>(false);
  const [isSearchModel, setSearchModel] = useState<Boolean>(false);
  const [isSpinner, setSpinner] = useState<Boolean>(false);
  const [isToast, setToast] = useState<Boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <userContext.Provider
        value={{
          userIn,
          setIsUserIn,
          setSearchModel,
          isSearchModel,
          setSpinner,
          isSpinner,
          isToast,
          setToast,
        }}
      >
        <LoadingLink />
        <Spinner />
        <SearchModel />
        <Toast />
        <Component {...pageProps} />
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
