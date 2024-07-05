import { baseUrl, endpoints } from "@/constants/endpoints";
import {
  ChatMessage,
  ChatMessageData,
  Conversation,
  GetMeResponse,
  LoginData,
  LoginResponse,
  SignUpData,
} from "@/types/types";
import axios, { AxiosResponse } from "axios";

export const login = async (
  data: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await axios.post(`${baseUrl}${endpoints.login}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMe = async (
  token: string
): Promise<AxiosResponse<GetMeResponse>> => {
  try {
    const response = await axios.get(`${baseUrl}${endpoints.getMe}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (
  data: SignUpData
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await axios.post(`${baseUrl}${endpoints.signUp}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (
  data: ChatMessageData,
  token: string
): Promise<AxiosResponse<ChatMessage[]>> => {
  try {
    const response = await axios.post(`${baseUrl}${endpoints.message}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteConversation = async (
  conversation_id: number,
  token: string
): Promise<AxiosResponse<void>> => {
  try {
    const response = await axios.delete(
      `${baseUrl}${endpoints.deleteConversation(conversation_id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Delete conversation error:", error);
    throw error;
  }
};

export const getConversationHistory = async (
  conversation_id: number,
  token: string
): Promise<AxiosResponse<ChatMessage[]>> => {
  try {
    const response = await axios.get(
      `${baseUrl}${endpoints.getConversationHistory(conversation_id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Get conversation history error:", error);
    throw error;
  }
};

export const getAllConversations = async (
  token: string
): Promise<AxiosResponse<Conversation[]>> => {
  try {
    const response = await axios.get(
      `${baseUrl}${endpoints.getAllConversations}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Get all conversations error:", error);
    throw error;
  }
};

export const addConversation = async (
  token: string
): Promise<AxiosResponse<Conversation>> => {
  try {
    const response = await axios.post(
      `${baseUrl}${endpoints.addConversation}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Add conversation error:", error);
    throw error;
  }
};
