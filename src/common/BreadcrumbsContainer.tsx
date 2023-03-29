import React from "react";
import Breadcrumbs from "nextjs-breadcrumbs2";

function BreadcrumbsContainer() {
  return (
    <Breadcrumbs
      listClassName="flex items-center gap-3 uppercase"
      rootLabel="Home"
      transformLabel={(title) => (title ? title + `${" "} ${" "} /` : "")}
      activeItemClassName=" text-secondary-500"
    />
  );
}

export default BreadcrumbsContainer;
