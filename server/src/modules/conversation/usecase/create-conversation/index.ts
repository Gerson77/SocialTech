import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository";
import { ConversationPrismaRepository } from "../../repository/prisma/conversation.prisma";
import { ConversationController } from "./convertation-controller";

const conversationPrismaRepository = new ConversationPrismaRepository()
const userPrismaRepository = new UserPrismaRepository()
const conversationController = new ConversationController(conversationPrismaRepository, userPrismaRepository)

export { conversationController }