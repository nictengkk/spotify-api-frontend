import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SongAnalysis from "./Pages/SongAnalysis/SongAnalysis";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/songanalysis"
              render={props => <SongAnalysis {...props} returnPath="/" />}
            />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
