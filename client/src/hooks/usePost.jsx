import { useDispatch, useSelector } from 'react-redux';
import PostService from '../services/PostService';
import { getPostsSuccess } from '../state/slices/posts';

export default function usePost() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  async function getPosts() {
    const postsList = await PostService.listPosts();
    dispatch(
      getPostsSuccess(postsList),
    );
  }

  return { getPosts, posts };
}
