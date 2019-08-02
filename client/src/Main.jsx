import MyEntries from "./components/BodyData/MyEntries";
import React, { Component } from "react";
import ChartTab from "./components/Charts/ChartTab";
import NavbarClass from "./components/Header/Header";
import fetchService from "./components/API/fetchService.js";
import Spinner from "./components/Helper/Spinner";
import Settings from "./components/Settings/Settings";
import Message from "./components/Helper/Message";
import Button from "./components/FormFields/Button";
import AddBodyData from "./components/BodyData/addNew/AddBodyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class Main extends Component {
  state = {
    data: null,
    isLoading: false,
    showAddNewEntryOverlay: false,
    settings: {},
    addedEntries: 0,
    currentTab: "Entries",
    showLogin: false,
    showRegister: false,
    successMsg: "",
    errorMsg: "",
    weightMeasure: "",
    dateFormat: ""
  };

  componentDidMount = () => {
    this.checkForSetting();
    this.checkForCurrentTab();

    this.setState({ isLoading: true });
    fetchService
      .getBodyData()
      .then(result => {
        this.setState({ data: result.data, isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  checkForSetting = async () => {
    //check for saved settings in local storage
    let settings = JSON.parse(localStorage.getItem("bw_settings"));
    if (settings) {
      await this.setState({ settings: settings });
    } else {
      //set item with standard values
      let lsItem = {
        color: "default",
        measure: "kg",
        date: "dd, DD.MM.YYYY"
      };
      localStorage.setItem("bw_settings", JSON.stringify(lsItem));
      await this.setState({ settings: lsItem });
    }
  };

  checkForCurrentTab = () => {
    let tab = localStorage.getItem("bw_currTab");
    if (tab) {
      this.setState({ currentTab: tab });
    } else {
      //set item with standard value
      localStorage.setItem("bw_currTab", "Entries");
    }
  };

  toggleNewEntryOverlay = () => {
    this.setState({
      showAddNewEntryOverlay: !this.state.showAddNewEntryOverlay
    });
  };

  handleAddedEntries = () => {
    this.setState({ addedEntries: this.state.addedEntries + 1 });
    this.componentDidMount();
  };

  dataUpdated = () => {
    this.componentDidMount();
  };

  handleNav = e => {
    this.setState({ currentTab: e.target.title });
    localStorage.setItem("bw_currTab", e.target.title);
  };

  sortBodyDataByDate = (array, asc = true) => {
    array.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);

      if (asc) return a > b ? -1 : a < b ? 1 : 0;
      else return a < b ? -1 : a < b ? 1 : 0;
    });

    return array;
  };

  render() {
    const addEntryCircleSymbol = (
      <FontAwesomeIcon icon={faPlusCircle} size="3x" />
    );

    return (
      <React.Fragment>
        <NavbarClass
          handleNav={this.handleNav}
          currentTab={this.state.currentTab}
        />
        <main className="container">
          {this.state.isLoading && <Spinner color="grey" />}

          {(this.state.currentTab === "Entries" ||
            this.state.currentTab === "Charts") &&
            this.state.data && (
              <Button
                className="buttonless add-btn"
                handleClick={this.toggleNewEntryOverlay}
                name="addData"
                ariaLabel="new entry"
                title="New Entry"
                label={addEntryCircleSymbol}
              />
            )}

          {this.state.showAddNewEntryOverlay && (
            <AddBodyData
              settings={this.state.settings}
              closeFunction={this.toggleNewEntryOverlay}
              handleNewEntry={this.handleAddedEntries}
            />
          )}

          {this.state.currentTab === "Settings" && this.state.data && (
            <Settings
              settings={this.state.settings}
              dataUpdated={this.dataUpdated}
              checkForSetting={this.checkForSetting}
            />
          )}

          {this.state.currentTab === "Charts" && this.state.data && (
            <ChartTab
              settings={this.state.settings}
              data={this.sortBodyDataByDate(this.state.data)}
              sortBodyDataByDate={this.sortBodyDataByDate}
            />
          )}

          {this.state.currentTab === "Entries" && this.state.data && (
            <MyEntries
              data={this.state.data}
              dataRemoved={this.dataUpdated}
              settings={this.state.settings}
              sortBodyDataByDate={this.sortBodyDataByDate}
            />
          )}

          {!this.state.data && (
            <Message
              type="error"
              msg="Oops, there might be an error with the API. Plese check back later."
            />
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default Main;
