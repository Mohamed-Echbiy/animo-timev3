import Link from "next/link";
import React from "react";
import { urlFor } from "../../../../lib/client";
import { downloadLinks } from "../../../../types/downloadData";

function DownloadEpCard({ data }: { data: downloadLinks }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl  dark:bg-white bg-black">
      <Link href={`/detail/${data.id}`}>
        <figure className="">
          <img src={urlFor(data.image.asset._ref)} alt="anime cover" />
        </figure>
      </Link>
      <div className="card-body p-4">
        <p className="text-white dark:text-black capitalize">{data.text}</p>
        <div className="card-actions justify-end flex items-end gap-2 mt-6">
          {data.links.map((e, i) => (
            <button className="p-3 rounded bg-blue-500 hover:text-blue-900 hover:rotate-2 ease-linear duration-200 transition-all">
              <Link href={e} target="_blank">
                Download {i + 1}
              </Link>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DownloadEpCard;
