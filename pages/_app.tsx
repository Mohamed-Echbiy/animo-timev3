import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingLink from "../src/common/LoadingLink";
import dynamic from "next/dynamic";

import { ThemeProvider } from "next-themes";
import Footer from "../src/common/Footer";

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
  const [modal, setModal] = useState<String>("");

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
          setModal,
          modal,
        }}
      >
        <ThemeProvider attribute='class'>
          <main className=' bg-slate-200 dark:bg-black relative'>
            <LoadingLink />
            <Spinner />
            <SearchModel />
            <Toast />
            <Component {...pageProps} />
            {!!modal ? (
              <div className='top-0 left-0 fixed z-[100] w-screen h-screen flex items-center justify-center p-4 '>
                <div
                  className='top-0 left-0 absolute w-full h-full bg-black opacity-70 cursor-pointer'
                  onClick={() => setModal("")}
                ></div>
                <div className='min-w-[260px] md:min-w-[320px] lg:min-w-[700px] w-2/3 max-h-[700px] overflow-y-scroll z-[239023] bg-black text-white'>
                  <p className='px-8 py-12 '>{modal}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            <Footer />
          </main>
        </ThemeProvider>

        <Analytics />
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
