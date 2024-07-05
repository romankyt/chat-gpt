import { IconProps } from "@/types/types";
import { FC } from "react";

export const SendIcon: FC<IconProps> = ({ width, height }) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5718 3.42859L10.2861 13.7143"
        stroke="white"
        stroke-width="2.05714"
        stroke-miterlimit="10"
      />
      <path
        d="M20.5716 3.42859L14.5716 20.5714L10.2859 13.7143L3.42871 9.42859L20.5716 3.42859Z"
        stroke="white"
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
    </svg>
  );
};
