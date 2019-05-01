import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SongAnalysis from "./Pages/SongAnalysis/SongAnalysis";
import Top20Songs from "./Pages/Top20Songs/Top20Songs";
import SpotifyWebPlayer from "./components/SpotifyWebPlayer/SpotifyWebPlayer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/analysis"
              render={props => <SongAnalysis {...props} returnPath="/" />}
            />
            <Route
              path="/search"
              render={props => <Top20Songs {...props} returnPath="/" />}
            />
            <Route
              path="/player"
              render={props => <SpotifyWebPlayer {...props} returnPath="/" />}
            />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
