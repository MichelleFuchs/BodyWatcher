import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopOverlay({
  className = "",
  children,
  closeFunction,
  enableCloseOnOverlayClicked = true
}) {
  const closingXSymbol = <FontAwesomeIcon icon={faTimes} size="2x" />;
  return (
    <div
      className={"request-component " + className}
      onClick={() => enableCloseOnOverlayClicked && closeFunction()}
    >
      <div
        className={"box"}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <span
          className="close-x cursor-pointer"
          onClick={() => closeFunction()}
        >
          {" "}
          {closingXSymbol}{" "}
        </span>
        {children}
      </div>
    </div>
  );
}
