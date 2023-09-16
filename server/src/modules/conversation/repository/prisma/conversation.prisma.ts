import { prismaClient } from "../../../../database/prisma.config";
import { Conversation } from "../../entity/conversation-entity";
import { IConversationRepository } from "../conversation.repository";

export class ConversationPrismaRepository implements IConversationRepository {
  async updateLatestMessage(
    id: string,
    latestMessage: string
  ): Promise<Conversation> {
    const updateMessage = await prismaClient.conversation.update({
      where: {
        id: id,
      },
      data: {
        lastMessage: latestMessage,
        updatedAt: new Date(),
      },
    });

    return updateMessage;
  }

  async findOneConversation(data: Conversation): Promise<Conversation | null> {
    const convesationCreator = await prismaClient.conversation.findFirst({ 
      where: { 
        OR: [ 
          { creator: data.creator, recipientId: data.recipientId }, 
          { creator: data.recipientId, recipientId: data.creator } 
        ] 
      }, 
    });

    return convesationCreator
  }

  async findByConversation(id: string): Promise<Conversation[] | null> {
    const conversationsUser = await prismaClient.conversation.findMany({
      where: {
        OR: [
          {
            creator: {
              endsWith: id,
            },
          },
          { recipientId: { endsWith: id } },
        ],
      },
    });

    return conversationsUser;
  }

  async createConversation(data: Conversation): Promise<Conversation> {
    const newConversation = await prismaClient.conversation.create({
      data: {
        creator: data.creator,
        recipientId: data.recipientId,
        lastMessage: data.lastMessage,
      },
    });

    return newConversation;
  }
}
