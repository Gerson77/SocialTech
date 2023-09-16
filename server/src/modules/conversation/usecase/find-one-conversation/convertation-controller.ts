import { Request, Response } from "express";
import { IConversationRepository } from "../../repository/conversation.repository";
import { FindOneConversationUseCase } from "./conversation-usecase";

export class FindOneConversationController {
    constructor(private conversationRepository: IConversationRepository){
    }
    async handle(request: Request, response: Response) {
        try{
            const { creator,recipientId  } = request.params
            const findOneConversationUseCase = new FindOneConversationUseCase(this.conversationRepository)
            const result = await findOneConversationUseCase.execute({ creator, recipientId })
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({ error: err.message })
        }
    }
}