import Image from "next/image";
import React, { useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import dynamic from "next/dynamic";
const LightBox = dynamic(() => import("../../common/LightBox"));

function Character({ data }: { data: animeDetail }) {
  const [showModal, setShowModal] = useState(false);
  const slides = data.characters.slice(0, 6).map((e) => {
    return { src: e.image, alt: e.name.full };
  });
  console.log(showModal, slides);
  return (
    <>
      {data.characters.length ? (
        <main className="Character flex items-center flex-wrap w-full gap-2 mb-10">
          {showModal && (
            <LightBox
              open={showModal}
              setOpen={setShowModal}
              imgslides={slides}
            />
          )}
          <p className="w-full flex mb-5 justify-end">
            <span className="">view all Characters {`>>`} </span>
          </p>
          {data.characters.slice(0, 6).map((e, i) => (
            <div
              key={i * 111000 + "fhdfkhskfhk"}
              className="flex gap-4 bg-gray-900 text-slate-200 py-2 px-4 rounded-xl shadow-primary shadow-gray-800 items-center w-1/4 min-w-[260px] flex-grow"
            >
              <div className="relative min-w-[56px] min-h-[56px] lg:min-w-[76px] lg:min-h-[76px] rounded-full overflow-hidden border-4 border-white border-solid">
                <Image
                  src={e.image}
                  alt={e.name.full}
                  fill
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer"
                />
              </div>
              <div className=" text-sm md:text-sm lg:text-xl">
                <p>{e.name.full}</p>
                <p className="text-xs">{e.name.native}</p>
              </div>
              <div className="role text-xs md:text-sm lg:text-xl flex-grow flex justify-end gap-1 items-center">
                <p className="capitalize text-xs">{e.role}</p>
                {e.role === "MAIN" && <p>🌟</p>}
              </div>
            </div>
          ))}
        </main>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Character;
