import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getFriendsSuccess } from '../state/slices/friend';
import FriendService from '../services/FriendService';

export default function useFriend() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friends);
  const [userProfile, setUserProfile] = useState({});

  async function getFriends(userId) {
    const infoFriend = await FriendService.getListFriends(userId);
    dispatch(
      getFriendsSuccess(infoFriend),
    );
  }

  async function getInfoFriend(idProfile) {
    const infoFriend = await FriendService.getByFriend(idProfile);
    setUserProfile(infoFriend);
  }

  return {
    getFriends, friends, getInfoFriend, userProfile,
  };
}
