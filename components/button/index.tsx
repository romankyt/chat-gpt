import { ButtonProps } from "@/types/types";
import { FC } from "react";

export const Button: FC<ButtonProps> = ({
  width,
  height,
  isIcon,
  icon,
  type,
  text,
  onClck,
  rounded,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "primary":
        return "#15ABFF";
      case "secondary":
        return "#6D31ED";
      case "accept":
        return "#FF0000";
      case "reject":
        return "#DDF3FF";
      default:
        return "#FFFFFF";
    }
  };

  const getButtonText = () => {
    switch (type) {
      case "primary":
        return "text-white font-sans font-normal text-base leading-6";
      case "secondary":
        return "text-white font-sans font-normal text-sm leading-5";
      case "reject":
        return "text-black font-sans font-normal text-[22px] leading-10";
      case "accept":
        return "text-white font-sans font-normal text-[22px] leading-10";
      default:
        return "";
    }
  };

  return (
    <button
      onClick={onClck}
      className={`w-[${width}] h-[${height}] ${
        rounded === "full"
          ? "rounded-full"
          : rounded === "base"
          ? "rounded"
          : "rounded-[18px]"
      } flex flex-row justify-center items-center `}
      style={{
        backgroundColor: getBackgroundColor(),
        width: width,
        height: height,
      }}
    >
      {isIcon ? (
        <div>{icon}</div>
      ) : (
        <span className={getButtonText()}>{text}</span>
      )}
    </button>
  );
};
