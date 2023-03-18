import React, { useState } from "react";
import Iframe from "react-iframe";
import { episode } from "../../../types/episode";

function IframeContainer({ data }: { data: episode[] }) {
  // console.log(data);
  return (
    <div className="relative w-full aspect-video rounded overflow-hidden">
      <Iframe
        url={data[0].url}
        width="100%"
        height="100%"
        id=""
        className="left-0 top-0 absolute "
        display="block"
        loading="lazy"
      />
    </div>
  );
}

export default IframeContainer;
