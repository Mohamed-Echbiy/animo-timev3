import Image from "next/image";
import { useEffect, useState } from "react";

const arrayOfColors = [
  " bg-secondary-600",
  "bg-primary-600",
  "bg-green-600",
  "bg-black",
  "bg-pink-500",
  "bg-violet-500",
  "bg-lime-400",
  "bg-teal-400",
  "bg-cyan-600",
  "bg-purple-500",
  "bg-sky-400",
];

function ImageLoader() {
  const [imageColor, setImageColor] = useState("");
  useEffect(() => {
    const index = Math.floor(Math.random() * arrayOfColors.length);
    setImageColor(arrayOfColors[index]);
  }, []);
  useEffect(() => {}, []);
  return (
    <div
      className={`absolute top-0 w-full h-full left-0 ${imageColor} z-40 rounded-md`}
    ></div>
  );
}

export default ImageLoader;
