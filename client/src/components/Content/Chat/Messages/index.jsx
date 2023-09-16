import PropTypes from 'prop-types';

export function MessageRight({ message }) {
  return (
    <div className="flex  justify-end">
      <div className="flex items-end justify-end max-w-[60%] w-auto">
        <div className="flex flex-col space-y-2 text-sm mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-3xl inline-block font-light font-sans rounded-br-none bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-700 text-white ">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MessageLeft({ message }) {
  return (
    <div className="flex  justify-start">
      <div className="flex flex-col items-end max-w-[60%] w-auto">
        <div className="flex flex-col space-y-2 text-sm mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-3xl inline-block font-light font-sans rounded-bl-none bg-gray-800 text-white">{message}</span></div>
        </div>
      </div>
    </div>
  );
}

MessageLeft.propTypes = {
  message: PropTypes.string.isRequired,
};

MessageRight.propTypes = {
  message: PropTypes.string.isRequired,
};
