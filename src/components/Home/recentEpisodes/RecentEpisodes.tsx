import { recent_episodes } from "../../../../types/recent_episodes";
import RecentEpCard from "./RecentEpCard";
import FlexIt from "../../../common/FlexIt";

function RecentEpisodes({ data }: { data: [recent_episodes] }) {
  return (
    <main className="recent_episodes_container">
      <h2 className="recent_episodes_title  text-subHead mb-4 mt-section uppercase">
        Recent Episodes
      </h2>
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
