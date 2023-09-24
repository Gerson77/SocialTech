import PropTypes from 'prop-types';

export default function Input({
  value, onChange, error = false, placeholder, type,
}) {
  return (
    <input
      type={type}
      name="teste"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full ${error
        ? 'border-red-500  focus:border-red-500'
        : 'border-gray-100 dark:border-gray-600'} p-4 border-[1px] rounded-md my-6 text-sm dark:text-gray-100 text-gray-800 bg-gray-50 dark:bg-gray-700 focus:ring-0 outline-none`}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Input.defaultProps = {
  error: false,
};
