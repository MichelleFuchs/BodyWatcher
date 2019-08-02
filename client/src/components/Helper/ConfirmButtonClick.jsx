import React from "react";
import TopOverlay from "./TopOverlay";
import Button from "../FormFields/Button";

const ConfirmButtonClick = props => {
  return (
    <TopOverlay closeFunction={props.closeFunction}>
      {props.message}
      <Button
        className="btn btn-warning"
        handleClick={props.confirmFunction}
        name="confirm"
        ariaLabel="confirm"
        title="confirm"
        label="Confirm"
      />
      <Button
        className="btn btn-secondary"
        handleClick={props.closeFunction}
        name="cancel"
        ariaLabel="cancel"
        title="cancel"
        label="Cancel"
      />
    </TopOverlay>
  );
};

export default ConfirmButtonClick;
