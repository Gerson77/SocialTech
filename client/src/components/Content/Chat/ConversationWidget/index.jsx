import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserService from '../../../../services/UserService';
import UserImage from '../../../UserImage';
import ChatService from '../../../../services/ChatService';
import { getMessagesSuccess } from '../../../../state/slices/messages';

export default function ConversationWidget({ creator, idConvesation }) {
  const [friend, setFriend] = useState({});
  const dispatch = useDispatch();

  async function getInfoFriend(id) {
    const infoFriend = await UserService.getUser(id);
    setFriend(infoFriend);
  }

  async function getMessages(id) {
    const getAllConversations = await ChatService.getMessagesByConversation(id);
    dispatch(getMessagesSuccess(getAllConversations));
  }

  useEffect(() => {
    getInfoFriend(creator);
  }, [creator]);

  return (
    <div
      aria-hidden
      className="overflow-hidden cursor-pointer hover:bg-indigo-400 hover:dark:bg-indigo-950"
      onClick={() => getMessages(idConvesation)}
    >
      <div className="flex items-center h-20 mx-4 border-b-[1px] border-gray-100 dark:border-gray-600">
        <UserImage image={friend.picturePath} />
        <div className="w-full flex flex-col px-2">
          <div className="flex justify-between text-gray-700 dark:text-white">
            <p className="font-bold text-gray-700 dark:text-gray-50">{friend.firstName}</p>
            <span className="font-light text-sm">17:54 PM</span>
          </div>
          <span className="flex overflow-hidden h-6 font-light text-gray-700 dark:text-gray-200">
            Lorem ipsum dolor sit amet ... consectetur adipisicing elit.
          </span>
        </div>
      </div>
    </div>
  );
}

ConversationWidget.propTypes = {
  creator: PropTypes.string.isRequired,
  idConvesation: PropTypes.string.isRequired,
};
