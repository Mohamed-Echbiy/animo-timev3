import React, { useState } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { commentSchema } from "../../../../types/commentSchema";
import AddComment from "./AddComment";
import Comment from "./Comment";
import "swiper/css";
import "swiper/css/navigation";
import { CheckMarkIcon } from "../../../common/Icons";
import Image from "next/image";
function CommentContainer({
  data,
  animeEpId,
}: {
  data: { data: commentSchema[] };
  animeEpId: string;
}) {
  // console.log(data);
  const [blured, setBlured] = useState(false);
  return (
    <section className="relative w-full h-full py-10">
      {!!data.data.length ? (
        <>
          <div className=" absolute top-0 right-0 flex items-center text-xs uppercase">
            <label className=" cursor-pointer" htmlFor="blure">
              show comments
            </label>
            <input
              id="blure"
              type="checkBox"
              onClick={() => setBlured((pre) => !pre)}
              className="w-4 h-4 ml-4 cursor-pointer"
            />
          </div>
          <Swiper
            className="Swiper-Container"
            modules={[Navigation, Autoplay]}
            style={{ paddingBottom: "50px", paddingTop: "80px" }}
            slidesPerView={1}
            grabCursor={true}
            spaceBetween={0}
            navigation={true}
            autoplay={true}
          >
            {data.data.map((detail) => (
              <SwiperSlide
                key={detail.by.userName + detail.by.id + detail.comment}
              >
                <div
                  className={`mb-3  ease-in-out duration-300 ${
                    !blured && "blur-[3px]"
                  }`}
                >
                  <Comment data={detail} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <div className="comment_section my-10 pl-3">
            <div className="flex w-full items-center gap-3 flex-wrap h-24 justify-center">
              <h2 className="uppercase self-start text-center">
                no comments out yet be the first
              </h2>
              <div className=" relative w-12 h-12">
                <Image fill src={"/nothing_yet.png"} alt="image" />
              </div>
            </div>
          </div>
        </>
      )}

      <AddComment animeEpId={animeEpId} />
    </section>
  );
}

export default CommentContainer;
