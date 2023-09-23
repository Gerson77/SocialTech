import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentService from '../../../services/CommentService';
import usePost from '../../../hooks/usePost';

export default function Comments({
  id, friendId, firstName, image, text, postId, getComments,
}) {
  const { getPosts } = usePost();
  const { user } = useSelector((state) => state.auth);

  const [viewMore, setViewMore] = useState(false);

  async function handleRemoveComments() {
    await CommentService.removeComments(postId, id);
    getComments();
    getPosts();
  }

  return (
    <div>
      {text.length >= 47 ? (
        <div className="w-full flex border-t-[1px] dark:border-gray-400 border-gray-200 group gap-2 relative">
          <div className="w-10 mt-2">
            <img src={image} alt="user" className="w-10 h-10 rounded-full" />
          </div>
          <div className="w-full mt-2 flex flex-col justify-end">
            <p
              className={`${viewMore
                ? 'h-auto'
                : 'h-[62px]'} text-gray-600 dark:text-gray-50 font-light overflow-y-hidden w-auto`}
            >
              <strong className="font-bold">{`${firstName} `}</strong>
              {text}
            </p>
            <div
              className="flex justify-end items-center cursor-pointer hover:text-sky-600 text-sky-400"
              onClick={() => setViewMore(!viewMore)}
              aria-hidden="true"
            >
              {!viewMore ? 'ver mais' : 'ver menos'}
              {!viewMore ? <ChevronDown /> : <ChevronUp />}
            </div>
          </div>
          {friendId === user.id && (
            <div className="flex items-center justify-center w-6 h-8 mt-2 invisible group-hover:visible  absolute right-0">
              <Trash2
                className="cursor-pointer hover:dark:text-gray-100 hover:text-gray-600"
                onClick={handleRemoveComments}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full relative items-center group flex mb-2 border-t-[1px] dark:border-gray-400 border-gray-200 gap-2">
          <div className="w-10 mt-2">
            <img src={image} alt="post" className="w-10 h-10 rounded-full" />
          </div>
          <div className="w-full mt-2">
            <p className="text-gray-600 dark:text-gray-50 font-light">
              <strong className="font-bold">{`${firstName} `}</strong>
              {text}
            </p>
          </div>
          {friendId === user.id && (
          <div className="w-6 h-8 mt-2 invisible group-hover:visible absolute right-0">
            <Trash2 className="cursor-pointer hover:text-gray-100 hover:dark:text-gray-600" onClick={handleRemoveComments} />
          </div>
          )}
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  getComments: PropTypes.func.isRequired,
  friendId: PropTypes.string.isRequired,
};
