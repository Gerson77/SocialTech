/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import {
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
import { useDispatch, useSelector } from 'react-redux';
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
import { getByPostSuccess } from '../../../state/slices/postSingle';

export default function PostSingle() {
  const {
    picturePath,
    description,
    userId,
    id,
    userPicturePath,
    location,
    firstName,
    lastName,
    likes,
    comments,
  } = useSelector((state) => state.postSingle.post);

  const user = useSelector((state) => state.auth.user);
  const isLiked = likes?.find((like) => like === user.id);
  const isFriend = user.friends.find((result) => result === userId);
  const [isComments, setIsCommnets] = useState(false);
  const [isOpenOptionPost, setIsOpenOptionPost] = useState(false);
  const dispatch = useDispatch();

  const [editPost, setEditPost] = useState(null);
  const [editImage, setEditImage] = useState(picturePath);
  const [editDescription, setEditDescription] = useState(description);
  const [modalDialog, setModalDialog] = useState(false);

  const [addCommnets, setAddComments] = useState('');

  const { addNewNotification } = useNotification();

  const {
    handleLike, handleAddFriend, handleRemoveFriend, handleRemoveLike,
  } = useActionUser(id, user.id);

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

    const postResult = {
      description: editDescription,
      picturePath: editImage,
    };

    try {
      const updatePost = await PostService.editPost(userId, id, postResult);
      dispatch(getByPostSuccess(updatePost));
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
    await PostService.removePost(userId, id);
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
    const response = await CommentService.addComments(id, comment);

    if (response) {
      if (user.id !== userId) {
        const notification = {
          action: 'comments',
          firstName: user.firstName,
          userId,
          userPicturePath: user.picturePath,
          postPicturePath: picturePath,
          idPost: id,
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
              <Link to={`/profile/${userId}`}>
                <h2 className="font-bold dark:text-gray-50 text-gray-700 hover:dark:text-sky-500 hover:text-sky-800">
                  {`${firstName} ${lastName}`}
                </h2>
              </Link>
              <span>{location}</span>
            </div>
          </div>
          {user.id !== userId ? (
            <div>
              {isFriend ? (
                <UserMinus
                  className="dark:text-sky-300 cursor-pointer text-gray-100 w-10 h-10 p-2 bg-sky-800 hover:bg-sky-900 rounded-full"
                  onClick={() => handleRemoveFriend(user.id, userId)}
                />
              ) : (
                <UserPlus
                  className="dark:text-sky-300 cursor-pointer text-gray-100 w-10 h-10 p-2 bg-sky-800 hover:bg-sky-900 rounded-full"
                  onClick={() => handleAddFriend(user.id, userId)}
                />
              )}
            </div>
          ) : (
            <div>
              {editPost ? (
                <div className="flex gap-2">
                  <button type="button" onClick={handleEditPost} className="bg-green-600 rounded-md p-2 text-white font-bold hover:bg-green-700">Enviar</button>
                  <button type="button" onClick={toggleEditPost} className="bg-red-600 rounded-md p-2 text-white font-bold hover:bg-red-700">Cancelar</button>
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
                      toogleDeletePost={handleBoxDialog}
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
            <p className="dark:text-gray-200 text-gray-600 pb-2">
              {description}
            </p>
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
            <textarea
              value={editDescription}
              rows="1"
              onChange={(event) => setEditDescription(event.target.value)}
              className="w-full rounded-md p-2 mb-2 outline-none bg-gray-100 dark:bg-gray-700 dark:text-white"
            >
              {editDescription}
            </textarea>
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
        <div className="flex items-center justify-between gap-2 pb-2">
          <UserImage
            image={user.picturePath}
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <input
            type="text"
            value={addCommnets}
            onKeyDown={handleKeyComment}
            onChange={(event) => setAddComments(event.target.value)}
            className="w-[86%] dark:bg-gray-700 bg-gray-100 outline-none dark:text-gray-50 text-gray-500 rounded-full p-4 my-4 border-[1px] dark:border-gray-600 border-gray-200"
            placeholder="What's on your mind..."
          />
          <Send className="w-8 h-8 cursor-pointer hover:dark:text-gray-100 hover:text-gray-600 rotate-45 mr-2" onClick={handleAddComments} />
        </div>
        {/* List Comments */}
        {isComments && (
          <ModalPost
            toggleComment={toggleComment}
            postId={id}
            postUserId={userId}
            likes={likes}
          />
        )}
      </div>
    </div>
  );
}
