import { ModalProps } from "@/types/types";
import { FC } from "react";
import { Button } from "../button";

export const DeleteModal: FC<ModalProps> = ({
  conversationName,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <main className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[82%] lg:w-[30%] md:w-[50%] md:h-[290px] h-[220px] lg:h-[250px] flex flex-col bg-[#6D31ED] items-center justify-between rounded-[30px] pt-10 pb-8 px-8">
        <span className="modalText">{`Are you sure you want to delete ${conversationName}`}</span>
        <div className="w-[80%] flex flex-row items-center justify-between">
          <Button
            type="reject"
            text="No"
            rounded="18px"
            width="100px"
            height="44px"
            onClck={onClose}
          />
          <Button
            type="accept"
            text="Yes"
            rounded="18px"
            width="100px"
            height="44px"
            onClck={onConfirm}
          />
        </div>
      </div>
    </main>
  );
};
