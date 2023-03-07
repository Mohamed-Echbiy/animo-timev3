import React, { useEffect } from "react";
import Iframe from "react-iframe";
import ReactPlayer from "react-player";

function IframeContainer({
  sourceIs,
  whatLanguage,
}: {
  sourceIs: string;
  whatLanguage: string;
}) {
  if (whatLanguage !== "ar") {
    return (
      <div className="relative w-full aspect-video rounded overflow-hidden">
        <ReactPlayer
          url={sourceIs}
          controls
          width={"100%"}
          height={"100%"}
          className="top-0 left-0 absolute"
          light={
            <div className="absolute top-0 left-0 bg-gray-900 w-full h-full"></div>
          }
        />
      </div>
    );
  }
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
      />
    </div>
  );
}

export default IframeContainer;
