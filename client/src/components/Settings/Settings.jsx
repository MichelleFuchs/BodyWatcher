import React from "react";
import Spinner from "../Helper/Spinner";
import Message from "../Helper/Message";
import Button from "../FormFields/Button";
import Select from "../FormFields/Select";
import fetchService from "../API/fetchService";
import ConfirmButtonClick from "../Helper/ConfirmButtonClick";
import generateData from "../../resources/generateSampleData.js";

class Settings extends React.Component {
  state = {
    showConfirmOverlay: false,
    confirmProps: null,
    message: {},
    isLoading: false
  };

  handleClickDeleteAll = () => {
    this.setState(
      {
        confirmProps: {
          message:
            "Do you really want to delete all your entries? You can't undo this move.",
          closeFunction: this.toggleConfirmOverlay,
          confirmFunction: this.deleteAllEntries
        }
      },
      () => {
        this.toggleConfirmOverlay();
      }
    );
  };

  handleClickExampleData = () => {
    this.setState(
      {
        confirmProps: {
          message:
            "Adding example data will override all your existing data. This can't be undone.",
          closeFunction: this.toggleConfirmOverlay,
          confirmFunction: this.addExampleData
        }
      },
      () => {
        this.toggleConfirmOverlay();
      }
    );
  };

  toggleConfirmOverlay = () => {
    this.setState({ showConfirmOverlay: !this.state.showConfirmOverlay });
  };

  deleteAllEntries = async (isDirectCall = true) => {
    if (isDirectCall) {
      this.setState({ isLoading: true });
      this.toggleConfirmOverlay(); //close overlay
    }
    fetchService.deleteAll().then(res => {
      if (isDirectCall) {
        this.props.dataUpdated();
        this.setState({ isLoading: false });
        this.setState({
          message: { type: "success", msg: "All data deleted." }
        });
      } else {
        return;
      }
    });
  };

  addExampleData = async () => {
    this.setState({ isLoading: true });
    this.toggleConfirmOverlay(); //close overlay
    await this.deleteAllEntries(false); //show no delete message, but delete all data
    let success = await generateData(this.props.settings.measure);
    await this.setState({ isLoading: false });
    if (success) {
      this.props.dataUpdated();
      this.setState({
        message: { type: "success", msg: "Example data successfully added." }
      });
    } else {
      this.setState({
        message: {
          type: "error",
          msg: "An error happened. You should try it again."
        }
      });
    }
  };

  handleSelectChange = e => {
    let settings = JSON.parse(localStorage.getItem("bw_settings"));
    if (settings) {
      settings[e.target.name] = e.target.value;
      localStorage.setItem("bw_settings", JSON.stringify(settings));
      this.props.checkForSetting();
    }

    if (e.target.name === "measure")
      this.setState({
        message: {
          type: "warning",
          msg:
            "Please note that this could lead to wrong values since there is no automatic convertion implemented yet. But you can import new example data which is based on the current unit."
        }
      });
  };

  render() {
    return (
      <section className="settings">
        {this.state.showConfirmOverlay && (
          <ConfirmButtonClick {...this.state.confirmProps} />
        )}
        {this.state.isLoading && <Spinner />}
        {this.state.message && (
          <Message
            type={this.state.message.type}
            msg={this.state.message.msg}
          />
        )}
        <h1>Settings</h1>
        <div className="container">
          {/* Delete all data */}
          <div className="row">
            <Button
              className="btn btn-primary"
              handleClick={this.handleClickDeleteAll}
              name="deleteAllEntries"
              ariaLabel="delete all entries"
              title="Delete All Entries"
              label="Delete all entries"
            />
          </div>
          {/* Generate example data */}
          <div className="row">
            <Button
              className="btn btn-primary"
              handleClick={this.handleClickExampleData}
              name="addExampleData"
              ariaLabel="add example data"
              title="Add Example Data"
              label="Add Example Data"
            />
          </div>
          {/* Select weiht measure */}
          <div className="row">
            <Select
              className="select form-control col-6"
              classLabel="control-label col-6"
              id="select-measure"
              label="Measuring Unit"
              labelBefore={false}
              name="measure"
              selected={this.props.settings.measure}
              handleChange={this.handleSelectChange}
              values={[
                { key: "kg", label: "kg", value: "kg" },
                { key: "lb", label: "lb", value: "lb" }
              ]}
            />
          </div>
          {/* Select date format */}
          <div className="row">
            <Select
              className="select form-control col-6"
              classLabel="control-label col-6"
              id="select-measure"
              label="Day Format"
              labelBefore={false}
              name="date"
              selected={this.props.settings.date}
              handleChange={this.handleSelectChange}
              values={[
                {
                  key: "eu_time",
                  label: "DD.MM.YYYY",
                  value: "dd, DD.MM.YYYY"
                },
                {
                  key: "us_time",
                  label: "MM.DD.YYYY",
                  value: "dd, MM.DD.YYYY"
                }
              ]}
            />
          </div>
        </div>
        <a
          href="https://github.com/MichelleFuchs"
          rel="noopener noreferrer"
          target="_blank"
          className="author-credits"
        >
          &#169; Michelle Fuchs
        </a>
      </section>
    );
  }
}

export default Settings;
