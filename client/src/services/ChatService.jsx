import HttpClient from './HttpClient';

class ChatService {
  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_NODE_API_URL}`);
  }

  async listConversations(id) {
    return this.httpClient.get(`/conversation/${id}`);
  }

  async getByConversation(senderId, receiverId) {
    return this.httpClient.get(`/conversation/${senderId}/${receiverId}`);
  }

  async getMessagesByConversation(idConversation) {
    return this.httpClient.get(`/messages/${idConversation}`);
  }
}

export default new ChatService();
