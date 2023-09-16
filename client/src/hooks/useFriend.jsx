import { useDispatch, useSelector } from 'react-redux';
import { getFriendsSuccess } from '../state/slices/friend';
import FriendService from '../services/FriendService';

export default function useFriend() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friends);

  async function getFriends() {
    const infoFriend = await FriendService.getListFriends(user.id);
    dispatch(
      getFriendsSuccess(infoFriend),
    );
  }

  return { getFriends, friends };
}
