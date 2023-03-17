import { recent_episodes } from "../../../../types/recent_episodes";
import RecentEpCard from "./RecentEpCard";
import FlexIt from "../../../common/FlexIt";
import Link from "next/link";

function RecentEpisodes({ data }: { data: [recent_episodes] }) {
  return (
    <main className="recent_episodes_container">
      <div className="flex justify-between items-center mb-4 mt-section">
        <h2 className="recent_episodes_title text-base  md:text-subHead  uppercase flex items-center gap-3">
          Recent Episodes
          <img
            src="/new.gif"
            alt="new gif image"
            height={50}
            width={50}
            loading="lazy"
          />
        </h2>

        <Link
          href={"/recent_episodes"}
          className="text-gray-600 text-xs md:text-sm"
        >
          show more {`->>`}
        </Link>
      </div>
      <FlexIt warp="wrap" justify="center" className="py-10 gap-y-10">
        {data.map((e: recent_episodes) => (
          <div
            className="flex-grow w-2/5 md:w-1/4 xl:w-1/6 max-w-[200px] md:max-w-[280px] min-w-[150px]"
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
