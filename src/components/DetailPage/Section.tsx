import dynamic from "next/dynamic";
import React from "react";
import { animeDetail } from "../../../types/animeDetail";
import Character from "./Character";
import Episodes from "./Episodes";
import Recommended from "./Recommended";
import SidebarRealted from "./SidebarRealted";

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
        ) : (
          <SidebarRealted data={data} />
        )}
      </section>
    </>
  );
}

export default Section;
