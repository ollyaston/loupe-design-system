import React from "react";

export const IconCurrentColor = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 224 224"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="loupe-system"
  >
    <rect width="224" height="224" rx="24" fill="var(--color-cerulean-600)" />
    <path d="M72 152H112V168H56V112H72V152Z" fill="white" />
    <path d="M168 56V112H152V72H112V56H168Z" fill="white" />
  </svg>
);
