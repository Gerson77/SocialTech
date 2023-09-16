import {
  Briefcase,
  Instagram,
  Linkedin,
  MapPin,
  Pencil,
  UserCog,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserImage from '../../UserImage';

export default function UserWidget({
  id, picturePath, firstName, lastName, friends, occupation, location,
}) {
  return (
    <div className="py-2 w-full h-full px-6 rounded-xl bg-white dark:bg-gray-800">
      <div className="flex justify-between py-2 items-center border-b-[1px] dark:border-gray-600 border-gray-200">
        <div className="flex flex-row items-center">
          {!picturePath ? (
            <div className="w-16 h-16 p-1 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse" />
          ) : (
            <UserImage image={picturePath} alt="" className="w-16 h-16 p-1 rounded-full" />
          )}
          <div className="ml-4">
            <Link to={`/profile/${id}`}>
              <h2 className="font-bold dark:text-gray-50 text-gray-500 hover:text-sky-800 dark:hover:text-sky-700">
                {`${firstName} ${lastName}`}
              </h2>
            </Link>
            <p className="text-gray-400 text-sm">
              {friends?.length}
              <span className="pl-1">
                {friends?.length > 1 ? (
                  'friends'
                ) : (
                  'friend'
                )}
              </span>
            </p>
          </div>
        </div>
        <UserCog className="w-6 text-gray-500" />
      </div>
      {/* Occupation */}
      <div className="flex justify-between py-1 items-center border-b-[1px] dark:border-gray-600 border-gray-200">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row py-2">
              <MapPin className="dark:text-gray-200 w-6 text-gray-500" />
              <span className="pl-2">{location}</span>
            </div>
            <div className="flex flex-row py-2">
              <Briefcase className="dark:text-gray-200 w-6 text-gray-500" />
              <span className="pl-2">{occupation}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-1 items-center border-b-[1px] dark:border-gray-600 border-gray-200">
        <div className="flex flex-row">
          <div className="flex flex-col text-sm leading-loose">
            <div className="flex flex-col py-2">
              <span className="pl-2  font-light">Who1s viewed profile</span>
              <span className="pl-2 font-light">Impressions of your post</span>
            </div>
          </div>
        </div>
      </div>
      {/* Networking */}
      <h2 className="py-2 font-bold dark:text-gray-100 text-gray-500">
        Social Profiles
      </h2>
      <div className="flex justify-between py-1 items-center">
        <div className="flex flex-row items-center">
          <Instagram className="text-gray-400 w-6" />
          <div className="ml-4">
            <h2 className="font-bold dark:text-gray-400 text-gray-500">
              Instagram
            </h2>
            <span className="text-sm font-light">Social Network</span>
          </div>
        </div>
        <Pencil className="text-gray-500 w-6" />
      </div>
      <div className="flex justify-between py-1 items-center">
        <div className="flex flex-row items-center">
          <Linkedin className="text-gray-400 w-6" />
          <div className="ml-4">
            <h2 className="font-bold dark:text-gray-400 text-gray-500">
              Linkedin
            </h2>
            <span className="text-sm font-light">Network Plataform</span>
          </div>
        </div>
        <Pencil className="text-gray-500 w-6" />
      </div>
    </div>
  );
}

UserWidget.propTypes = {
  id: PropTypes.string.isRequired,
  picturePath: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  friends: PropTypes.arrayOf(PropTypes.string),
  occupation: PropTypes.string,
  location: PropTypes.string,
};

UserWidget.defaultProps = {
  firstName: 'User',
  lastName: 'Name',
  // picturePath: 'user.png',
  friends: [],
  occupation: 'Adicionar ocupação',
  location: 'Adicionar localização',
};
