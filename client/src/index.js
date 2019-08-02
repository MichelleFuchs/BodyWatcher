// import App from "./App";
import React from "react";
import Main from "./Main";
import "./styles/__main.scss";
import ReactDOM from "react-dom";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
