import { FC } from "react";
import { DeleteIcon } from "../icons/delete-icon";

interface Props {
  id: number;
  user_id: number;
  created_at: number;
  isActive?: boolean;
  onDeletePress: () => void;
  onClick?: () => void;
  conversationName: string;
  isDeleteShown?: boolean;
}

export const ConversationItemComponent: FC<Props> = ({
  id,
  user_id,
  created_at,
  isActive,
  onDeletePress,
  onClick,
  conversationName,
  isDeleteShown,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[58px] rounded-md pl-3 pr-2 flex flex-row items-center justify-between ${
        isActive ? "bg-[#6D31ED]" : "lg:bg-[#DDF3FF] bg-[#DEE1E6]"
      }`}
      style={{
        boxShadow:
          "0px 0px 1px rgba(23, 26, 31, 0.07), 0px 0px 2px rgba(23, 26, 31, 0.12)",
      }}
    >
      <span
        className={`text-base font-normal leading-5 ${
          isActive ? "text-white" : "text-[#171A1F]"
        }`}
      >
        {conversationName}
      </span>
      {isDeleteShown ? (
        <button onClick={onDeletePress}>
          <DeleteIcon
            width={24}
            height={24}
            fill={isActive ? "white" : "black"}
          />
        </button>
      ) : (
        <></>
      )}
    </button>
  );
};
