import React from "react";
import Button from "../../FormFields/Button";
import fetchService from "../../API/fetchService.js";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RemoveEntry extends React.Component {
  state = {};

  removeEntry = e => {
    let entry_id = e.currentTarget.id.substring(3);
    fetchService
      .deleteBodyData(entry_id)
      .then(result => {
        this.props.dataRemoved();
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const deleteIcon = (
      <FontAwesomeIcon icon={faTimes} className={"id_" + this.props.id} />
    );
    return (
      <Button
        className="buttonless remove-btn"
        id={"id_" + this.props.id}
        handleClick={this.removeEntry}
        name="removeEntry"
        ariaLabel="remove entry"
        title="Remove Entry"
        label={deleteIcon}
      />
    );
  }
}

export default RemoveEntry;
