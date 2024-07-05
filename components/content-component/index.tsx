"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hooks";
import { Button } from "../button";
import { ChatBotIcon } from "../icons/chat-bot-icon";
import {
  addNewConversation,
  deleteConversationById,
  getConversations,
  resetConversationHistory,
  resetUser,
} from "@/redux/slices/slice";
import { useRouter } from "next/navigation";
import { PlusIcon } from "../icons/plus-icon";
import { ChatComponent } from "../chat-component";
import { useCallback, useEffect, useState } from "react";
import { ConversationItemComponent } from "../conversation-item";
import { DeleteModal } from "../delete-modal";
import Image from "next/image";

import chatAvatar from "../../assets/images/bot-avatar.png";
import { MenuIcon } from "../icons/menu-icon";

export const ContentComponent = () => {
  const [activeConversationId, setActiveConversationId] = useState<
    number | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedConversation, setSelectedConversation] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const authToken = localStorage.getItem("authToken");
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const openDeleteModal = (id: number, name: string) => {
    setSelectedConversation({ id, name });
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    dispatch(resetUser());
    router.push("/auth");
  };

  const changeConversation = useCallback((conversation_Id: number) => {
    setActiveConversationId(conversation_Id);
  }, []);
  const handleAddConversation = useCallback(() => {
    if (authToken) {
      dispatch(addNewConversation(authToken));
    }
  }, [authToken, dispatch]);

  const { conversations, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getConversations(authToken ?? ""));
  }, [authToken, dispatch]);

  useEffect(() => {
    if (!loading && isInitialLoad) {
      setIsInitialLoad(false);
      if (!isInitialLoad && conversations.length < 1) {
        handleAddConversation();
      } else if (conversations.length > 0 && activeConversationId === null) {
        setActiveConversationId(conversations[0].id);
      }
    }
  }, [
    loading,
    conversations,
    activeConversationId,
    handleAddConversation,
    isInitialLoad,
  ]);

  useEffect(() => {
    if (conversations.length > 1) {
      setActiveConversationId(conversations[0].id);
    }
  }, []);

  const handleDeleteConversation = useCallback(() => {
    if (selectedConversation) {
      if (authToken) {
        dispatch(
          deleteConversationById({
            conversation_id: selectedConversation.id,
            token: authToken,
          })
        );
        setIsModalOpen(false);
      }
    }
  }, [authToken, dispatch, selectedConversation]);

  return (
    <main className="w-full h-full flex flex-col">
      <header
        className="w-full h-[70px] flex flex-row items-center justify-between pl-4 pr-6"
        style={{
          boxShadow:
            "0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        }}
      >
        <ChatBotIcon />
        <Button
          type="secondary"
          width="98px"
          height="36px"
          text="Log Out"
          rounded="base"
          onClck={handleLogOut}
        />
      </header>
      <section className="w-full h-full lg:gap-6 lg:pt-6 lg:pb-3 lg:pl-3 lg:pr-2 flex flex-row">
        <div
          className={`w-[80%] lg:w-[32%] lg:flex lg:flex-col gap-1 h-full absolute lg:relative bg-white transition-transform duration-300 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <main className="w-full h-[58px] rounded-md pl-3 pr-2 flex flex-row items-center justify-between bg-[#15ABFF]">
            <span className="conversationTitle">Conversations</span>
            <button onClick={() => handleAddConversation()}>
              <PlusIcon width={24} height={24} />
            </button>
          </main>
          <main
            className={`w-full h-full flex flex-col gap-2 rounded-r-md bg-[#F8F9FA] ${
              loading && "justify-center items-center"
            }`}
            style={{
              boxShadow:
                "0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)",
            }}
          >
            {loading ? (
              <div className="flex justify-self-center self-center h-[79px]">
                <div className="loader"></div>
              </div>
            ) : (
              conversations &&
              conversations.map((item) => (
                <ConversationItemComponent
                  id={item.id}
                  created_at={item.created_at}
                  user_id={item.user_id}
                  key={item.id}
                  onDeletePress={() =>
                    openDeleteModal(item.id, `Conversation ${item.id}`)
                  }
                  isActive={item.id === activeConversationId}
                  onClick={() => changeConversation(item.id)}
                  conversationName={`Conversation ${item.id}`}
                  isDeleteShown={conversations.length > 1}
                />
              ))
            )}
          </main>
        </div>
        <main className="lg:w-[66%] w-full h-full flex flex-col gap-2">
          <main className="bg-[#15ABFF] w-full h-[58px] flex px-4 flex-row items-center justify-between rounded">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[43px] h-[43px] rounded-full">
                <Image src={chatAvatar} alt="bot-avatar" />
              </div>
              <span className="chatTitle">Chatbot</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden block">
              <MenuIcon width={24} height={24} />
            </button>
          </main>
          <div className="w-full h-full">
            <ChatComponent conversation_Id={activeConversationId ?? -1} />
          </div>
        </main>
      </section>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConversation}
        conversationName={selectedConversation?.name ?? ""}
      />
    </main>
  );
};
