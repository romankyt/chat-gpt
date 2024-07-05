import { IconProps } from "@/types/types";
import { FC } from "react";

export const PlusIcon: FC<IconProps> = ({ width, height }) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.42847L12 20.5713"
        stroke="white"
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M20.5716 12L3.42871 12"
        stroke="white"
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
    </svg>
  );
};
