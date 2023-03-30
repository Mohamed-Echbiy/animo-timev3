import dynamic from "next/dynamic";
import React from "react";
import { animeDetail } from "../../../types/animeDetail";
import Reviews from "./reviews/Reviews";
const Character = dynamic(() => import("./Character"));
const Episodes = dynamic(() => import("./Episodes"));
const Recommended = dynamic(() => import("./Recommended"));
const SidebarRealted = dynamic(() => import("./SidebarRealted"));

function Section({ show, data }: { show: string; data: animeDetail }) {
  return (
    <>
      <section className="two_side_container flex w-full flex-wrap gap-3 mb-10">
        {show === "episodes" ? (
          <Episodes data={data} />
        ) : show === "recommanded" ? (
          <Recommended data={data} />
        ) : show === "characters" ? (
          <Character data={data} />
        ) : show === "related" ? (
          <SidebarRealted data={data} />
        ) : (
          <Reviews malId={data.malId} />
        )}
      </section>
    </>
  );
}

export default Section;
