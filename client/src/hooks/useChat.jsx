import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatService from '../services/ChatService';

export default function useChat(idConversation) {
  const user = useSelector((state) => state.auth.user);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessage] = useState([]);

  async function getConversations(idUser) {
    const getAllConversations = await ChatService.listConversations(idUser);
    setConversations(getAllConversations);
  }

  async function getMessages(id) {
    const getAllConversations = await ChatService.getMessagesByConversation(id);
    setMessage(getAllConversations);
  }

  useEffect(() => {
    getConversations(user.id);
  }, [user.id]);

  useEffect(() => {
    getMessages(idConversation);
  }, [idConversation]);

  return {
    conversations,
    messages,
    getMessages,
  };
}
