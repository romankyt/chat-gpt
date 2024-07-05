"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "../button";
import { SendIcon } from "../icons/send-icon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { getConversationById, sendUserMessage } from "@/redux/slices/slice";
import { MessageComponent } from "../message-component";
import { ChatMessageData } from "@/types/types";

interface Props {
  conversation_Id: number;
}

export const ChatComponent: FC<Props> = ({ conversation_Id }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [formatedDate, setFormatedDate] = useState<string>("");
  const [messageValue, setMessageValue] = useState<string>("");

  const dispatch = useAppDispatch();

  const { conversationHistory, chatLoading, isSendingMessage } = useAppSelector(
    (state) => state.user
  );

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      if (conversation_Id !== -1) {
        dispatch(
          getConversationById({
            conversation_id: conversation_Id,
            token: authToken,
          })
        );
      }
    }
  }, [authToken, conversation_Id, dispatch]);

  useEffect(() => {
    if (conversationHistory.length > 0) {
      const firstItemCreatedAt = conversationHistory[0].created_at;
      setFormatedDate(formatTimestamp(firstItemCreatedAt));
    }
  }, [conversationHistory]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(event.target.value);
  };

  const handleSendMessage = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken && messageValue.trim() !== "") {
      const messageData: ChatMessageData = {
        conversation_id: conversation_Id,
        message: messageValue,
      };
      dispatch(sendUserMessage({ data: messageData, token: authToken }));
      setMessageValue("");
    }
  };

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <section
        className="w-full h-[90%] flex flex-col rounded overflow-hidden"
        style={{
          boxShadow:
            "0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        }}
      >
        <section className="w-full h-full flex flex-col items-center pl-3 pr-5 py-4 overflow-y-scroll">
          <span className="dateText">{formatedDate}</span>
          {chatLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : (
            conversationHistory &&
            conversationHistory.map((item, index) => (
              <MessageComponent
                key={item.id}
                isFromChat={item.user_id === null}
                text={item.content}
              />
            ))
          )}
          {isSendingMessage && (
            <MessageComponent
              isFromChat={true}
              isLoading={isSendingMessage ? true : false}
            />
          )}
        </section>
      </section>

      <div
        className={`w-full h-[73px] text-black md:rounded-full md:px-5 px-2 flex flex-row items-center justify-between ${
          isFocused
            ? "border-t-2 border-[#6D31ED] md:border-2 md:border-[#6D31ED]"
            : "border-none"
        }`}
        style={{
          boxShadow:
            "0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        }}
      >
        <input
          type="text"
          placeholder="Reply to Chatbot"
          className="w-full h-[90%]"
          style={{
            outline: isFocused ? "none" : "",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={messageValue}
          onChange={handleInputChange}
        />
        <div className=" ">
          <Button
            width="43px"
            height="43px"
            rounded="full"
            type="secondary"
            isIcon
            icon={<SendIcon width={24} height={24} />}
            onClck={handleSendMessage}
          />
        </div>
      </div>
    </main>
  );
};
