import { IconProps } from "@/types/types";
import { FC } from "react";

export const MenuIcon: FC<IconProps> = ({ width, height }) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.57129 12.0001L21.4284 12.0001"
        stroke="white"
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M2.57129 6.00012L21.4284 6.00012"
        stroke="white"
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M2.57129 18.0001L21.4284 18.0001"
        stroke="white"
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
    </svg>
  );
};
