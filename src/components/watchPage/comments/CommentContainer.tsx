import React, { useState } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { commentSchema } from "../../../../types/commentSchema";
import AddComment from "./AddComment";
import Comment from "./Comment";
import "swiper/css";
import "swiper/css/navigation";
import { CheckMarkIcon } from "../../../common/Icons";
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
          <SwiperSlide key={detail.by.userName + detail.by.id + detail.comment}>
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

      <AddComment animeEpId={animeEpId} />
    </section>
  );
}

export default CommentContainer;
