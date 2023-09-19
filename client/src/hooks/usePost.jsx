import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PostService from '../services/PostService';
import { getPostsSuccess } from '../state/slices/posts';

export default function usePost() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [post, setPost] = useState({});

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

  async function getListPost(postId) {
    const postSingle = await PostService.getSinglePost(postId);
    setPost(postSingle);
  }

  return {
    getPosts, posts, getPostsByUser, postsByUser, post, getListPost,
  };
}
