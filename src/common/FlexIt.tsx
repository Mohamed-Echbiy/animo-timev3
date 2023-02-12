interface flexItTypes {
  justify?: string;
  flex?: string;
  items?: string;
  gap?: string;
  warp?: string;
  children?: React.ReactNode;
  className?: string;
}

function FlexIt({
  justify = "center",
  flex = "row",
  items = "center",
  gap = "2",
  warp = "no-wrap",
  children,
  className,
}: flexItTypes) {
  return (
    <div
      className={` flex flex-${warp} justify-${justify} items-${items} flex-${flex} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
}

export default FlexIt;
