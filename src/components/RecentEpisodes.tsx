import React from "react";
import FlexIt from "../common/FlexIt";
import { recent_episodes } from "../../types/recent_episodes";

function RecentEpisodes({ data }: { data: [recent_episodes] }) {
  return (
    <main className="recent_episodes_container">
      <h2 className="recent_episodes_title capitalize text-subHead">
        Recent Episodes
      </h2>
      <FlexIt
        justify="center"
        gap="4"
        items="center"
        flex="row"
        className=""
      ></FlexIt>
    </main>
  );
}

export default RecentEpisodes;
