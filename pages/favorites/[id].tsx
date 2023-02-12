import { m, LazyMotion, domAnimation } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import Favorites from "../../src/components/favouriteSection/Favorites";
import { favorite } from "../../types/favorites";
//
const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
//
function index({ data }: { data: favorite[] }) {
  return (
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>AnimoTime</title>
        <meta
          name="description"
          content="animo time a website to watch your favorite anime online without any ads"
        />
      </Head>
      <main className="max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative">
        <Navbar />
        <LazyMotion features={domAnimation}>
          <m.div
            className=" heroSection pt-[220px] md:pt-[158px] gap-2 flex-wrap flex items-center justify-center md:justify-start"
            initial={{ opacity: 0, x: "-100wv" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-subHead uppercase w-full mb-12">
              My Favorites
            </h3>
            <Favorites data={data} />
          </m.div>
        </LazyMotion>
      </main>
    </div>
  );
}

export default index;

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const { params } = context;
  const req = await fetch(
    `https://animotime.onrender.com/api/favorites/${params.id}`
  );
  const res = await req.json();
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
};
