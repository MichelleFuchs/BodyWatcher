import React from "react";

const Input = ({
  name,
  type,
  className,
  id,
  label,
  classLabel,
  idLabel,
  labelBefore = true,
  placeholder,
  value,
  handleChange,
  ariaLabel,
  readOnly,
  onClick
}) => {
  const labelEl = (
    <label htmlFor={id} id={idLabel} className={classLabel}>
      {label}
    </label>
  );

  return (
    <React.Fragment>
      {label && labelBefore && labelEl}
      <input
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        aria-label={ariaLabel}
        onChange={handleChange}
        readOnly={readOnly}
        onClick={onClick}
      />
      {label && !labelBefore && labelEl}
    </React.Fragment>
  );
};

export default Input;
