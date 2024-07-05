import { IconProps } from "@/types/types";

import { FC } from "react";

export const DeleteIcon: FC<IconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.57129 6.41856V2.98999L15.4284 2.98999V6.41856"
        stroke={`${fill}`}
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M18.8569 12.4185V20.1327C18.8569 20.5874 18.6763 21.0234 18.3548 21.3449C18.0333 21.6664 17.5972 21.847 17.1426 21.847L6.85686 21.847C6.40221 21.847 5.96617 21.6664 5.64468 21.3449C5.32319 21.0234 5.14258 20.5874 5.14258 20.1327L5.14258 12.4185"
        stroke={`${fill}`}
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M12 14.1328V17.5614"
        stroke={`${fill}`}
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M8.57129 14.1328V17.5614"
        stroke={`${fill}`}
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M15.4287 14.1328V17.5614"
        stroke={`${fill}`}
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
      <path
        d="M21.4284 6.41846L2.57129 6.41846L2.57129 9.84703L21.4284 9.84703V6.41846Z"
        stroke={`${fill}`}
        stroke-width="2.05714"
        stroke-miterlimit="10"
        stroke-linecap="square"
      />
    </svg>
  );
};
