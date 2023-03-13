import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";

function IframeContainerArabic({
  data,
  setWhatLanguage,
}: {
  data: { data: string[] };
  setWhatLanguage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [active, setActive] = useState(0);
  const [source, setSource] = useState("");
  //   console.log(data.data[0], "iiii");
  useEffect(() => {
    setSource(data.data[active]);
  }, [active]);
  const switchIt = (e: number, s: string) => {
    setActive(e);
    setSource(s);
  };
  console.log(active, source);
  return (
    <section className="">
      <div className="sources flex flex-wrap items-center justify-center gap-2 py-2  ">
        {data.data.length > 0 &&
          data.data.map((e, i) => {
            const index = i;
            return (
              <button
                onClick={() => switchIt(index, e)}
                className={`py-1 px-2 text-slate-200 rounded ${
                  active === i ? "bg-secondary-700" : " bg-gray-700"
                }`}
                key={e + i + ";;:nhhlljlhjl"}
              >
                server {i + 1}
              </button>
            );
          })}
      </div>
      <div className="relative w-full aspect-video rounded overflow-hidden">
        <Iframe
          url={source}
          width="100%"
          height="100%"
          id=""
          className="left-0 top-0"
          display="block"
          position="absolute"
        />
      </div>
    </section>
  );
}

export default IframeContainerArabic;
