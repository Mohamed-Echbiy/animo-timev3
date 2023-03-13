import React from "react";
import { recent_episodes } from "../../../types/recent_episodes";
import FlexIt from "../../common/FlexIt";
import { NewEpIcon } from "../../common/Icons";
import RecentEpCard from "../Home/recentEpisodes/RecentEpCard";

function RecentEpisodes({ data }: { data: [recent_episodes] }) {
  return (
    <div>
      <FlexIt warp="wrap" className=" gap-y-12 pt-[220px]" gap="4">
        <>
          <h3 className="w-full text-subHead mb-4 uppercase flex items-center gap-3">
            Recent Episodes
            <span className="h-6 w-6">
              <NewEpIcon />
            </span>
          </h3>
          {data.map((e) => (
            <div className="flex-grow min-w-[150px] w-1/4 lg:w-1/5  max-w-[250px] lg:max-w-sm">
              <RecentEpCard data={e} />
            </div>
          ))}
        </>
      </FlexIt>
    </div>
  );
}

export default RecentEpisodes;
