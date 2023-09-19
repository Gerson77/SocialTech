import PropTypes from 'prop-types';
import { Heart, Image } from 'lucide-react';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserImage from '../../UserImage';
import ImagePost from '../../ImagePost';
import { getByPostSuccess } from '../../../state/slices/postSingle';
import PostService from '../../../services/PostService';
import NotificationService from '../../../services/NotificationService';
import { getNotificationSuccess } from '../../../state/slices/notification';

dayjs.locale(ptBR);
dayjs.extend(relativeTime);

export default function Notification({
  id,
  userPicturePath,
  action,
  firstName,
  contentComment,
  postPicturePath,
  createdAt,
  idFriend,
  handleNotification,
  idPost,
  status,
  savedAt,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function markStatusViewNotification() {
    await NotificationService.markNotificationRead(id);
    getNotificationSuccess();
  }

  async function getByPostId() {
    const response = await PostService.getSinglePost(idPost);
    dispatch(getByPostSuccess(response));
    handleNotification();

    await NotificationService.markNotificationRead(id);
    getNotificationSuccess();
    navigate(`/post/${idPost}`);
  }

  return (
    <div>
      {action === 'follow' ? (
        <Link to={`/profile/${idFriend}`} onClick={markStatusViewNotification}>
          <div
            className={`${!status
              ? 'bg-white dark:bg-gray-900 hover:bg-gray-200 hover:dark:bg-gray-800'
              : 'bg-gray-100 dark:bg-gray-500 hover:bg-gray-300 hover:dark:bg-gray-800 opacity-75'} h-full w-full`}
            onClick={handleNotification}
            aria-hidden
          >
            <div className="flex justify-between gap-2 items-center py-2 px-4">
              <div className="flex items-center gap-1 max-w-[80%]">
                <UserImage
                  image={userPicturePath}
                  alt="user"
                />
                {action === 'follow' && (
                  <p className="text-gray-800 dark:text-gray-100 ml-2 font-light">
                    <strong className="text-gray-700 hover:text-sky-600 dark:text-gray-200 hover:dark:text-sky-700 pr-2 font-bold">
                      {firstName}
                    </strong>
                    Começou a seguir você
                  </p>
                )}
              </div>
              <Heart className="text-sky-400" />
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-300 px-2 border-b-[1px] border-gray-400">
              <span>{dayjs(createdAt).fromNow()}</span>
              <span>{`${dayjs(Number(savedAt)).format('DD/MM/YYYY HH:mm')}`}</span>
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={`${!status
            ? 'bg-white dark:bg-gray-900 hover:bg-gray-200 hover:dark:bg-gray-800'
            : 'bg-gray-100 dark:bg-gray-500 hover:bg-gray-300 hover:dark:bg-gray-800 opacity-75'} h-full w-full`}
          aria-hidden
          onClick={getByPostId}
        >
          <div className="flex justify-between gap-2 items-center py-2 px-4">
            <div className="flex items-center gap-1 max-w-[80%]">
              <UserImage
                image={userPicturePath}
                alt="user"
              />
              {action === 'likes' && (
              <p className="text-gray-800 dark:text-gray-100 ml-2 font-light">
                <strong className="text-gray-700 hover:text-sky-600 dark:text-gray-200 pr-2 font-bold">{firstName}</strong>
                Curtiu sua publicação
              </p>
              )}
              {action === 'comments' && (
              <p className="text-gray-800 dark:text-gray-100 ml-2 font-light">
                <strong className="text-gray-700 hover:text-sky-600 dark:text-gray-200 pr-2 font-bold">{firstName}</strong>
                {`Comentou no seu post: ${contentComment.substring(0, 5)}...`}
              </p>
              )}
            </div>
            <div className="w-16 h-16 flex items-center justify-end max-w-[20%]">
              {postPicturePath === null ? (
                <Image className="text-sky-400" />
              ) : (
                <ImagePost image={postPicturePath} alt="" />
              )}
            </div>
          </div>
          <div className="flex justify-between text-gray-500 dark:text-gray-300 px-2 border-b-[1px] border-gray-400">
            <span>
              {`${dayjs(createdAt).fromNow()}`}
            </span>
            <span>
              {`${dayjs(Number(savedAt)).format('DD/MM/YYYY HH:mm')}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  userPicturePath: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  contentComment: PropTypes.string,
  postPicturePath: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  idFriend: PropTypes.string.isRequired,
  idPost: PropTypes.string,
  handleNotification: PropTypes.func,
  status: PropTypes.bool.isRequired,
  savedAt: PropTypes.number.isRequired,
};

Notification.defaultProps = {
  contentComment: 'string',
  postPicturePath: 'string',
  handleNotification: () => {},
  idPost: '',
};
