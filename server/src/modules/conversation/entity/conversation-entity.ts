type IConversation = {
  creator: string
  recipientId: string
  lastMessage: string
};

export class Conversation {
  creator: string
  recipientId: string
  lastMessage: string

  private constructor(props: IConversation) {
    this.creator = props.creator;
    this.recipientId = props.recipientId
    this.lastMessage = props.lastMessage
  }

  static async createConversation(props: IConversation) {
    const conversation = new Conversation(props);
    return conversation;
  }
}
