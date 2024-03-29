import dynamic from "next/dynamic";
import React, { useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
// import Section from "./Section"
const Section = dynamic(() => import("./Section"));

function TabSwitcher({ data }: { data: animeDetail }) {
  const [show, setShow] = useState("episodes");
  return (
    <>
      <div className="what-to-show text-xs md:text-base flex items-center uppercase py-2 text-gray-500 gap-3">
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
          onClick={() => setShow("related")}
          className={` cursor-pointer ${
            show === "related" && "text-secondary-600 font-semibold"
          }`}
        >
          related
        </p>
        <p
          onClick={() => setShow("reviews")}
          className={` cursor-pointer ${
            show === "reviews" && "text-secondary-600 font-semibold"
          }`}
        >
          reviews
        </p>
      </div>
      <Section data={data} show={show} />
    </>
  );
}

export default TabSwitcher;
