import dynamic from "next/dynamic";
import Head from "next/head";
import TopSeries from "../../src/components/top_series/TopSeries";
import { anime } from "../../types/anime";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));

function index({ data }: { data: { currentPage: number; results: [anime] } }) {
  const { results } = data;
  //   console.log(results);
  return (
    <div className="min-h-screen bg-slate-200">
      <Head>
        <title>AnimoTime</title>
        <meta
          name="description"
          content="animo time a website to watch your favorite anime online without any ads"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative py-2">
        <Navbar />
        <TopSeries data={results} />
      </main>
    </div>
  );
}

export default index;

export const getServerSideProps = async () => {
  const req = await fetch(
    `${process.env.API}advanced-search?perPage=32&format=TV&sort=["SCORE_DESC"]`
  );
  const data = await req.json();

  return {
    props: {
      data,
    },
  };
};
