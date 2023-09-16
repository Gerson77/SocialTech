import { useSelector } from 'react-redux';
import FriendService from '../services/FriendService';
import PostService from '../services/PostService';
import useInfoUser from './useInfoUser';
import useFriend from './useFriend';
import usePost from './usePost';
import useNotification from './useNotification';

export default function useActionUser(postId, userId) {
  const { getInfoUser } = useInfoUser();
  const { getFriends } = useFriend();
  const { getPosts } = usePost();
  const { addNewNotification } = useNotification();
  const { id, firstName, picturePath } = useSelector((state) => state.auth.user);

  async function handleLike() {
    const response = await PostService.patchLike(postId, userId);

    if (userId !== response.userId) {
      const notification = {
        action: 'likes',
        firstName,
        userId: response.userId,
        userPicturePath: picturePath,
        postPicturePath: response.picturePath,
        idPost: postId,
      };

      addNewNotification(notification);
    }
    getPosts();

    return response;
  }

  async function handleRemoveLike() {
    await PostService.removeLike(postId, userId);
    getPosts();
  }

  async function handleAddFriend(idUser, friendId) {
    await FriendService.addFriend(idUser, friendId);

    if (id !== friendId) {
      const notification = {
        action: 'follow',
        userId: friendId,
        firstName,
        userPicturePath: picturePath,
      };

      addNewNotification(notification);
    }

    getInfoUser();
    getFriends();
  }

  async function handleRemoveFriend(idUser, friendId) {
    await FriendService.removedFriend(idUser, friendId);
    getInfoUser();
    getFriends();
  }

  return {
    handleLike, handleRemoveLike, handleAddFriend, handleRemoveFriend,
  };
}
