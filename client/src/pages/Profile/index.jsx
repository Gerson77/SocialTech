import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserPlus, Users2 } from 'lucide-react';

import PostWidget from '../../components/Content/PostWidget';
import UserWidget from '../../components/Content/UserWidget';
import MyFriendList from '../../components/Content/MyFriendList';
import Spinner from '../../components/Spinner';
import MyPostWidget from '../../components/Content/MyPostWidget';

import useFriend from '../../hooks/useFriend';

import DefaultImage from '../../assets/add-post.png';

export default function Profile() {
  const { idProfile } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friends);
  const { posts } = useSelector((state) => state.posts);

  const postFilterByUserProfile = posts.filter((post) => post.userId === idProfile);

  const { getFriends, getInfoFriend, userProfile } = useFriend();

  // Carrega as informações do usuário do perfil
  useEffect(() => {
    getInfoFriend(idProfile);
  }, [idProfile]);

  // Carrega a lista de amigos do usuário do perfil atual
  useEffect(() => {
    getFriends(idProfile);
  }, [idProfile]);

  return (
    <div className="w-full h-full max-w-screen-2xl m-auto py-6 px-4  text-gray-500">
      <div className="flex flex-col md:flex-row gap-6 justify-center pt-20">
        {/* UserWidget */}
        <div className="w-full md:w-2/5 lg:max-w-[30%] 2xl:max-w-[26%] h-full flex flex-col gap-4">
          <UserWidget
            id={idProfile}
            firstName={userProfile.firstName}
            lastName={userProfile.lastName}
            picturePath={userProfile.picturePath || 'user.png'}
            friends={userProfile.friends}
            location={userProfile.location}
            occupation={userProfile.occupation}
          />
          {friends.length > 0 ? (
            <div className="hidden md:flex justify-between bg-white dark:bg-gray-800 flex-col p-4 rounded-xl">
              <div className="flex pb-2 gap-2 items-center">
                <div className="flex gap-2">
                  <Users2 />
                  <h2 className="font-bold dark:text-gray-100 text-gray-500">
                    Friend List
                  </h2>
                </div>
              </div>
              {!friends ? (
                <Spinner />
              ) : (
                <>
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
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex justify-between bg-white dark:bg-gray-800 flex-col p-4 rounded-xl">
              <div className="flex gap-2">
                <Users2 />
                <h2 className="font-bold dark:text-gray-100 text-gray-500">
                  Friend List
                </h2>
              </div>
              <div className="flex py-4 gap-2 items-center justify-center">
                <p>Adicione amigos a sua lista.</p>
                <UserPlus />
              </div>
            </div>
          )}
        </div>
        {/* My posts */}
        <div className="w-full md:w-[60%] lg:max-w-[70%] 2xl:max-w-[48%] h-full flex flex-col gap-6">
          {idProfile === user.id && (
            <MyPostWidget />
          )}
          {postFilterByUserProfile.length > 0 ? (
            <>
              {postFilterByUserProfile.map(
                ({
                  id,
                  userId,
                  firstName,
                  lastName,
                  description,
                  location,
                  picturePath,
                  userPicturePath,
                  likes,
                  comments,
                }) => (
                  <PostWidget
                    key={id}
                    postId={id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                  />
                ),
              )}
            </>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center">
              <img src={DefaultImage} alt="add-post" />
              <h2 className="text-xl font-bold py-6">Adicione seu primeito post</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
