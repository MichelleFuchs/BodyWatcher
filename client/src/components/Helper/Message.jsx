import React from "react";

const Message = props => {
  if (props.msg)
    return (
      <div
        className={
          "alert fade show alert-" +
          (props.type === "error" ? "danger" : props.type)
        }
      >
        <strong className="text-uppercase">{props.type}</strong>
        <br />
        {props.msg}
      </div>
    );
  else return "";
};

export default Message;
