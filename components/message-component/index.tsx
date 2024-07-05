import { MessageProps } from "@/types/types";
import { FC } from "react";
import Image from "next/image";

import botAvatar from "../../assets/images/bot-avatar.png";
import userAvatar from "../../assets/images/user-avatar.png";

export const MessageComponent: FC<MessageProps> = ({
  text,
  isFromChat,
  isLoading,
  avatar,
}) => {
  return (
    <main
      className={`flex w-full flex-row lg:max-w-[40%] ld:w-auto items-center ${
        isFromChat ? "self-start" : "self-end"
      }`}
    >
      {isLoading ? (
        <main className="w-full flex flex-row items-center gap-6 mb-3">
          <div className="w-[43px] h-[43px] rounded-full">
            <Image src={botAvatar} height={43} width={43} alt="avatar" />
          </div>
          <div className="w-[120px] bg-[#F0F9FF] flex justify-center items-center px-5 py-4 rounded-full">
            <span className="typingLoader"></span>
          </div>
        </main>
      ) : isFromChat ? (
        <main className="w-full flex flex-row items-center gap-6 mb-3">
          <div className="w-[43px] h-[43px] rounded-full">
            <Image src={botAvatar} height={43} width={43} alt="avatar" />
          </div>
          <div className="w-auto bg-[#F0F9FF] flex justify-center items-center px-5 py-4 rounded-full">
            <span className="botText">{text}</span>
          </div>
        </main>
      ) : (
        <main className="w-full flex flex-row items-center justify-end gap-6 mb-3">
          <div className="w-auto bg-[#6D31ED] flex justify-center items-center px-5 py-4 rounded-full">
            <span className="userText">{text}</span>
          </div>
          <div className="w-[43px] h-[43px] rounded-full">
            <Image src={userAvatar} height={45} width={45} alt="avatar" />
          </div>
        </main>
      )}
    </main>
  );
};
