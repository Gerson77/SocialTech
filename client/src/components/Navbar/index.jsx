import {
  Bell, LogOut, MessageSquare, Moon, Search, Sun,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLogout } from '../../state/slices/auth';
import { getPostsSuccess } from '../../state/slices/posts';
import { getByPostSuccess } from '../../state/slices/postSingle';
import { getFriendsSuccess } from '../../state/slices/friend';
import { getNotificationSuccess } from '../../state/slices/notification';
import NotificationWidget from '../Content/NotificationWidget';
import { getAllMessages, getMessagesSuccess } from '../../state/slices/messages';

export default function Navbar({ theme, toggleTheme, isAth }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isNotification, setIsNotification] = useState(false);
  const { notification } = useSelector((state) => state.notification);

  function handleNotification() {
    setIsNotification((preState) => !preState);
  }

  function logoutUser() {
    dispatch(getNotificationSuccess([]));
    dispatch(getPostsSuccess([]));
    dispatch(getByPostSuccess({}));
    dispatch(getFriendsSuccess([]));
    dispatch(getMessagesSuccess([]));
    dispatch(getAllMessages([]));
    dispatch(setLogout());
  }

  const notificationNotView = notification.filter(
    (notificationView) => notificationView.status === false,
  );

  return (
    <div>
      {isAth ? (
        <div className="bg-white dark:bg-gray-800 py-2 px-4 fixed w-full border-b-[1px] dark:border-gray-700 z-10">
          <div className="flex justify-between items-center text-gray-800 dark:text-gray-100 max-w-[1600px] m-auto p-2">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-4xl font-bold text-sky-500 hover:text-sky-600 transition-all"
              >
                SocialTech
              </Link>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="py-2 px-10 ml-4 rounded-md dark:bg-gray-700 bg-gray-100 dark:text-gray-50 text-gray-800 focus:ring-0 focus:ring-offset-0 border-[1px] dark:border-gray-600 border-gray-200"
                />
                <Search className="absolute top-2 right-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="cursor-pointer hover:dark:bg-gray-700 hover:bg-gray-100 rounded-full p-2">
                {theme === 'dark' ? (
                  <Sun onClick={toggleTheme} />
                ) : (
                  <Moon onClick={toggleTheme} />
                )}
              </div>
              <div className="cursor-pointer hover:dark:bg-gray-700 hover:bg-gray-100 rounded-full p-2">
                <Link to="/messages">
                  <MessageSquare />
                </Link>
              </div>

              {/* Notificatrion */}
              <div className="relative cursor-pointer">
                <div onClick={handleNotification} aria-hidden="true" className="hover:dark:bg-gray-700 hover:bg-gray-100 p-2 rounded-full">
                  <Bell />
                  {notificationNotView.length > 0 && (
                  <div className="flex items-center justify-center text-gray-100 absolute bottom-5 left-5 bg-red-500 rounded-full w-6 h-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-40" />
                    <span>{notificationNotView.length}</span>
                  </div>
                  )}
                </div>
                {isNotification && (
                  <>
                    <div
                      className="fixed top-0 left-0 h-full w-full z-10"
                      onClick={() => setIsNotification(false)}
                      aria-hidden
                    />
                    <NotificationWidget
                      handleNotification={handleNotification}
                    />
                  </>
                )}
              </div>
              <div className="flex gap-2 dark:bg-gray-700 bg-gray-100 hover:bg-gray-200 hover:dark:bg-gray-600 px-2.5 py-1 rounded-md">
                <span className="font-bold">{`${user.firstName} ${user.lastName}`}</span>
                <LogOut
                  className="cursor-pointer"
                  onClick={() => logoutUser()}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" bg-white dark:bg-gray-800 py-2 px-4">
          <div className="flex justify-center items-center text-gray-800 dark:text-gray-100 max-w-[1600px] m-auto p-2">
            <Link
              to="/"
              className="text-4xl font-bold text-sky-500 hover:text-sky-600 transition-all"
            >
              SocialTech
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  isAth: PropTypes.bool.isRequired,
};
