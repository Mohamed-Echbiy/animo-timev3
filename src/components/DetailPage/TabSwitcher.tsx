import React, { useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import Section from "./Section";

function TabSwitcher({ data }: { data: animeDetail }) {
  const [show, setShow] = useState("episodes");
  return (
    <>
      <div className="what-to-show text-sm md:text-base flex items-center uppercase py-2 text-gray-500 gap-3">
        <p
          onClick={() => setShow("episodes")}
          className={`cursor-pointer ${
            show === "episodes" && "text-secondary-600 font-semibold"
          }`}
        >
          episodes
        </p>
        <p
          onClick={() => setShow("characters")}
          className={` cursor-pointer ${
            show === "characters" && "text-secondary-600 font-semibold"
          }`}
        >
          characters
        </p>
        <p
          onClick={() => setShow("recommanded")}
          className={` cursor-pointer ${
            show === "recommanded" && "text-secondary-600 font-semibold"
          }`}
        >
          recommanded
        </p>
        <p
          onClick={() => setShow("realted")}
          className={` cursor-pointer ${
            show === "realted" && "text-secondary-600 font-semibold"
          }`}
        >
          related
        </p>
      </div>
      <Section data={data} show={show} />
    </>
  );
}

export default TabSwitcher;
