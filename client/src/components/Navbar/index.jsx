import {
  Bell, LogOut, Menu, MessageSquare, Moon, MoveLeft, Search, Sun, X,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [menuBars, setMenuBars] = useState(false);
  const [notificationSidebar, setNotification] = useState(false);

  function handleNotification() {
    setIsNotification((preState) => !preState);
    setNotification((preState) => !preState);
  }

  function handleNotificationMobile() {
    setNotification((preState) => !preState);
  }

  function openMenuBars() {
    setMenuBars((preState) => !preState);
  }

  function closeMenuBars() {
    setNotification(false);
    setMenuBars(false);
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

  useEffect(() => {
    document.body.style.overflow = menuBars ? 'hidden' : 'unset';
    document.body.style.paddingRight = menuBars ? '15px' : '0px';
  }, [menuBars]);

  function gotTopHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      {isAth ? (
        <div className="bg-white dark:bg-gray-800 py-2 px-4 fixed w-full border-b-[1px] dark:border-gray-700 z-10">
          <div className="flex justify-between items-center text-gray-800 dark:text-gray-100 max-w-screen-2xl m-auto p-2">
            <div className="flex items-center">
              <Link
                to="/"
                onClick={gotTopHome}
                className="text-4xl font-bold text-sky-500 hover:text-sky-600 transition-all"
              >
                SocialTech
              </Link>
              <div className="relative hidden md:block">
                <input
                  type="search"
                  placeholder="Search..."
                  className="py-2 px-10 ml-4 rounded-md dark:bg-gray-700 bg-gray-100 dark:text-gray-50 text-gray-800 focus:ring-0 focus:ring-offset-0 border-[1px] dark:border-gray-600 border-gray-200"
                />
                <Search className="absolute top-2 right-8" />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
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
            {/* Mobile */}
            <div className="flex lg:hidden flex-col items-center gap-1 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-600 rounded-full z-20 absolute top-2 right-2">
              {/* Notificatrion */}
              <button type="button">
                {menuBars ? (
                  <X
                    className="w-10 h-10 text-gray-700 dark:text-gray-300 hover:dark:text-gray-100 p-1"
                    onClick={closeMenuBars}
                  />
                ) : (
                  <Menu className="w-10 h-10 text-gray-700 dark:text-gray-300 hover:dark:text-gray-100 p-1" onClick={openMenuBars} />
                )}
              </button>
            </div>

            {menuBars && (
            <div className="lg:hidden w-full h-full flex">
              <div
                className="lg:hidden w-full flex flex-col justify-around items-center bg-gray-950 opacity-90 h-screen fixed left-0 top-0"
                onClick={closeMenuBars}
                aria-hidden
              />
              {notificationSidebar ? (
                <div className="">
                  <button
                    type="button"
                    onClick={handleNotificationMobile}
                    className="px-2 py-1 bg-gray-500 w-10 h-10 rounded-full mt-2 z-40 absolute right-2 top-0"
                  >
                    <MoveLeft />
                  </button>
                  <div className="w-96 overflow-y-auto bg-gray-100 z-30 dark:bg-gray-900 items-center min-h-screen absolute -top-2 right-0 animatecss animatecss-slideInRight animatecss-faster">
                    <NotificationWidget
                      closeMenuBars={closeMenuBars}
                      handleNotification={handleNotification}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-80 bg-gray-300 dark:bg-gray-900 flex flex-col pt-24 justify-start items-center min-h-screen z-10 absolute top-0 right-0 animatecss animatecss-slideInRight animatecss-faster">
                  <button
                    onClick={toggleTheme}
                    type="button"
                    className="bg-gray-400 dark:bg-gray-800 hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white w-full py-8 text-center border-b-[1px] flex justify-center"
                  >
                    {theme === 'dark' ? (
                      <Sun />
                    ) : (
                      <Moon />
                    )}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 dark:bg-gray-800 hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white w-full py-8 text-center border-b-[1px] flex justify-center"
                  >
                    <Link to="/messages">
                      <MessageSquare />
                    </Link>
                  </button>
                  <button
                    type="button"
                    onClick={handleNotificationMobile}
                    className="bg-gray-400 dark:bg-gray-800 hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white w-full py-8 text-center border-b-[1px] flex justify-center"
                  >
                    <Bell />
                  </button>

                  <div className="bg-gray-400 dark:bg-gray-800 hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white w-full py-8 text-center border-b-[1px] flex gap-2 justify-center">
                    <span className="font-bold">{`${user.firstName} ${user.lastName}`}</span>
                    <LogOut
                      className="cursor-pointer"
                      onClick={() => logoutUser()}
                    />
                  </div>
                </div>
              )}
            </div>
            )}
            {/*  */}
          </div>
        </div>
      ) : (
        <div className=" bg-white dark:bg-gray-800 py-2 px-4">
          <div className="flex justify-center items-center text-gray-800 dark:text-gray-100 max-w-screen-2xl m-auto p-2">
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
