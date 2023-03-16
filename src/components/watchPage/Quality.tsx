import React, { useEffect, useState } from "react";
import { episode } from "../../../types/episode";

function Quality({
  setWhatLanguage,
}: {
  setWhatLanguage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="sources flex flex-wrap items-center justify-center gap-2 py-2  ">
      <select
        onChange={(e) => setWhatLanguage(e.target.value)}
        className="p-2 bg-primary-400 rounded cursor-pointer uppercase"
      >
        <option
          className="uppercase text-xs md:text-base cursor-pointer"
          value="en"
        >
          English
        </option>
        <option
          className="uppercase text-xs md:text-base cursor-pointer hover:bg-black hover:text-white"
          value="ar"
        >
          Arabic
        </option>
      </select>
    </div>
  );
}

export default Quality;
