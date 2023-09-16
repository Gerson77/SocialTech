import { IConversationRepository } from "../../repository/conversation.repository";

type ConversationRequest = {
  creator: string;
  recipientId: string;
};

export class FindOneConversationUseCase {
  constructor(private conversationRepository: IConversationRepository) {}

  async execute(data: ConversationRequest) {
    const sender = await this.conversationRepository.findByConversation(
      data.creator
    );
    const receiver = await this.conversationRepository.findByConversation(
      data.recipientId
    );

    if (!sender || !receiver) throw new Error("Params error");

    console.log(data)

    const conversation = await this.conversationRepository.findOneConversation(
      data, 
    );

    if (!conversation) {
      throw new Error("Conversation not started");
    }

    return conversation;
  }
}
