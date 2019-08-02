import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Spinner(color = "white") {
  return (
    <div className="spinner-wrapper">
      <FontAwesomeIcon
        icon={faSpinner}
        style={{ color: color }}
        size="3x"
        spin
      />
    </div>
  );
}
