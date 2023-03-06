import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowNext, ArrowPerv } from "../../src/common/Icons";
import { animeDetail } from "../../types/animeDetail";
import { episode } from "../../types/episode";
const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const ReactPlayer = dynamic(() => import("react-player"));
function index({ data, data1 }: { data: episode; data1: animeDetail }) {
  const router = useRouter();
  const { id, animeData }: any = router.query;
  console.log(data1);
  const nextEp = id?.slice(0, id.length - 1);
  const nextEpNum: any = id?.slice(-1);

  const [hydrated, setIsHydrated] = useState(false);
  const [sourceIs, setSource] = useState(data.sources[0].url);
  const [active, setActive] = useState("default");
  const switchIt = (e: string, s: string) => {
    setActive(e);
    setSource(s);
  };

  useEffect(() => {
    if (window !== undefined) {
      setIsHydrated(true);
      if (data.message) {
        router.push("/404");
      }
    }
  }, []);

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
            <div className="w-full md:w-1/2 flex-wrap gap-2 min-w-[320px] flex-grow">
              <div className=" w-full">
                <div className="sources flex flex-wrap items-center justify-center gap-2 py-2  ">
                  {data.sources.map((e, i) => (
                    <button
                      className={`py-1 px-2 ${
                        active === e.quality
                          ? "bg-secondary-700"
                          : " bg-gray-800"
                      } text-slate-200 rounded`}
                      key={e.url + i}
                      onClick={() => switchIt(e.quality, e.url)}
                    >
                      {e.quality}
                    </button>
                  ))}
                </div>
                <div className="relative w-full aspect-video rounded overflow-hidden">
                  <ReactPlayer
                    url={sourceIs}
                    controls
                    width={"100%"}
                    height={"100%"}
                    className="top-0 left-0 absolute"
                    light={
                      <div className="absolute top-0 left-0 bg-gray-900 w-full h-full"></div>
                    }
                  />
                </div>
              </div>
              <div className="mt-5 uppercase gap-2 w-fit flex flex-row-reverse">
                {+data.totalEp > 1 && (
                  <>
                    <Link
                      href={`/watch/${nextEp}${
                        +nextEpNum + 1
                      }?animeData=${animeData}&ids=${data1.id}`}
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
                        }?animeData=${animeData}&ids=${data1.id}`}
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
          <div
            className=" w-1/3 max-w-[280px] mt-12 flex flex-col pt-2"
            style={{ flexGrow: 2 }}
          >
            <div className="w-full justify-center ">
              Episode Num: {nextEpNum}
            </div>
            <p className="text-xs capitalize mt-1 mb-3">
              ep title : {data1.episodes[+nextEpNum - 1].title}
            </p>
            <div className="w-full flex gap-1 pb-1 mt-3">
              <div className="relative w-full max-w-[100px] aspect-[.7]">
                <Image fill src={data1.image} alt="Image" />
              </div>
              <div className="flex-grow h-full">
                <p className="">{data1.title.native || data1.title.english}</p>
                <p className="text-xs mt-1 flex gap-1">
                  <span>{data1.type}</span>
                  <span className="bg-secondary-700 w-[1.5px]"></span>
                  <span>{data1.duration}min</span>
                  <span className="bg-secondary-700 w-[1.5px]"></span>
                  <span>{(data1.rating / 10).toPrecision(2)}⭐</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default index;

export const getServerSideProps = async (context: {
  params: { id: string };
  query: { animeData: string; ids: string };
}) => {
  const { id } = context.params;
  const { animeData, ids } = context.query;
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}watch/${id}`);
  const res = await req.json();
  console.log(ids);
  const AnimeData = await fetch(`${process.env.NEXT_PUBLIC_API}info/${ids}`);
  const AnimeDataRespo = await AnimeData.json();
  return {
    props: {
      data: { ...res, totalEp: animeData },
      data1: AnimeDataRespo,
    },
  };
};
