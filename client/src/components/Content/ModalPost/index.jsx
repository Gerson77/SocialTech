import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  ChevronDown,
  ChevronUp,
  Heart, Send, Share2, XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Comments from '../Comments';

import CommentService from '../../../services/CommentService';
import PostService from '../../../services/PostService';
import UserImage from '../../UserImage';
import useActionUser from '../../../hooks/useActionUser';
import Textarea from '../../Textarea';

export default function ModalPost({ toggleComment, postId, likes }) {
  const [allComments, setAllComments] = useState([]);
  const [post, setPost] = useState({});
  const user = useSelector((state) => state.auth.user);
  const isLiked = likes.find((likeAdd) => likeAdd === user.id);
  const [addCommnets, setAddComments] = useState('');
  const [viewMore, setViewMore] = useState(false);

  const {
    picturePath, description,
  } = post;

  const {
    handleLike, handleRemoveLike,
  } = useActionUser(postId, user.id);

  async function getComments() {
    const postsList = await CommentService.listComments(postId);
    setAllComments(postsList);
  }

  useEffect(() => {
    getComments();
  }, [postId]);

  useEffect(() => {
    async function getListPost() {
      const postSingle = await PostService.getSinglePost(postId);
      setPost(postSingle);
    }
    getListPost();
  }, [postId]);

  async function handleAddComments() {
    const comment = {
      friendId: user.id,
      firstName: user.firstName,
      userPicturePath: user.picturePath,
      comment: addCommnets,
    };
    const response = await CommentService.addComments(postId, comment);

    if (response) {
      setAddComments('');

      getComments();
    }
  }

  const handleKeyComment = (e) => {
    if (e.key === 'Enter' || e.key === 'NumPadEnter') {
      handleAddComments();
    }
  };

  return createPortal(
    <div className=" w-full z-20 animatecss animatecss-fadeIn h-screen flex items-center justify-center fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-gray-900 bg-opacity-70 backdrop-blur-sm">
      <div
        className={
          picturePath ? 'w-full max-w-[70%] h-[80vh]' : 'w-full max-w-[40%] h-[80vh]'
        }
      >
        <div
          className="fixed right-0 top-1 cursor-pointer w-10 h-10 m-4 bg-white dark:bg-gray-700 rounded-full"
        >
          <XCircle onClick={toggleComment} className="w-full h-full text-gray-900 dark:text-white rounded-full" />
        </div>
        <div className="w-full h-full flex relative justify-center overflow-hidden">
          {/* Image post */}
          <div
            className={`${picturePath ? 'w-[64%]' : 'hidden'} max-h-[80vh] dark:bg-gray-100 bg-gray-900 dark:bg-opacity-50 bg-opacity-50 rounded-l-2xl`}
          >
            {picturePath && (
              <img
                className="w-full h-full rounded-l-xl object-contain"
                alt="user"
                src={`${import.meta.env.VITE_NODE_API_URL}/assets/${picturePath}`}
              />
            )}
          </div>
          {/*  Comments */}
          <div
            className={`flex flex-col justify-between ${
              picturePath ? 'w-[36%]' : 'w-full rounded-xl'
            } h-full overflow-hidden dark:bg-gray-700 bg-gray-100 rounded-r-2xl`}
          >
            <div className="w-full pb-[92px] overflow-y-auto relative">
              <div className="bg-white dark:bg-gray-800 sticky top-0">
                <div className="w-full flex items-center gap-2 px-2 py-4">
                  <UserImage
                    image={post.userPicturePath}
                    className="w-[64px] h-[64px] rounded-full"
                    alt="user"
                  />
                  <h2 className=" text-gray-800 dark:text-gray-50">
                    {post.firstName}
                  </h2>
                </div>
                {description?.length > 200 ? (
                  <div>
                    <p className={`${viewMore ? 'h-auto' : 'h-[62px]'} px-2 text-gray-800 dark:text-gray-50 overflow-y-hidden`}>
                      {description}
                    </p>
                    <div className="flex justify-end items-center">
                      <div className="flex justify-end items-center pt-2 hover:text-sky-600 text-sky-400 cursor-pointer">
                        <span
                          onClick={() => setViewMore(!viewMore)}
                          aria-hidden="true"
                        >
                          {!viewMore ? 'ver mais' : 'ver menos'}
                        </span>
                        {!viewMore ? <ChevronDown /> : <ChevronUp />}
                      </div>
                    </div>
                  </div>

                ) : (
                  <p className=" px-2 text-gray-800 dark:text-gray-50">
                    {description}
                  </p>
                )}
                {/* actions */}
                <div className="flex justify-between gap-2 p-2 text-gray-200">
                  {isLiked ? (
                    <Heart
                      className="cursor-pointer text-sky-500 fill-sky-500"
                      onClick={handleRemoveLike}
                    />
                  ) : (
                    <Heart
                      className="cursor-pointer text-gray-600 dark:text-gray-200"
                      onClick={handleLike}
                    />
                  )}
                  <Share2 />
                </div>
              </div>
              <div
                className="w-full flex flex-col bg-gray-50 dark:bg-gray-500"
              >
                <div className="h-full px-2 text-gray-600 dark:text-gray-50">
                  {allComments.map(({
                    id, friendId, comment, firstName, userPicturePath,
                  }) => (
                    <Comments
                      key={id}
                      id={id}
                      friendId={friendId}
                      firstName={firstName}
                      postId={postId}
                      getComments={getComments}
                      image={`${
                        import.meta.env.VITE_NODE_API_URL
                      }/assets/${userPicturePath}`}
                      text={comment}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={`${post.picturePath ? 'absolute w-[36%]' : 'absolute w-full'} flex flex-col bottom-0`}>
              <div className={`flex justify-between gap-2 items-center bg-white dark:bg-gray-800 px-2 ${post.picturePath ? 'rounded-br-2xl' : ' rounded-b-2xl'}`}>
                <UserImage
                  image={user.picturePath}
                  className="w-[64px] h-[64px] rounded-full"
                  alt=""
                />
                <Textarea
                  type="text"
                  rounded="rounded-2xl"
                  value={addCommnets}
                  onKeyDown={handleKeyComment}
                  onChange={(event) => setAddComments(event.target.value)}
                  placeholder="What's on your mind..."
                >
                  {addCommnets}
                </Textarea>
                <Send
                  onClick={handleAddComments}
                  className="w-8 h-8 cursor-pointer text-gray-500 dark:text-gray-50 hover:text-gray-800 hover:dark:text-gray-100 rotate-45 mr-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-post'),
  );
}

ModalPost.propTypes = {
  toggleComment: PropTypes.func.isRequired,
};
