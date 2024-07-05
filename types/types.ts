import { AxiosResponse } from "axios";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { ReactNode } from "react";
export interface IconProps {
  width: number;
  height: number;
  fill?: string;
}

export interface ButtonProps {
  width: string;
  height: string;
  type: "primary" | "secondary" | "accept" | "reject";
  text?: string;
  isIcon?: boolean;
  icon?: ReactNode;
  rounded: "full" | "base" | "18px";
  onClck?: () => void;
}

export interface LoginFormData {
  email: string;
  name?: string;
  password: string;
  confirmPassword?: string;
}

export type IRes<T> = Promise<AxiosResponse<T>>;

export type LoginResponse = {
  authToken: string;
};

export interface LoginData {
  email: string;
  password: string;
}

export type GetMeResponse = {
  id: number;
  created_at: number;
  name: string;
  email: string;
};

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface ChatMessageData {
  conversation_id: number;
  message: string;
}

export type ChatMessage = {
  id: number;
  conversation_id: number;
  content: string;
  user_id: number;
  created_at: number;
};

export type Conversation = {
  id: number;
  user_id: number;
  label: string;
  created_at: number;
};

export type MessageProps = {
  text?: string;
  isFromChat?: boolean;
  avatar?: string;
  isLoading?: boolean;
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationName: string;
  onConfirm: () => void;
}
