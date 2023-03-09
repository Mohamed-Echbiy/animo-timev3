import React from "react";
import Iframe from "react-iframe";

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
