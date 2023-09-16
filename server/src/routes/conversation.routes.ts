import { Router } from "express";
import { conversationController } from "../modules/conversation/usecase/create-conversation";
import { findConversationController } from "../modules/conversation/usecase/find-conversation";
import { findOneconversationController } from "../modules/conversation/usecase/find-one-conversation";

const conversationRouter = Router();

conversationRouter.post("/conversation", async (request, response) => {
  await conversationController.handle(request, response);
});

conversationRouter.get('/conversation/:userId', async (request, response) => {
  await findConversationController.handle(request, response)
})

// get one conversation
conversationRouter.get('/conversation/:creator/:recipientId', async (request, response) => {
  await findOneconversationController.handle(request, response)
})

export { conversationRouter };
