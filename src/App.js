import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SongAnalysis from "./Pages/SongAnalysis/SongAnalysis";
import Top20Songs from "./Pages/Top20Songs/Top20Songs";

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
            <Route path="/search" component={Top20Songs} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
