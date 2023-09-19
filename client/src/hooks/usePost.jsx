import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PostService from '../services/PostService';
import { getPostsSuccess } from '../state/slices/posts';

export default function usePost() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const [postsByUser, setPostsByUser] = useState([]);

  async function getPosts() {
    const postsList = await PostService.listPosts();
    dispatch(
      getPostsSuccess(postsList),
    );
  }

  async function getPostsByUser(idProfile) {
    const postsList = await PostService.getByPostUser(idProfile);
    setPostsByUser(postsList);
  }

  return {
    getPosts, posts, getPostsByUser, postsByUser,
  };
}
