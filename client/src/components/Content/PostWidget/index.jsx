/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageSquare,
  MoreVertical,
  Pencil,
  Send,
  Share2,
  UserMinus,
  UserPlus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';

import ModalPost from '../ModalPost';
import ImagePost from '../../ImagePost';
import UserImage from '../../UserImage';
import useActionUser from '../../../hooks/useActionUser';
import TogglePost from '../TogglePost';
import PostService from '../../../services/PostService';
import BoxDialog from '../BoxDialog';
import usePost from '../../../hooks/usePost';
import CommentService from '../../../services/CommentService';
import useNotification from '../../../hooks/useNotification';
import Textarea from '../../Textarea';

export default function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const user = useSelector((state) => state.auth.user);
  const isLiked = likes.find((likeAdd) => likeAdd === user.id);
  const isFriend = user.friends.find((result) => result === postUserId);
  const [isComments, setIsCommnets] = useState(false);
  const [isOpenOptionPost, setIsOpenOptionPost] = useState(false);

  const [editPost, setEditPost] = useState(null);
  const [editImage, setEditImage] = useState(picturePath);
  const [editDescription, setEditDescription] = useState(description);
  const [modalDialog, setModalDialog] = useState(false);

  const [addCommnets, setAddComments] = useState('');
  const [viewMore, setViewMore] = useState(false);

  const { addNewNotification } = useNotification();

  const {
    handleLike, handleAddFriend, handleRemoveFriend, handleRemoveLike,
  } = useActionUser(postId, user.id);

  const { getPosts } = usePost();

  function toggleComment() {
    setIsCommnets((prevState) => !prevState);
  }

  function handleOptionActionPost() {
    setIsOpenOptionPost((prevState) => !prevState);
  }

  function toggleEditPost() {
    setEditImage(picturePath);
    setEditDescription(description);
    setEditPost((prevState) => !prevState);
  }

  async function handleEditPost(event) {
    event.preventDefault();

    if (!editDescription && !editImage) return;

    const post = {
      description: editDescription,
      picturePath: editImage,
    };

    try {
      await PostService.editPost(postUserId, postId, post);
      getPosts();
    } catch {} finally {
      setEditPost(null);
      setEditImage(picturePath);
      setEditDescription(description);
    }
  }

  function handleBoxDialog() {
    setModalDialog((prevState) => !prevState);
  }

  async function handleRemovePost() {
    await PostService.removePost(postUserId, postId);
    getPosts();
    setModalDialog(false);
  }

  async function handleAddComments() {
    const comment = {
      friendId: user.id,
      firstName: user.firstName,
      userPicturePath: user.picturePath,
      comment: addCommnets,
    };
    const response = await CommentService.addComments(postId, comment);

    if (response) {
      if (user.id !== postUserId) {
        const notification = {
          action: 'comments',
          firstName: user.firstName,
          userId: postUserId,
          userPicturePath: user.picturePath,
          postPicturePath: picturePath,
          idPost: postId,
          contentComment: addCommnets,
        };

        addNewNotification(notification);
      }

      setAddComments('');
      getPosts();
    }
  }

  const handleKeyComment = (e) => {
    if (e.key === 'Enter' || e.key === 'NumPadEnter') {
      handleAddComments();
    }
  };

  useEffect(() => {
    document.body.style.overflow = isComments ? 'hidden' : 'unset';
  }, [isComments]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl">
      <div className="flex bg-white dark:bg-gray-800 flex-col px-4 rounded-2xl">
        <div className="flex items-center pb-2 justify-between" />
        <div className="flex justify-between py-2 relative">
          <div className="flex flex-row items-center">
            <UserImage
              image={userPicturePath}
              alt="photo"
              className="w-16 h-16 p-1 rounded-full"
            />
            <div className="ml-4">
              <Link to={`/profile/${postUserId}`}>
                <h2 className="font-bold dark:text-gray-50 text-gray-700 hover:dark:text-sky-500 hover:text-sky-800">
                  {name}
                </h2>
              </Link>
              <span>{location}</span>
            </div>
          </div>
          {user.id !== postUserId ? (
            <div>
              {isFriend ? (
                <UserMinus
                  className="dark:text-sky-300 cursor-pointer text-gray-100 w-10 h-10 p-2 bg-sky-800 hover:bg-sky-900 rounded-full"
                  onClick={() => handleRemoveFriend(user.id, postUserId)}
                />
              ) : (
                <UserPlus
                  className="dark:text-sky-300 cursor-pointer text-gray-100 w-10 h-10 p-2 bg-sky-800 hover:bg-sky-900 rounded-full"
                  onClick={() => handleAddFriend(user.id, postUserId)}
                />
              )}
            </div>
          ) : (
            <div>
              {editPost ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleEditPost}
                    className="bg-sky-700  border-[1px] border-sky-600 rounded-md p-2 text-white font-bold hover:bg-sky-600"
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    onClick={toggleEditPost}
                    className="bg-gray-700  border-[1px] border-gray-500 rounded-md p-2 text-white font-bold hover:bg-gray-900"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div aria-hidden="true" onClick={handleOptionActionPost}>
                  {!isOpenOptionPost ? (
                    <div className="absolute top-1 right-[-8px] flex flex-col gap-2 opacity-70 hover:dark:bg-gray-600 hover:bg-gray-200 hover:dark:text-gray-50 rounded-full p-2 cursor-pointer ">
                      <MoreVertical />
                    </div>
                  ) : (
                    <TogglePost
                      toggleEditPost={toggleEditPost}
                      toggleDeletePost={handleBoxDialog}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {modalDialog && (
          <BoxDialog
            cancelAcion={handleBoxDialog}
            handleRemovePost={handleRemovePost}
            title="Deletar"
            textEvent="Deseja deletar esse post?"
          />
        )}

        {/* Edição de post */}
        {!editPost ? (
          <div className="py-2">
            {description.length > 200 ? (
              <div>
                <p className={`${viewMore ? 'h-auto' : 'h-[62px]'} dark:text-gray-200 text-gray-600 pb-2 overflow-y-hidden`}>
                  {description}
                </p>
                <div className="flex justify-end items-center">
                  <div className="flex justify-end items-center pt-2 hover:text-sky-600  text-sky-400  cursor-pointer">
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
              <p className=" dark:text-gray-200 text-gray-600 pb-2">
                {description}
              </p>
            )}

            {picturePath && (
              <ImagePost
                toggleComment={toggleComment}
                borderRadius="rounded-2xl"
                image={picturePath}
                alt="post"
              />
            )}
          </div>
        ) : (
          <div className="py-2">
            <Textarea
              type="text"
              value={editDescription}
              rows="1"
              onChange={(event) => setEditDescription(event.target.value)}
              rounded="rounded-md"
              placeholder="Comments"
            >
              {editDescription}
            </Textarea>
            {editImage && (
            <div className="flex items-center justify-center hover:cursor-pointer dark:text-gray-800 text-gray-50">
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setEditImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="w-full h-full">
                    <div
                      {...getRootProps()}
                      className="border-dashed border-[2px] border-sky-500 cursor-pointer flex items-center justify-center"
                    >
                      <input {...getInputProps()} />
                      {editImage === picturePath ? (
                        <ImagePost
                          image={picturePath}
                          alt="post"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full object-contain">
                          <img
                            src={URL.createObjectURL(editImage) || picturePath}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                      )}
                      <div className="opacity-90 shadow-lg shadow-gray-500/50 dark:shadow-gray-800/50 bg-gray-800 z-10 absolute rounded-full w-32 h-32 flex items-center justify-center text-green-500">
                        <Pencil />
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
            )}
          </div>
        )}

        <div className="flex justify-between py-2">
          <div className="flex gap-2">
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
            {likes.length}
            <MessageSquare
              onClick={toggleComment}
              className="cursor-pointer text-gray-600 dark:text-gray-200"
            />
            {comments.length}
          </div>
          <div>
            <Share2 className="cursor-pointer text-gray-600 dark:text-gray-200" />
          </div>
        </div>
        {/* Add Comments */}
        <div className="flex items-center justify-between gap-4 pb-2">
          <UserImage
            image={user.picturePath}
            alt=""
          />
          <Textarea
            type="text"
            size="0"
            value={addCommnets}
            onKeyDown={handleKeyComment}
            onChange={(event) => setAddComments(event.target.value)}
            className="w-[86%] dark:bg-gray-700 bg-gray-100 outline-none dark:text-gray-50 text-gray-500 rounded-full p-4 my-4 border-[1px] dark:border-gray-600 border-gray-200"
            placeholder="What's on your mind..."
          >
            {addCommnets}
          </Textarea>
          <Send className="w-8 h-8 cursor-pointer hover:dark:text-gray-100 hover:text-gray-600 rotate-45 mr-2" onClick={handleAddComments} />
        </div>
        {/* List Comments */}
        {isComments && (
          <ModalPost
            toggleComment={toggleComment}
            postId={postId}
            postUserId={postUserId}
            likes={likes}
          />
        )}
      </div>
    </div>
  );
}

PostWidget.propTypes = {
  postId: PropTypes.string.isRequired,
  postUserId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
  userPicturePath: PropTypes.string,
  comments: PropTypes.array.isRequired,
  likes: PropTypes.array.isRequired,
};

PostWidget.defaultProps = {
  userPicturePath: 'user.png',
  picturePath: 'user.png',
};
