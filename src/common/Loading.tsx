import React from "react";
import Spinner from "./Spinner";

function Loading() {
  return (
    <div className='flex items-center justify-center min-h-[220px] w-full'>
      <Spinner />
    </div>
  );
}

export default Loading;
