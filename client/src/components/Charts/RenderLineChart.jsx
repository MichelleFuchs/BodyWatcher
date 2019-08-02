import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import moment from "moment";

const RenderLineChart = props => {
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    const getData = async () => {
      let tempData = [];

      let filteredData = props.sortBodyDataByDate(
        await props.filterDataByPeriod(props.data, props.period),
        false
      );

      filteredData.forEach((item, i) => {
        if (item.value)
          tempData.push({
            date: new Date(item.date).getTime(),
            value: Number(item.value)
          });
        else
          tempData.push({
            date: new Date(item.date).getTime()
          });
      });
      setGraphData(tempData);
    };

    getData();
  }, [props, props.data, props.period, props.filterDataByPeriod]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload[0]) {
      return (
        <div className="custom-tooltip-wrapper">
          <p className="date">{moment(label).format(props.settings.date)}</p>
          <p className="value">
            {payload[0].value} {props.settings.measure}
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer height={300}>
      <LineChart
        data={graphData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line
          type="linear"
          dataKey="value"
          stroke="#2886bb"
          strokeWidth="2"
          dot={{ stroke: "#2fa4e7", strokeWidth: 3 }}
          connectNulls={true}
        />
        <XAxis
          dataKey="date"
          type="number"
          padding={{ right: 40 }}
          tickCount={0}
          interval="preserveEnd"
          domain={[
            graphData ? graphData[0]["date"] : "auto",
            graphData ? graphData[graphData.length - 1]["date"] : "auto"
          ]}
          tickFormatter={unixTime => moment(unixTime).format("DD/MM")}
        />
        <YAxis
          domain={[
            dataMin => Math.round(dataMin) - 1,
            dataMax => Math.round(dataMax) + 1
          ]}
          padding={{ top: 40, bottom: 40 }}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* <Tooltip /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RenderLineChart;
