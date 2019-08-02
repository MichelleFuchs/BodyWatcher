import React from "react";
import Button from "../FormFields/Button";
import Navbar from "react-bootstrap/Navbar";

class NavbarClass extends React.Component {
  state = {};
  render() {
    return (
      <Navbar bg="primary" className="navbar-dark" expand="">
        <Navbar.Brand href="#home">BodyWatcher</Navbar.Brand>
        <div className="nav-links">
          <ul className="nav nav-tabs list-unstyled list-inline">
            <li className="list-inline-item">
              <Button
                className={
                  "btn btn-nav " +
                  (this.props.currentTab === "Entries" ? "active" : "")
                }
                handleClick={this.props.handleNav}
                name="allEntries"
                ariaLabel="to entries tab"
                title="Entries"
                label="Entries"
              />
            </li>
            <li className="list-inline-item">
              <Button
                className={
                  "btn btn-nav " +
                  (this.props.currentTab === "Charts" ? "active" : "")
                }
                handleClick={this.props.handleNav}
                name="showCharts"
                ariaLabel="to charts tab"
                title="Charts"
                label="Charts"
              />
            </li>
            <li className="list-inline-item">
              <Button
                className={
                  "btn btn-nav " +
                  (this.props.currentTab === "Settings" ? "active" : "")
                }
                handleClick={this.props.handleNav}
                name="settings"
                ariaLabel="to settings tab"
                title="Settings"
                label="Settings"
              />
            </li>
          </ul>
        </div>
      </Navbar>
    );
  }
}

export default NavbarClass;
