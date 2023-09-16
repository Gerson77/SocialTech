import { Bookmark } from 'lucide-react';
import Photo from '../../../assets/coffee.jpg';

export default function AdvertWidget() {
  return (
    <div className="flex flex-col p-4 rounded-2xl bg-white dark:bg-gray-800 mb-6">
      <div className="flex items-center pb-2 justify-between">
        <div className="flex gap-2 items-center">
          <Bookmark />
          <h2 className="font-bold dark:text-gray-100 text-gray-500">
            Sponsored
          </h2>
        </div>
        <span>Created Ad</span>
      </div>
      <img src={Photo} alt="public" className="h-[380px] rounded-2xl" />
      <div className="flex justify-between py-4">
        <h2 className="dark:text-gray-100 text-gray-500 font-bold">
          Star Coffee
        </h2>
        <span className="underline hover:dark:text-gray-50 hover:text-gray-500 transition-all cursor-pointer">
          starcoffee.com
        </span>
      </div>
      <p className="text-sm ">Star the day right with StarCoffee</p>
    </div>
  );
}
