// import NodeCache from "node-cache";

//
import dynamic from "next/dynamic";
import Head from "next/head";
import Trending from "../../src/components/trending/Trending";
import { trending } from "../../types/trending";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({
  data,
  data1,
}: {
  data: { currentPage: number; results: [trending] };
  data1: { currentPage: number; results: [trending] };
}) {
  const { results } = data;
  const { results: results1 } = data1;
  const AllData = [...results, ...results1];
  // console.log(AllData);
  return (
    <div className="min-h-screen bg-slate-200">
      <Head>
        <title>AnimoTime</title>
        <meta
          name="description"
          content="Explore the hottest anime content on Animotime. Our trending section features the most popular anime movies and series, as well as top-rated episodes. Join the conversation and see what everyone is talking about."
        />
        <meta
          name="keywords"
          content="trending anime, popular anime, top-rated anime, anime movies, anime series."
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2">
        <Navbar />
        <Trending data={AllData} />
      </main>
    </div>
  );
}

export default index;

export const getStaticProps = async (context: { req: { url: string } }) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_V}trending?perPage=50`
  );
  const data = await req.json();

  const req1 = await fetch(
    `${process.env.NEXT_PUBLIC_API}trending?page=2&perPage=50`
  );
  const data1 = await req1.json();

  return {
    props: {
      data,
      data1,
    },
  };
};
