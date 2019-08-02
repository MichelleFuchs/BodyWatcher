import moment from "moment";
import React, { Component } from "react";
import Button from "../FormFields/Button";
import RenderLineChart from "./RenderLineChart";

class ChartTab extends Component {
  state = {
    periodFilteredData: [],
    period: "7",
    earliestDate: 0
  };

  handlePeriodChange = e => {
    this.setState({ period: e.target.title }, () => {
      this.filterDataByPeriod();
    });
  };

  filterDataByPeriod = async (data, periodProp) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let nextDay = today;

    let period;

    if (periodProp !== "all") {
      period = periodProp;
    } else {
      let latest = moment(new Date(data[0].date));
      let earliest = moment(new Date(data[data.length - 1].date));

      nextDay = new Date(latest);
      period = latest.diff(earliest, "days") + 1; //days between
      //"all" spans between today and the earliest entry date
    }

    let fd = [];

    for (let i = 0; i < period; i++) {
      let val;
      for (let d of data) {
        if (new Date(d.date).getTime() === nextDay.getTime()) {
          val = d;
          break;
        }
      }

      if (val) fd[i] = { value: val.value, date: new Date(val.date) };
      else fd[i] = { date: new Date(nextDay) };

      nextDay.setDate(nextDay.getDate() - 1);
    }

    return fd;
  };

  render() {
    return (
      <section className="chart">
        <h1>Charts</h1>
        <div className="btn-group">
          <Button
            className={
              "btn btn-primary " + (this.state.period === "7" ? "active" : "")
            }
            title="7"
            label="7 Days"
            handleClick={this.handlePeriodChange}
          />
          <Button
            className={
              "btn btn-primary " + (this.state.period === "14" ? "active" : "")
            }
            title="14"
            label="14 Days"
            handleClick={this.handlePeriodChange}
          />
          <Button
            className={
              "btn btn-primary " + (this.state.period === "30" ? "active" : "")
            }
            title="30"
            label="30 Days"
            handleClick={this.handlePeriodChange}
          />
          <Button
            className={
              "btn btn-primary " + (this.state.period === "all" ? "active" : "")
            }
            title="all"
            label="All"
            handleClick={this.handlePeriodChange}
          />
        </div>
        <RenderLineChart
          period={this.state.period}
          settings={this.props.settings}
          filterDataByPeriod={this.filterDataByPeriod}
          sortBodyDataByDate={this.props.sortBodyDataByDate}
          data={this.props.sortBodyDataByDate(this.props.data)}
        />
      </section>
    );
  }
}

export default ChartTab;
