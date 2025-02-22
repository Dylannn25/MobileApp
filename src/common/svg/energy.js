import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
export default function EnergySvg() {
  return (
    <>
      <Svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M7.41667 24V23.25H6.66667H4.75V18.0833H6.66667H7.41667V17.3333V15.4167H9.33333H9.64399L9.86366 15.197L12.3107 12.75H24.5833V23.25H22.6667H22.356L22.1363 23.4697L19.6893 25.9167H7.41667V24Z"
          stroke="#5FCF86"
          stroke-width="1.5"
          stroke-linecap="round"
        ></Path>
        <Path d="M24 21.3333H28" stroke="#5FCF86" stroke-width="1.5"></Path>
        <Path d="M24 18.6665H28" stroke="#5FCF86" stroke-width="1.5"></Path>
        <Path
          d="M15.417 7.33325C15.417 6.6429 15.9766 6.08325 16.667 6.08325H20.667C21.3573 6.08325 21.917 6.6429 21.917 7.33325V8.58325H15.417V7.33325Z"
          stroke="#5FCF86"
          stroke-width="1.5"
        ></Path>
        <Path
          d="M17.333 9.33325V11.9999M19.9997 9.33325V11.9999"
          stroke="#5FCF86"
          stroke-width="1.5"
        ></Path>
        <Path
          d="M4.66699 26.01L4.66699 15.3308"
          stroke="#5FCF86"
          stroke-width="1.5"
          stroke-linecap="round"
        ></Path>
        <Path
          d="M27.3291 23.3384L27.3291 16.6704"
          stroke="#5FCF86"
          stroke-width="1.5"
          stroke-linecap="round"
        ></Path>
      </Svg>
    </>
  );
}
