import React, { useState, useEffect } from "react";
import Skeleton from "./Skeleton/Skeleton";

type Props = {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  isLoading: boolean;
};

export default function DivWithSkeleton({
  children,
  width = "100%",
  height = "auto",
  className,
  style,
  isLoading,
}: Props) {
  const [loaded, setLoaded] = useState(!isLoading);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setLoaded(true), 300); // Simulating a delay before content appears
    } else {
      setLoaded(false);
    }
  }, [isLoading]);

  return (
    <div style={{ width, height, position: "relative" }} className={className}>
      {loaded ? (
        <div style={style}>{children}</div>
      ) : (
        <Skeleton width={width?.toString()} height={height?.toString()} />
      )}
    </div>
  );
}
