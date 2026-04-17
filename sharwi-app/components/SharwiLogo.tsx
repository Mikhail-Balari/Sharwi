import React from "react";
import Svg, { Path } from "react-native-svg";

interface SharwiLogoProps {
  size?: number;
  color?: string;
}

export const SharwiLogo = ({
  size = 48,
  color = "#DE5015",
}: SharwiLogoProps) => {
  const height = size * (173 / 121);

  return (
    <Svg
      width={size}
      height={height}
      viewBox="0 0 121 173"
      fill="none"
    >
      <Path
        d="M74.1611 7.57715C78.6979 5.94651 82.1321 6.30721 85.0186 7.72168C88.13 9.24642 91.3109 12.3532 94.3896 17.4395C100.602 27.7032 105.116 43.8572 108.238 62.6094C114.439 99.8472 114.687 144.172 114.44 163.356C114.419 165.038 113.061 166.5 111.086 166.5H11.1396C8.97867 166.5 7.60168 164.737 7.85938 162.926C10.3443 145.462 16.3007 109.949 27.3193 76.8486C32.8319 60.2889 39.5245 44.6029 47.5176 32.1514C55.5697 19.608 64.4864 11.0545 74.1611 7.57715Z"
        stroke={color}
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M37 108.516C43.0435 117.45 82.2259 98.7551 92 107.297"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M37 122.516C43.0435 131.45 82.2259 112.755 92 121.297"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M37 137.516C43.0435 146.45 82.2259 127.755 92 136.297"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
};
