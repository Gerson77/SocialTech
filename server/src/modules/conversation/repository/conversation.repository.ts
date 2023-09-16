import { Conversation } from "../entity/conversation-entity";

type ConversationRequest = {
  creator: string;
  recipientId: string;
};

export interface IConversationRepository {
  createConversation(data: Conversation): Promise<Conversation>;
  findByConversation(id: string): Promise<Conversation[] | null>;
  findOneConversation(data: ConversationRequest): Promise<Conversation | null>;
  updateLatestMessage(id: string, latestMessage: string): Promise<Conversation>
}
