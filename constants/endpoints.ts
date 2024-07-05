export const baseUrl = "https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz";

export const endpoints = {
  login: "/auth/login",
  getMe: "/auth/me",
  signUp: "/auth/signup",
  message: "/chat",
  deleteConversation: (conversation_id: number) =>
    `/conversation/${conversation_id}`,
  getConversationHistory: (conversation_id: number) =>
    `/conversation/${conversation_id}`,
  getAllConversations: "/conversation",
  addConversation: "/conversation",
};
