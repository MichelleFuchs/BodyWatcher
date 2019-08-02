import React from "react";

const Button = ({ className, id, handleClick, title, ariaLabel, label }) => {
  return (
    <button
      className={className}
      id={id}
      onClick={handleClick}
      title={title}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

export default Button;
