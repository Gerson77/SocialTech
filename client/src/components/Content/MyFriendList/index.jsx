import { UserMinus } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserImage from '../../UserImage';
import useActionUser from '../../../hooks/useActionUser';

export default function MyFriendList({
  id,
  firstName,
  lastName,
  occupation,
  picturePath,
}) {
  const { idProfile } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { handleRemoveFriend } = useActionUser();

  return (
    <div className="flex justify-between py-2 items-center mx-2 dark:border-gray-600">
      <div className="flex flex-row items-center">
        <UserImage
          image={picturePath}
          alt="photo"
          className="w-16 h-16 p-1 rounded-full"
        />
        <div className="ml-4">
          <Link to={`/profile/${id}`}>
            <h2 className="font-bold dark:text-gray-50 text-gray-700 hover:dark:text-sky-500 hover:text-sky-800">
              {`${firstName} ${lastName}`}
            </h2>
          </Link>
          <span>{occupation}</span>
        </div>
      </div>
      {idProfile ? (
        <div>
          {idProfile === user.id && (
          <UserMinus
            className="dark:text-sky-300 cursor-pointer text-gray-100 w-10 h-10 p-2 bg-sky-800 hover:bg-sky-900 rounded-full"
            onClick={() => handleRemoveFriend(user.id, id)}
          />
          )}
        </div>
      ) : (
        <UserMinus
          className="dark:text-sky-300 cursor-pointer text-gray-100 w-10 h-10 p-2 bg-sky-800 hover:bg-sky-900 rounded-full"
          onClick={() => handleRemoveFriend(user.id, id)}
        />
      )}
    </div>
  );
}

MyFriendList.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
};

MyFriendList.defaultProps = {
  picturePath: 'user.png',
};
