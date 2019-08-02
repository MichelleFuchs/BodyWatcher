import React, { Component } from "react";
import Button from "../FormFields/Button";
import ShowBodyData from "./getAll/ShowBodyData";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MyEntries extends Component {
  state = {
    sort_asc: true
  };

  handleSorting = () => {
    this.setState({ sort_asc: !this.state.sort_asc });
  };

  render() {
    const arrowUp = <FontAwesomeIcon icon={faArrowUp} />;
    const arrowDown = <FontAwesomeIcon icon={faArrowDown} />;

    return (
      <React.Fragment>
        <section className="entries">
          <h1>My Entries</h1>
          <Button
            className="buttonless sort-btn"
            handleClick={this.handleSorting}
            id="sortOrder"
            title="Toggle sorting order"
            aria-label="toggle sorting order"
            label={this.state.sort_asc ? arrowDown : arrowUp}
          />
          <ShowBodyData
            data={this.props.sortBodyDataByDate(
              this.props.data,
              this.state.sort_asc
            )}
            settings={this.props.settings}
            dataRemoved={this.props.dataRemoved}
          />
          {this.props.data.length === 0 ? (
            <p>
              Want some data? You can generate example data in the settings.
            </p>
          ) : (
            ""
          )}
        </section>
      </React.Fragment>
    );
  }
}

export default MyEntries;
