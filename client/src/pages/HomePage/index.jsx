import { Users2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertWidget from '../../components/Content/AdvertWidget';
import MyFriendList from '../../components/Content/MyFriendList';
import UserWidget from '../../components/Content/UserWidget';
import Posts from '../../components/Content/Posts';
import useFriend from '../../hooks/useFriend';
import PostSingle from '../../components/Content/PostSingle';
import MyPostWidget from '../../components/Content/MyPostWidget';

export default function HomePage() {
  const { idPost } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friends);
  const { getFriends } = useFriend();

  useEffect(() => {
    getFriends(user.id);
  }, []);

  return (
    <div className="w-full h-full max-w-screen-2xl m-auto py-6 px-2 dark:text-gray-500 text-gray-700">
      <div className="flex gap-6 pt-20">
        {/* UserWidget */}
        <div className="hidden lg:block w-[32%] xl:w-[26%] h-full bg-white dark:bg-gray-800 py-4 rounded-xl">
          <UserWidget
            id={user.id}
            picturePath={user.picturePath || 'user.png'}
            firstName={user.firstName}
            lastName={user.lastName}
            friends={user.friends}
            occupation={user.occupation}
            location={user.location}
          />
        </div>
        {/* My posts and Content */}
        <div className="flex gap-6 flex-col xl:w-[48%] sm:w-full h-full">
          {!idPost ? (
            <>
              <MyPostWidget />
              <Posts />
            </>
          ) : (
            <PostSingle />
          )}
        </div>

        {/* Advert and List friends */}
        <div className="hidden xl:block w-[26%] h-full ">
          <AdvertWidget />
          {friends.length > 0 && (
            <div className="flex justify-between bg-white dark:bg-gray-800 flex-col p-4 rounded-xl">
              <div className="flex pb-2 gap-2 items-center px-1">
                <Users2 />
                <h2 className="font-bold dark:text-gray-100 text-gray-500">
                  Friend List
                </h2>
              </div>
              {friends.map(
                ({
                  id, firstName, lastName, occupation, picturePath,
                }) => (
                  <MyFriendList
                    key={id}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    occupation={occupation}
                    picturePath={picturePath}
                  />
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
