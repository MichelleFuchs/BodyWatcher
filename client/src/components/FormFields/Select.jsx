import React from "react";

const Select = ({
  className,
  classLabel,
  idLabel,
  id,
  handleChange,
  title,
  ariaLabel,
  name,
  values,
  selected,
  label,
  labelBefore = true
}) => {
  const labelEl = (
    <label htmlFor={id} id={idLabel} className={classLabel}>
      {label}
    </label>
  );
  return (
    <React.Fragment>
      {label && labelBefore && labelEl}
      <select
        id={id}
        className={className}
        title={title}
        name={name}
        value={selected}
        aria-label={ariaLabel}
        onChange={handleChange}
      >
        {values.map(val => {
          return (
            <option key={val.key} value={val.value}>
              {val.label}
            </option>
          );
        })}
      </select>

      {label && !labelBefore && labelEl}
    </React.Fragment>
  );
};

export default Select;
