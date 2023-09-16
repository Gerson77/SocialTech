import PropTypes from 'prop-types';

export default function UserImage({ image = 'user.png', size = '16' }) {
  return (
    <div className="rounded-full">
      <img
        className={`rounded-full w-${size} h-${size}`}
        alt="user"
        src={`${import.meta.env.VITE_NODE_API_URL}/assets/${image}`}
      />
    </div>
  );
}

UserImage.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
};

UserImage.defaultProps = {
  image: 'user.png',
  size: '16',
};
