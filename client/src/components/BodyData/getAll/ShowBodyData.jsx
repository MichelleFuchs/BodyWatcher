import React from "react";
import moment from "moment";
import RemoveEntry from "../remove/RemoveEntry";

const ShowBodyData = props => {
  return (
    <div>
      <ul className="list-unstyled entry-list container">
        {props.data.map(item => (
          <li key={item._id} className="row">
            <div className="dateTime-list col-6">
              {moment(item.date).format(props.settings.date)}
            </div>
            <div className="value-list col-4">
              {item.value} {props.settings.measure}
            </div>
            <div className="delete col-2">
              <RemoveEntry id={item._id} dataRemoved={props.dataRemoved} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowBodyData;
