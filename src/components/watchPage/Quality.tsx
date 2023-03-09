import React, { useEffect, useState } from "react";
import { episode } from "../../../types/episode";

function Quality({
  data,
  setActive,
  active,
  setSource,
  setWhatLanguage,
  whatLanguage,
  dataAr,
}: {
  data: episode[];
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  active: string;
  setWhatLanguage: React.Dispatch<React.SetStateAction<string>>;
  dataAr: { data: string[] };
  whatLanguage: string;
}) {
  const switchIt = (e: string, s: string) => {
    setActive(e);
    setSource(s);
  };
  if (whatLanguage === "ar") {
    return (
      <div className="sources flex flex-wrap items-center justify-center gap-2 py-2  ">
        {dataAr.data.length > 0 &&
          dataAr.data.map((e, i) => {
            const index = `server ${i + 1}`;
            return (
              <button
                onClick={() => switchIt(index, e)}
                className={`py-1 px-2 text-slate-200 rounded ${
                  active === index ? "bg-secondary-700" : " bg-gray-700"
                }`}
                key={e + i + ";;:nhhlljlhjl"}
              >
                server {i + 1}
              </button>
            );
          })}
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
  return (
    <div className="sources flex flex-wrap items-center justify-center gap-2 py-2  ">
      {!data[0].url &&
        data.map((e, i) => (
          <button
            className={`py-1 px-2 ${
              active === e.name ? "bg-secondary-700" : " bg-gray-800"
            } text-slate-200 rounded`}
            key={e.url + i}
            onClick={() => switchIt(e.name, e.url)}
          >
            {e.name}
          </button>
        ))}
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
