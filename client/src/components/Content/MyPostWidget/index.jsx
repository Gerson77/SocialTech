/* eslint-disable react/jsx-props-no-spreading */
import {
  Gift, Image, Mic, Paperclip, Pencil, Trash2,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import UserImage from '../../UserImage';
import PostService from '../../../services/PostService';
import usePost from '../../../hooks/usePost';
import Textarea from '../../Textarea';

export default function MyPostWidget() {
  const { id, picturePath } = useSelector((state) => state.auth.user);
  const [addTextPost, setAddTextPost] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const { getPosts } = usePost();

  function handleDropDown() {
    setIsImage((prevState) => !prevState);
  }

  function removePicture() {
    setIsImage(false);
    setImage(null);
  }

  async function handleNewPost(event) {
    event.preventDefault();

    if (!addTextPost && !image) return;

    const post = {
      userId: id,
      description: addTextPost,
      picturePath: image,
    };

    try {
      await PostService.addNewPost(post);
      getPosts();
      setImage(null);
      setIsImage(false);
      setAddTextPost('');
    } catch {}
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between gap-4">
          <UserImage
            image={picturePath || 'user.png'}
            alt=""
          />
          <Textarea
            type="text"
            value={addTextPost}
            onChange={(event) => setAddTextPost(event.target.value)}
            placeholder="What's on your mind..."
          >
            {addTextPost}
          </Textarea>
        </div>
        {isImage && (
          <div className="flex items-center justify-center hover:cursor-pointer dark:text-gray-800 text-gray-50 p-4 border-[1px] border-gray-500 ">
            {image && (
            <div className="opacity-90 z-10 absolute flex items-center justify-center ml-32">
              <div
                className="shadow-lg shadow-gray-500/50 dark:shadow-gray-800/50 bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center text-red-500"
                onClick={removePicture}
                aria-hidden="true"
              >
                <Trash2 />
              </div>
            </div>
            )}
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="w-full h-full">
                  <div
                    {...getRootProps()}
                    className="border-dashed border-[2px] border-sky-500 cursor-pointer pb-2 flex items-center justify-center pt-2"
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p className="dark:text-gray-100 text-gray-700">
                        Add Image Here
                      </p>
                    ) : (
                      <>
                        <div className="flex items-center justify-center w-full h-96 object-contain">
                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                        <div className="opacity-90 z-10 absolute flex items-center justify-center mr-32">
                          <div className="shadow-lg shadow-gray-500/50 dark:shadow-gray-800/50 bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center text-green-500">
                            <Pencil />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              )}
            </Dropzone>
          </div>
        )}
      </div>
      <ul className="flex justify-between items-center pt-4 text-gray-500 dark:text-gray-200 border-t-[1px] dark:border-gray-700 border-gray-200 ">
        <li
          className="flex flex-row font-light cursor-pointer hover:bg-gray-700 p-1 rounded-md"
          aria-hidden="true"
          onClick={handleDropDown}
        >
          <Image className="pr-1" />
          Image
        </li>

        <li className="flex flex-row font-light cursor-pointer hover:bg-gray-700 p-1 rounded-md">
          <Gift className="pr-1" />
          Clip
        </li>
        <li className="flex flex-row font-light cursor-pointer hover:bg-gray-700 p-1 rounded-md">
          <Paperclip className="pr-1" />
          Attachment
        </li>
        <li className="flex flex-row font-light cursor-pointer hover:bg-gray-700 p-1 rounded-md">
          <Mic className="pr-1" />
          Audio
        </li>
        <button
          disabled={!addTextPost && !isImage}
          type="button"
          onClick={handleNewPost}
          className={`${!addTextPost && !isImage
            ? 'cursor-not-allowed bg-gray-500 text-gray-200'
            : 'bg-sky-500 text-gray-50'} flex flex-row font-bold rounded-full py-1 px-4`}
        >
          POST
        </button>
      </ul>
    </div>
  );
}
