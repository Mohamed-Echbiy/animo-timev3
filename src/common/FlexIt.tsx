import React from "react";

interface flexItTypes {
  justify?: string;
  flex?: string;
  items?: string;
  gap?: string;
  children?: React.ReactNode;
  className?: string;
}

function FlexIt({
  justify = "center",
  flex = "row",
  items = "center",
  gap = "2",
  children,
  className,
}: flexItTypes) {
  return (
    <div
      className={` flex justify-${justify} items-${items} flex-${flex} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
}

export default FlexIt;
