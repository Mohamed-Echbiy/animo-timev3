import { motion } from "framer-motion";
import React from "react";
import { anime } from "../../../types/anime";
import FlexIt from "../../common/FlexIt";
import PastYearCard from "../Home/PastYear/PastYearCard";

function TopSeries({ data }: { data: [anime] }) {
  console.log(data);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, type: "tween" }}
    >
      <FlexIt warp="wrap" className=" gap-y-12 pt-[220px]" gap="4">
        <h3 className="w-full text-subHead mb-4 uppercase">Top Series</h3>
        {data.map((e) => (
          <div className="flex-grow min-w-[150px] w-1/4 lg:w-1/5  max-w-[250px] lg:max-w-sm">
            <PastYearCard data={e} />
          </div>
        ))}
      </FlexIt>
    </motion.div>
  );
}

export default TopSeries;
