import React from "react";
import { anime } from "../../../../types/anime";

function Upcoming({ data }: { data: [anime] }) {
  console.log(data);

  return (
    <div className="mt-section">
      <h3 className="uppercase text-subHead ">Upcoming</h3>
    </div>
  );
}

export default Upcoming;
