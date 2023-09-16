import { IUserRepository } from "../../../users/repositories/user.repository";
import { IConversationRepository } from "../../repository/conversation.repository";

type ConversationRequest = {
  creator: string;
  recipientId: string;
  lastMessage: string;
};

export class ConversationUseCase {
  constructor(private convertationRepository: IConversationRepository, private userRepository: IUserRepository) {}

  async execute(data: ConversationRequest) {
    const sender = await this.userRepository.findById(
      data.creator
    );
    const receiver = await this.userRepository.findById(
      data.recipientId
    );

    if (!sender || !receiver) throw new Error("Params error or user does not exists");

    if (sender === receiver)
      throw new Error("Cannot create Conversation with yourself");


    const conversationExists = await this.convertationRepository.findOneConversation(data)

    if(conversationExists) {
      return conversationExists
    }

    const createdConvesation = await this.convertationRepository.createConversation(data);

    return createdConvesation;
  }
}
