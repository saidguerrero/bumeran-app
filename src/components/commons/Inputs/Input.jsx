export const Input = ({
  type,
  onKeyPress = "",
  onChange = () => {},
  placeholder = "",
  className = "",
  icon = "",
  valueRef,
  disabled = "",
  dataTestId,
}) => {
  return (
    <div className="relative w-full">
      {icon}
      <input
        data-test-id={dataTestId}
        type={type}
        ref={valueRef}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className={className}
        maxLength="50"
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
