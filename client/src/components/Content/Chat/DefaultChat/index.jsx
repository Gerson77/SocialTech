import ConversationDefault from '../../../../assets/conversation.png';

export function DefaultChat() {
  return (
    <div className="w-[60%] h-full bg-gray-800 rounded-3xl flex flex-col justify-center items-center">
      <img src={ConversationDefault} className="w-[500px] h-[500px]" alt="" />
      <h2 className="text-white">Inicie a conversa</h2>
    </div>

  );
}
