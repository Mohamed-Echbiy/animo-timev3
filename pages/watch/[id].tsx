// import NodeCache from "node-cache";
//
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowNext, ArrowPerv } from "../../src/common/Icons";
import { episode } from "../../types/episode";

import { commentSchema } from "../../types/commentSchema";
import IframeContainer from "../../src/components/watchPage/IframeContainer";

// const IframeContainer = dynamic(
//   () => import("../../src/components/watchPage/IframeContainer")
// );

const IframeContainerArabic = dynamic(
  () => import("../../src/components/watchPage/IframeContainerArabic")
);
const Quality = dynamic(() => import("../../src/components/watchPage/Quality"));

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const Comments = dynamic(
  () => import("../../src/components/watchPage/comments/Comments")
);

function index({
  data,
  comments,
}: {
  data: episode[];
  comments: { data: commentSchema[] };
}) {
  const router = useRouter();
  // console.log(comments);
  const { id, animeData, title, ids }: any = router.query;
  const nextEpNum: any = id?.slice(-1);
  //keywords
  const keywords = `${title} episode ${
    nextEpNum - 1
  } , Anime streaming , English subtitles , Arabic subtitles , Watch anime online , Anime ${title} , ${title} episode 
  ${nextEpNum} online , Watch ${title} episode ${nextEpNum} on AnimoTime`;

  const nextEp = id?.slice(0, id.length - 1);
  const [whatLanguage, setWhatLanguage] = useState("en");

  return (
    <div className="bg-slate-200">
      <Head>
        <title>
          Watch {title} Episode {nextEpNum} Online | Free Streaming on AnimoTime
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`Stream ${title} Episode ${nextEpNum} for free on AnimoTime and Enjoy high-quality video with English & Arabic subtitles. Watch it now!`}
        />
        <meta name="keywords" content={keywords} />
      </Head>
      <Navbar />
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative min-h-screen pb-4">
        <article className="pt-[220px] md:pt-[220px] xl:pt-[125px] h-full flex gap-4 flex-wrap  mx-auto">
          <h1 className="w-full uppercase my-2 text-lg lg:text-xl ">
            {title}--[episode-{nextEpNum}]
          </h1>

          <section className="w-full md:w-2/3 flex-wrap gap-2 md:min-w-[360px] mx-auto flex-grow justify-center">
            <div className=" w-full">
              {/* quality */}
              <Quality setWhatLanguage={setWhatLanguage} />
              {/* {ifram} */}
              {whatLanguage === "ar" ? (
                <>
                  <IframeContainerArabic
                    // data={dataAr1}
                    id={id}
                    setWhatLanguage={setWhatLanguage}
                    nextEpNum={nextEpNum}
                  />
                </>
              ) : (
                <IframeContainer data={data} />
              )}
            </div>
            <nav className="mt-5 uppercase gap-2 w-fit flex flex-row-reverse">
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
            </nav>
          </section>

          <aside className="md:min-w-[320px] max-w-[360px] self-center mx-auto">
            <Comments data={comments} animeEpId={id} />
          </aside>
        </article>
      </main>
    </div>
  );
}

export default index;

export const getServerSideProps = async (context: {
  req: { url: string };
  params: { id: string };
}) => {
  const { id } = context.params;
  const [req, reqComment] = await Promise.all([
    fetch(`https://animo-time-api.vercel.app/anime/gogoanime/servers/${id}`),
    fetch(`https://animotime.onrender.com/api/comments/${id}`),
  ]);

  const res = await req.json();
  const resComment = await reqComment.json();

  return {
    props: {
      data: { ...res },
      comments: resComment,
    },
  };
};
