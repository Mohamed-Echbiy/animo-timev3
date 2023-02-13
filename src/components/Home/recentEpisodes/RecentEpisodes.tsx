import { recent_episodes } from "../../../../types/recent_episodes";
import RecentEpCard from "./RecentEpCard";
import FlexIt from "../../../common/FlexIt";
import Link from "next/link";

function RecentEpisodes({ data }: { data: [recent_episodes] }) {
  return (
    <main className="recent_episodes_container">
      <div className="flex justify-between items-center mb-4 mt-section">
        <h2 className="recent_episodes_title  text-subHead  uppercase">
          Recent Episodes
        </h2>
        <Link
          href={"/recent_episodes"}
          className="text-gray-600 text-xs md:text-sm"
        >
          show more {`->>`}
        </Link>
      </div>
      <FlexIt warp="wrap" className="py-10 gap-y-10">
        {data.map((e: recent_episodes) => (
          <div
            className="flex-grow w-[45%] lg:w-[20%]"
            key={`${e.malId}recentEpisodes-kqkjfqskj`}
          >
            <RecentEpCard data={e} />
          </div>
        ))}
      </FlexIt>
    </main>
  );
}

export default RecentEpisodes;
