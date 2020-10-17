import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "bootstrap/dist/css/bootstrap.min.css";

const Root = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
