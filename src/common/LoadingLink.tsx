import React from "react";
import NextNProgress from "nextjs-progressbar";
function LoadingLink() {
  return (
    <>
      <NextNProgress height={5} options={{ showSpinner: false }} />
    </>
  );
}

export default LoadingLink;
