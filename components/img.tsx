import React, { useState } from "react";
import Skeleton from "./Skeleton/Skeleton";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function ImageWithSkeleton({ src, alt, width, height, className, style }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ width, height, position: "relative", overflow: "hidden" }}>
      {!loaded && <Skeleton width={`${width}px`} height={`${height}px`}  />}
      <img
        src={src}
        alt={alt}
        width='100%'
        height='auto'
        className={className}
        style={{
          ...style,
          display: loaded ? "block" : "none",
          transition: "opacity 0.3s ease-in-out",
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
