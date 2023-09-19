import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users2 } from 'lucide-react';

import PostWidget from '../../components/Content/PostWidget';
import UserWidget from '../../components/Content/UserWidget';
import MyFriendList from '../../components/Content/MyFriendList';
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';
import FriendService from '../../services/FriendService';
import Spinner from '../../components/Spinner';

export default function Profile() {
  const { idProfile } = useParams();
  const { friends } = useSelector((state) => state.friends);
  // const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [friend, setFiend] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  // Carrega os post do usuário do perfil
  useEffect(() => {
    async function getPosts() {
      const postsList = await PostService.getByPostUser(idProfile);
      setPosts(postsList);
    }
    getPosts();
  }, [idProfile]);

  // Carrega as informações do usuário do perfil
  useEffect(() => {
    async function getInfoFriend() {
      const infoFriend = await UserService.getUser(idProfile);
      setUserProfile(infoFriend);
    }

    getInfoFriend();
  }, [idProfile]);

  // Carrega a lista de amigos do usuário do perfil atual
  useEffect(() => {
    async function getInfoFriend() {
      const infoFriend = await FriendService.getListFriends(idProfile);
      setFiend(infoFriend);
    }

    getInfoFriend();
  }, [idProfile, friends]);

  return (
    <div className="w-full h-full max-w-screen-2xl m-auto py-6 px-4  text-gray-500">
      <div className="flex flex-col md:flex-row gap-6 justify-center pt-20">
        {/* UserWidget */}
        <div className="w-full md:w-[40%] lg:max-w-[30%] 2xl:max-w-[26%] h-full flex flex-col gap-4">
          <UserWidget
            id={idProfile}
            firstName={userProfile.firstName}
            lastName={userProfile.lastName}
            picturePath={userProfile.picturePath || 'user.png'}
            friends={userProfile.friends}
            location={userProfile.location}
            occupation={userProfile.occupation}
          />
          {friend.length > 0 && (
            <div className="hidden md:flex justify-between bg-white dark:bg-gray-800 flex-col p-4 rounded-xl">
              <div className="flex pb-2 gap-2 items-center">
                <Users2 />
                <h2 className="font-bold dark:text-gray-100 text-gray-500">
                  Friend List
                </h2>
              </div>
              {!friend ? (
                <Spinner />
              ) : (
                <>
                  {friend.map(
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
          )}
        </div>
        {/* My posts */}
        <div className="w-full md:w-[60%] lg:max-w-[70%] 2xl:max-w-[48%] h-full flex flex-col gap-6">
          {posts.map(
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
        </div>
      </div>
    </div>
  );
}
