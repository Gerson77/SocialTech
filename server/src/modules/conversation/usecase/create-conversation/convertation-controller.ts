import { Request, Response } from "express";
import { IConversationRepository } from "../../repository/conversation.repository";
import { ConversationUseCase } from "./conversation-usecase";
import { IUserRepository } from "../../../users/repositories/user.repository";

export class ConversationController {
    constructor(private conversationRepository: IConversationRepository, private userRepository: IUserRepository){
    }
    async handle(request: Request, response: Response) {
        try{
            const {creator, recipientId} = request.body
            const conversationUseCase = new ConversationUseCase(this.conversationRepository, this.userRepository)
            const result = await conversationUseCase.execute({ creator, recipientId, lastMessage: ''})
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({ error: err.message })
        }
    }
}