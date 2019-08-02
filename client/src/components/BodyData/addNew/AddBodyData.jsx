import moment from "moment";
import Datetime from "react-datetime";
import React, { Component } from "react";
import Input from "../../FormFields/Input";
import Spinner from "./../../Helper/Spinner";
import Button from "../../FormFields/Button";
import TopOverlay from "../../Helper/TopOverlay";
import fetchService from "../../API/fetchService";

class AddBodyData extends Component {
  state = {
    isSaving: false,
    showError: false,
    weight: "",
    date: ""
  };

  componentDidMount = () => {
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    this.setState({ date: d }, () => {
      //check if day already has a weight
      fetchService
        .getBodyDataByDay(this.state.date)
        .then(res => {
          if (res.data.value) this.setState({ weight: res.data.value });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  validDate = current => {
    return current.isBefore(Datetime.moment()); //only enable today and before
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAdd = () => {
    this.props.handleNewEntry();
  };

  handleDateTimeChange = e => {
    let formatted = moment(e._d).toDate();
    formatted.setHours(0, 0, 0, 0);
    this.setState({ date: formatted });
  };

  toggleDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };

  saveWeight = () => {
    if (!this.state.weight) {
      this.setState({ showError: true });
      return;
    }
    this.setState({ isSaving: true });

    fetchService
      .postNewBodyData(
        "weight",
        this.state.weight,
        this.props.settings.measure,
        this.state.date
      )
      .then(data => {
        setTimeout(() => {
          //this is just for feedback design reasons :)
          this.props.closeFunction();
          this.handleAdd();
        }, 700);
      });
  };

  render() {
    return (
      <React.Fragment>
        <TopOverlay
          closeFunction={this.props.closeFunction}
          className="add-entry"
        >
          {this.state.isSaving && <Spinner />}
          <h3>Add Entry</h3>
          <div className="row">
            <Input
              name="weight"
              value={this.state.weight}
              type="number"
              label={`Weight in ${this.props.settings.measure}`}
              classLabel="control-label"
              className="form-control"
              ariaLabel="weight"
              placeholder={`Weight in ${this.props.settings.measure}`}
              handleChange={this.handleChange}
            />
          </div>
          <div className="row">
            <Datetime
              defaultValue={Date.now()}
              dateFormat={this.props.settings.date}
              onChange={this.handleDateTimeChange}
              closeOnSelect={true}
              isValidDate={this.validDate}
              timeFormat={false}
              inputProps={{
                name: "date",
                className: "cursor-pointer form-control"
              }}
            />
          </div>
          <Button
            className="btn btn-primary"
            name="saveWeight"
            handleClick={this.saveWeight}
            label="Speichern"
          />
        </TopOverlay>
      </React.Fragment>
    );
  }
}

export default AddBodyData;
