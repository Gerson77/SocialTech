import {
  MessageCircle, Search, Send, User2,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import {
  createRef, useLayoutEffect,
} from 'react';
import UserPhoto from '../../../assets/user-default.png';
import Textarea from '../../Textarea';
import ConversationWidget from './ConversationWidget';
import { MessageLeft, MessageRight } from './Messages';
import MyFriendList from '../MyFriendList';
import useChat from '../../../hooks/useChat';
import { DefaultChat } from './DefaultChat';
// import ChatService from '../../../services/ChatService';
// import { getAllMessages } from '../../../state/slices/messages';

export default function Chat() {
  const { user } = useSelector((state) => state.auth);
  const { messagesChatCurrent } = useSelector((state) => state.messages);
  // const { messages } = useSelector((state) => state.messages);
  const { friends } = useSelector((state) => state.friends);
  const scrollRef = createRef();

  const { conversations } = useChat();

  // async function getMessages(id) {
  //   const getAllConversations = await ChatService.getMessagesByConversation(id);
  //   getAllMessages(getAllConversations);
  // }

  // useEffect(() => {
  //   conversations.map(({ id }) => getMessages(id));
  // }, [conversations]);

  useLayoutEffect(() => {
    const scrollToBottom = scrollRef.current;
    if (scrollToBottom) {
      scrollToBottom.scrollTop = scrollToBottom.scrollHeight;
    }
  });

  return (
    <div className="flex justify-between m-auto gap-4 max-w-[1600px] pt-24 h-[98vh] min-h-[98vh] max-h-[98vh] px-2">
      <div className="flex flex-col max-w-[20%] w-1/5 bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex items-center py-4 px-2 gap-1 rounded-t-xl font-extrabold text-xl text-white">
          <MessageCircle />
          <h2>
            Messages
          </h2>
        </div>
        <div className="w-full flex items-center relative pb-1">
          <input type="search" placeholder="Search..." className="rounded-md mx-2 w-full bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-600" />
          <Search className="absolute right-4 text-gray-600 dark:text-gray-200 " />
        </div>
        <div className=" overflow-y-auto">
          {conversations.map(({
            id, creator, recipientId,
          }) => (
            <ConversationWidget
              key={id}
              creator={creator === user.id ? recipientId : creator}
              idConvesation={id}
            />
          ))}
        </div>
      </div>

      {messagesChatCurrent.length > 0 ? (
        <div className="w-[60%] h-full bg-gray-300 rounded-3xl relative">
          <div className="flex w-full items-center border-b-[1px] dark:border-gray-700 p-2 rounded-t-xl absolute top-0 bg-gradient-to-r from-white bg-gray-100 dark:bg-gradient-to-r dark:from-gray-700 dark:bg-gray-800">
            <img src={UserPhoto} className="w-16 h-16 mr-2" alt="" />
            <h2 className="font-bold text-gray-600 dark:text-white">Gerson</h2>
          </div>
          <div className="w-full h-full rounded-2xl pt-20 pb-28 bg-gradient-to-r from-white bg-gray-100 dark:bg-gradient-to-r dark:from-gray-950 dark:bg-gray-900">
            <div className="h-full overflow-y-auto  space-y-5 pt-2 pb-2 px-8 " ref={scrollRef}>
              {messagesChatCurrent.map(({ id, messageContent, senderId }) => (
                <div key={id}>
                  {senderId === user.id ? (
                    <MessageRight
                      message={messageContent}
                      UserPhoto={UserPhoto}
                      timesTamp="14:44 PM"
                    />
                  ) : (
                    <MessageLeft
                      message={messageContent}
                      UserPhoto={UserPhoto}
                      timesTamp="17:54 PM"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center rounded-b-xl absolute w-full bottom-0 bg-gradient-to-r from-white bg-gray-100 dark:bg-gradient-to-r dark:from-gray-700 dark:bg-gray-800">
              <div className="my-2 px-4 w-full flex items-center gap-2 rounded-xl relative">
                <Textarea value="teste" placeholder="Digite a mensagem" type="text" onChange={() => {}} />
                <div className="flex items-center justify-center rounded-xl absolute right-8 bg-gray-500 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-900 p-2 cursor-pointer">
                  <Send className="rotate-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DefaultChat />
      )}

      {/* List frends */}
      <div className="w-1/5 h-full bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex flex-col items-center py-2 mx-2">
          <div className="w-full flex items-center py-4 px-2 gap-1 rounded-t-xl font-extrabold text-xl text-white border-b-[1px] border-gray-100 dark:border-gray-600">
            <User2 />
            <h2>
              Friends
            </h2>
          </div>

          <div className="w-full overflow-hidden cursor-pointer font-light text-gray-600 dark:text-gray-100">
            {friends.length > 0 && (
            <div>
              {friends.map(
                ({
                  id, firstName, lastName, occupation, picturePath,
                }) => (
                  <div key={id} className="hover:bg-gray-500 hover:dark:bg-gray-900">
                    <MyFriendList
                      key={id}
                      id={id}
                      firstName={firstName}
                      lastName={lastName}
                      occupation={occupation}
                      picturePath={picturePath}
                    />
                  </div>
                ),
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
