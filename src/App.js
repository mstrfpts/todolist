import React from "react";
import Board from "./Board";
import About from "./About";
import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className={"HomePage"}>
      <Navbar />
      <Switch>
        <Route path="/" component={Board} exact />
        <Route path="/about" component={About} />
        <Route component={Error} />
      </Switch>
    </div>
  );
};
export default App;
