import {
  FileEdit, Trash2, X,
} from 'lucide-react';
import PropTypes from 'prop-types';

export default function TogglePost({ toggleEditPost, toogleDeletePost }) {
  return (
    <div>
      <div className="absolute top-1 right-[-8px] flex flex-col gap-2 opacity-70 dark:bg-gray-700 shadow-lg shadow-gray-500/100 dark:shadow-gray-900/100 bg-gray-100 sha rounded-full p-1 cursor-pointer animatecss animatecss-fadeIn">
        <X className="text-gray-100 dark:bg-gray-800 hover:bg-gray-600 bg-gray-500 rounded-full w-8 h-8 p-1" />
        <FileEdit className="text-green-500 dark:bg-gray-800 hover:bg-gray-600 bg-gray-500 rounded-full  w-8 h-8 p-1" onClick={toggleEditPost} />
        <Trash2 className="text-red-500 dark:bg-gray-800 hover:bg-gray-600 bg-gray-500 rounded-full  w-8 h-8 p-1" onClick={toogleDeletePost} />
      </div>
    </div>
  );
}

TogglePost.propTypes = {
  toggleEditPost: PropTypes.func.isRequired,
  toogleDeletePost: PropTypes.func.isRequired,
};
