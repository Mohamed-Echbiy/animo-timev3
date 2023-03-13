import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingLink from "../src/common/LoadingLink";
import dynamic from "next/dynamic";
//
const Toast = dynamic(() => import("../src/common/Toast"));
const Spinner = dynamic(() => import("../src/common/Spinner"));
const SearchModel = dynamic(() => import("../src/common/SearchModel"));
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
        <Analytics />
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
