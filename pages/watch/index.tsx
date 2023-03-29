import React from "react";

function index() {
  return <div>index</div>;
}

export default index;

export const getStaticProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
