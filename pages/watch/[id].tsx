//
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowNext, ArrowPerv } from "../../src/common/Icons";
import { episode } from "../../types/episode";
import { commentSchema } from "../../types/commentSchema";
import IframeContainer from "../../src/components/watchPage/IframeContainer";
import { animeDetail } from "../../types/animeDetail";
import Script from "next/script";
import process from "process";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const Comments = dynamic(
  () => import("../../src/components/watchPage/comments/Comments")
);
function index({
  data,
  comments,
  titleBackup,
}: {
  data: episode[];
  comments: { data: commentSchema[] };
  titleBackup: string;
}) {
  const router = useRouter();

  const { id, animeData, title: titleis, ids }: any = router.query;
  const title = titleis ? titleis : titleBackup;
  const nextEpNum: any = id?.slice(-1);
  //keywords
  const keywords = `${title} episode ${
    nextEpNum - 1
  } , Anime streaming , English subtitles , , Watch anime online , Anime ${title} , ${title} episode 
  ${nextEpNum} online , Watch ${title} episode ${nextEpNum} on AnimoTime, anime`;

  const nextEp = id?.slice(0, id.length - 1);
  const [whatLanguage, setWhatLanguage] = useState("en");

  return (
    <div className="bg-slate-200">
      <Head>
        <title>
          Watch {title} Episode {nextEpNum} Online | Free on AnimoTime
        </title>
        <link rel="icon" href="/logo.png" />
        <meta
          name="description"
          content={`Stream ${title} Episode ${nextEpNum} for free on AnimoTime and Enjoy high-quality video with English & Arabic subtitles. Watch it now!`}
        />
        <meta
          name="keywords"
          content={`${keywords} , watch ${title} for free , `}
        />
        <meta
          name="a.validate.02"
          content="b0SqRR2tjW5Ktz7IRUhKo0ha1q7dv2q2NhFN"
        />
      </Head>
      <Navbar />
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative min-h-screen pb-4">
        <article className="pt-[220px] md:pt-[220px] xl:pt-[125px] h-full flex gap-4 flex-wrap  mx-auto">
          <h1 className="w-full uppercase my-2 text-lg lg:text-xl ">{title}</h1>

          <section className="w-full md:w-2/3 flex-wrap gap-2 md:min-w-[360px] mx-auto flex-grow justify-center">
            <div className=" w-full">
              {/* quality */}
              {/* <Quality setWhatLanguage={setWhatLanguage} /> */}
              {/* {ifram} */}
              {whatLanguage === "ar" ? (
                <>
                  {/* <IframeContainerArabic
                    // data={dataAr1}
                    id={id}
                    setWhatLanguage={setWhatLanguage}
                    nextEpNum={nextEpNum}
                  /> */}
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
  params: { id: string };
}) => {
  const { id } = context.params;
  const [req, reqComment] = await Promise.all([
    fetch(`https://api.consumet.org/anime/gogoanime/servers/${id}`),
    fetch(`https://animotime.onrender.com/api/comments/${id}`),
  ]);

  const res = await req.json();
  console.log(req.status, reqComment.status, res);
  const resComment = await reqComment.json();
  const nextEpNum: string = id?.slice(id.lastIndexOf("-"));
  const title = id.slice(0, id.lastIndexOf("-")).split("-").join(" ");
  console.log(nextEpNum, title, id);
  return {
    props: {
      data: { ...res },
      comments: resComment,
      titleBackup: title,
    },
  };
};
