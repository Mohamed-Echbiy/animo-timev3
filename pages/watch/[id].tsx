import NodeCache from "node-cache";
//
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowNext, ArrowPerv } from "../../src/common/Icons";
import { animeDetail } from "../../types/animeDetail";
import { episode } from "../../types/episode";
const Quality = dynamic(() => import("../../src/components/watchPage/Quality"));
const IframeContainer = dynamic(
  () => import("../../src/components/watchPage/IframeContainer")
);
const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({
  data,
  // data1,
  dataAr,
}: {
  data: episode;
  // data1: animeDetail;
  dataAr: { data: string[] };
}) {
  const router = useRouter();

  const { id, animeData, title, ids }: any = router.query;
  // console.log(data1);
  const nextEp = id?.slice(0, id.length - 1);
  const nextEpNum: any = id?.slice(-1);
  // console.log(dataAr, "from back");
  const [hydrated, setIsHydrated] = useState(false);
  const [whatLanguage, setWhatLanguage] = useState("en");
  const sourceDefault = data.message ? "default" : data.sources[0].url;
  const [sourceIs, setSource] = useState(sourceDefault);
  const [active, setActive] = useState("default");
  console.log(whatLanguage);
  useEffect(() => {
    if (window !== undefined) {
      setIsHydrated(true);
      if (data.message) {
        if (dataAr.data.length < 1) {
          router.push("/404");
        } else {
          setSource(dataAr.data[0]);
          setActive("server 1");
        }
      }
    }
    if (whatLanguage === "ar") {
      setSource(dataAr.data[0]);
      setActive("server 1");
    }
  }, [whatLanguage]);

  return (
    <div className="bg-slate-200">
      <Head>
        <title>AnimoTime</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="AnimoTime a free streaming web application packed with many features"
        />
      </Head>
      <Navbar />
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative min-h-screen pb-4">
        <div className="pt-[220px] md:pt-[158px] h-full flex gap-2 flex-wrap max-w-6xl mx-auto">
          {hydrated && (
            <div className="w-full md:w-1/2 flex-wrap gap-2 min-w-[320px]  max-w-[720px] mx-auto flex-grow justify-center">
              <div className=" w-full">
                {/* quality */}
                <Quality
                  data={data}
                  active={active}
                  setActive={setActive}
                  setSource={setSource}
                  setWhatLanguage={setWhatLanguage}
                  dataAr={dataAr}
                  whatLanguage={whatLanguage}
                />
                {/* {ifram} */}
                <IframeContainer
                  sourceIs={sourceIs}
                  whatLanguage={whatLanguage}
                />
              </div>
              <div className="mt-5 uppercase gap-2 w-fit flex flex-row-reverse">
                {+animeData > 1 && (
                  <>
                    <Link
                      href={`/watch/${nextEp}${
                        +nextEpNum + 1
                      }?animeData=${animeData}&ids=${ids}&title=${title}`}
                      className={`${
                        +nextEpNum === +animeData && "hidden"
                      } w-fit px-2 py-1 gap-1 flex items-center justify-center rounded-md`}
                      target="_parent"
                    >
                      Next <ArrowNext />
                    </Link>
                    <>
                      <Link
                        href={`/watch/${nextEp}${
                          +nextEpNum - 1
                        }?animeData=${animeData}&ids=${ids}&title=${title}`}
                        className={`${
                          +nextEpNum === 1 && "hidden"
                        } w-fit px-2 py-1 gap-1 flex items-center justify-center rounded-md`}
                        target="_parent"
                      >
                        <ArrowPerv /> Prev
                      </Link>
                    </>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default index;

const cache = new NodeCache({ stdTTL: 60 * 1200, checkperiod: 1200 });

export const getServerSideProps = async (context: {
  req: { url: string };
  params: { id: string };
  query: { animeData: string; ids: string; title: string };
}) => {
  // check if the response is already cached
  const cachedData = cache.get(context.req.url);
  if (cachedData) {
    console.log("cachedData");
    return {
      props: cachedData,
    };
  }
  const { id } = context.params;
  const { animeData, ids, title } = context.query;
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}watch/${id}`);
  console.log(req.status);
  const res = req.status === 500 ? { message: "error" } : await req.json();
  const nextEpNum: string = id.slice(-1);
  const arabicTran = await fetch(
    `https://arabic-trans.onrender.com/${title}?ep=${nextEpNum}`
  );
  const arabicRes = await arabicTran.json();

  cache.set(
    context.req.url,
    { data: { ...res, dataAr: arabicRes } },
    60 * 1200
  );

  return {
    props: {
      data: { ...res },
      dataAr: arabicRes,
    },
  };
};
