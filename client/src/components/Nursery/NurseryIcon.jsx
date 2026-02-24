import React from "react";

const NurseryIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Plant Leaves */}
    <path d="M12 12c-2.5 0-5-3-5-5s3-5 5-5c2.5 0 5 3 5 5s-2.5 5-5 5z" />
    <path d="M12 12c-1.5 0-3 2-3 3s1.5 3 3 3c1.5 0 3-2 3-3s-1.5-3-3-3z" />
    {/* Stem */}
    <line x1="12" y1="12" x2="12" y2="20" />
  </svg>
);

export default NurseryIcon;
