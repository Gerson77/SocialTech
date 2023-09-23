import PropTypes from 'prop-types';
import { useRef } from 'react';

export default function Textarea({
  value, onChange = false, placeholder, type, rounded = 'rounded-3xl',
}) {
  const ref = useRef();

  const handleInput = (e) => {
    if (ref.current) {
      ref.current.style.height = '100px';
      ref.current.style.height = `${e.target.scrollHeight - 100}px`;
    }
  };

  return (
    <textarea
      ref={ref}
      type={type}
      value={value}
      onInput={handleInput}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full min-h-[60px] ${value
        ? 'max-h-[60px]'
        : 'max-h-[60px]'} h-[60px] ${rounded} resize-none dark:bg-gray-700 bg-gray-100 outline-none dark:text-gray-50 text-gray-500 p-4 my-4 border-[1px] dark:border-gray-600 border-gray-200`}
    >
      {value}
    </textarea>
  );
}

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rounded: PropTypes.string,
};

Textarea.defaultProps = {
  rounded: 'rounded-3xl',
};
