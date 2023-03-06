import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function LightBox({ open, setOpen, imgslides }: any) {
  console.log("I am modal", open, imgslides);
  return (
    <Lightbox open={open} close={() => setOpen(false)} slides={imgslides} />
  );
}

export default LightBox;
