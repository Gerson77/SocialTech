import PropTypes from 'prop-types';

export default function ImagePost({ image = 'user.png', borderRadius, toggleComment }) {
  return (
    <div
      className="w-full h-full cursor-pointer"
      onClick={toggleComment}
      aria-hidden
    >
      <img
        className={`w-full h-full ${borderRadius}`}
        alt="user"
        src={`${import.meta.env.VITE_NODE_API_URL}/assets/${image}`}
      />
    </div>
  );
}

ImagePost.propTypes = {
  image: PropTypes.string,
  borderRadius: PropTypes.string,
  toggleComment: PropTypes.func,
};

ImagePost.defaultProps = {
  borderRadius: 'rounded-md',
  image: 'user.png',
  toggleComment: () => {
    // handleClose function here
  },
};
