//
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowNext, ArrowPerv } from "../../src/common/Icons";
import { episode } from "../../types/episode";
import { commentSchema } from "../../types/commentSchema";
import IframeContainer from "../../src/components/watchPage/IframeContainer";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const Comments = dynamic(
  () => import("../../src/components/watchPage/comments/Comments")
);
const BreadcrumbsContainer = dynamic(
  () => import("../../src/common/BreadcrumbsContainer")
);
function index({
  data,
  comments,
}: {
  data: episode[];
  comments: { data: commentSchema[] };
  titleBackup: string;
}) {
  const router = useRouter();

  const { id, animeData, ids }: any = router.query;
  const title = id.slice(0, id.lastIndexOf("-")).split("-").join(" ");
  const nextEpNum: any = id?.slice(id.lastIndexOf("-") + 1);
  //keywords
  console.log(nextEpNum);
  const keywords = `${title} episode ${
    +nextEpNum - 1
  } , Anime streaming , English subtitles , , Watch anime online , Anime ${title} , ${title} episode 
  ${nextEpNum} online , Watch ${title} episode ${nextEpNum} on AnimoTime, anime`;

  const nextEp = id?.slice(0, id.length - 1);

  return (
    <div className="bg-slate-200 dark:bg-black">
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
        <article className="pt-[220px] md:pt-[220px] xl:pt-[125px] h-full flex gap-4 flex-wrap  mx-auto pb-5">
          <h1 className="w-full uppercase my-2 text-lg lg:text-xl pb-4 border-2 border-solid border-transparent dark:border-b-violet-500 border-b-violet-900">
            {id}
          </h1>
          <div className="w-full">
            <BreadcrumbsContainer />
          </div>
          <section className="w-full md:w-2/3 flex-wrap gap-2 md:min-w-[360px] mx-auto flex-grow justify-center">
            <div className=" w-full">
              <IframeContainer data={data} />
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
    fetch(
      `https://consumet-api-c1fs.onrender.com/anime/gogoanime/servers/${id}`
    ),
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
