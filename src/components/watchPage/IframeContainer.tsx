import React from "react";
import Iframe from "react-iframe";
import { useQuery } from "react-query";

function IframeContainer({ sourceIs }: { sourceIs: string }) {
  return (
    <div className="relative w-full aspect-video rounded overflow-hidden">
      <Iframe
        url={sourceIs}
        width="100%"
        height="100%"
        id=""
        className="left-0 top-0"
        display="block"
        position="absolute"
        loading="lazy"
      />
    </div>
  );
}

export default IframeContainer;
