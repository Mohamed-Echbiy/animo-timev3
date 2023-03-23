import dynamic from "next/dynamic";
import Head from "next/head";
// import SearchCard from "../../src/components/search/SearchCard";
import { anime } from "../../types/anime";

const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const SearchCard = dynamic(
  () => import("../../src/components/search/SearchCard")
);
function index({
  data,
  searchedFor,
}: {
  data: { currentPage: number; results: [anime] };
  searchedFor: string;
}) {
  const { results } = data;

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
        <SearchCard data={results} searchedFor={searchedFor} />
      </main>
    </div>
  );
}

export default index;

export const getServerSideProps = async (context: {
  params: { target: string };
}) => {
  const { params } = context;
  const searchedFor: string = params.target;
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API}advanced-search?query=${params.target}&perPage=10`
  );
  const data = await req.json();

  return {
    props: {
      data,
      searchedFor,
    },
  };
};
