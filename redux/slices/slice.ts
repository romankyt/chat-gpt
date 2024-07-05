import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addConversation,
  deleteConversation,
  getAllConversations,
  getConversationHistory,
  getMe,
  sendMessage,
} from "@/requests/requests";
import {
  ChatMessage,
  ChatMessageData,
  Conversation,
  GetMeResponse,
} from "@/types/types";
import { AxiosError } from "axios";

interface IState {
  user: GetMeResponse | null;
  loading: boolean;
  chatLoading: boolean;
  error: string | null;
  conversations: Conversation[];
  conversationHistory: ChatMessage[];
  isSendingMessage: boolean;
}

const initialState: IState = {
  user: null,
  loading: false,
  error: null,
  conversations: [],
  conversationHistory: [],
  chatLoading: false,
  isSendingMessage: false,
};

const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError;
};

const handlePending = (state: IState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: IState, action: any) => {
  state.loading = false;
  if (isAxiosError(action.payload)) {
    state.error = action.payload.response?.data || action.payload.message;
  } else {
    state.error = action.payload as string;
  }
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getMe(token);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const getConversations = createAsyncThunk(
  "user/getConversations",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getAllConversations(token);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const deleteConversationById = createAsyncThunk(
  "user/deleteConversationById",
  async (
    { conversation_id, token }: { conversation_id: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      await deleteConversation(conversation_id, token);
      return conversation_id;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const addNewConversation = createAsyncThunk(
  "user/addNewConversation",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await addConversation(token);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const getConversationById = createAsyncThunk(
  "user/getConversationById",
  async (
    { conversation_id, token }: { conversation_id: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getConversationHistory(conversation_id, token);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const sendUserMessage = createAsyncThunk(
  "user/sendUserMessage",
  async (
    { data, token }: { data: ChatMessageData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await sendMessage(data, token);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.conversationHistory = [];
    },
    resetConversationHistory: (state) => {
      state.conversationHistory = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, handlePending)
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(createUser.rejected, handleRejected)

      .addCase(getConversations.pending, (state) => {
        state.loading = true;
        state.loading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
      })
      .addCase(getConversations.rejected, handleRejected)

      .addCase(deleteConversationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConversationById.fulfilled, (state, action) => {
        state.conversations = state.conversations.filter(
          (conversation) => conversation.id !== action.payload
        );
        state.loading = false;
        state.conversationHistory = [];
      })
      .addCase(deleteConversationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addNewConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewConversation.fulfilled, (state, action) => {
        state.conversations.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getConversationById.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(getConversationById.fulfilled, (state, action) => {
        state.conversationHistory = action.payload;
        state.chatLoading = false;
      })
      .addCase(getConversationById.rejected, (state) => {
        state.chatLoading = false;
      })

      .addCase(sendUserMessage.pending, (state, action) => {
        state.isSendingMessage = true;
        const optimisticMessage: ChatMessage = {
          content: action.meta.arg.data.message,
          conversation_id: action.meta.arg.data.conversation_id,
          user_id: state.user?.id!,
          created_at: new Date().getTime(),
          id: Math.random(),
        };
        state.error = null;

        state.conversationHistory.push(optimisticMessage);
      })
      .addCase(sendUserMessage.fulfilled, (state, action) => {
        state.conversationHistory = action.payload;
        state.isSendingMessage = false;
      })
      .addCase(sendUserMessage.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isSendingMessage = false;
      });
  },
});

export const { resetUser, resetConversationHistory } = userSlice.actions;
export default userSlice.reducer;
