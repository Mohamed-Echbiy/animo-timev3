import Image from "next/image";
import React, { useState } from "react";
import { animeDetail } from "../../../types/animeDetail";
import dynamic from "next/dynamic";
const LightBox = dynamic(() => import("../../common/LightBox"));

const arrayOfColors = [
  "bg-secondary-500",
  "bg-primary-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-violet-500",
  "bg-lime-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-purple-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-rose-500",
  "bg-fuchsia-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-secondary-300",
  "bg-primary-300",
  "bg-green-300",
  "bg-pink-300",
  "bg-violet-300",
  "bg-lime-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-purple-300",
  "bg-sky-300",
  "bg-indigo-300",
  "bg-emerald-300",
  "bg-blue-300",
  "bg-rose-300",
  "bg-fuchsia-300",
  "bg-orange-300",
  "bg-amber-300",
];

function Character({ data }: { data: animeDetail }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const slides = data.characters.slice(0, 30).map((e) => {
    return { src: e.image, alt: e.name.full };
  });

  return (
    <>
      {data.characters.length ? (
        <main className="Character flex mt-10 items-center flex-wrap w-full gap-2 gap-y-5 mb-10">
          {showModal && (
            <LightBox
              open={showModal}
              setOpen={setShowModal}
              imgslides={slides}
            />
          )}
          {/* <p className="w-full flex mb-5 justify-end">
            <span className="">view all Characters {`>>`} </span>
          </p> */}
          {data.characters.slice(0, 30).map((e, i) => {
            const index = Math.floor(Math.random() * arrayOfColors.length);
            return (
              <div
                key={i * 111000 + "fhdfkhskfhk"}
                className={`flex gap-4 ${arrayOfColors[index]} text-black py-2 px-4 rounded-xl shadow-primary shadow-gray-800 items-center w-1/4 min-w-[260px] flex-grow`}
              >
                <div className="relative min-w-[56px] min-h-[56px] lg:min-w-[76px] lg:min-h-[76px] rounded-xl overflow-hidden border-2 border-white border-solid">
                  <Image
                    src={e.image}
                    alt={e.name.full || e.name.userPreferred}
                    fill
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                    quality={100}
                  />
                </div>
                <div className=" text-sm md:text-sm lg:text-xl">
                  <p>{e.name.full || e.name.first}</p>
                  <p className="text-xs">{e.name.native || e.name.full}</p>
                </div>
                <div className="role text-xs md:text-sm lg:text-xl flex-grow flex justify-end gap-1 items-center">
                  <p className="capitalize text-xs">{e.role}</p>
                  {e.role === "MAIN" ? <p>🌟</p> : <></>}
                </div>
              </div>
            );
          })}
        </main>
      ) : (
        <></>
      )}
    </>
  );
}

export default Character;
