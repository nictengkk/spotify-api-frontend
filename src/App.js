import React, { Component } from "react";
import { Router, BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SongAnalysis from "./Pages/SongAnalysis/SongAnalysis";
import NowPlaying from "./Pages/NowPlaying/NowPlaying";
import Top20Songs from "./Pages/Top20Songs/Top20Songs";
import SpotifyWebPlayer from "./components/SpotifyWebPlayer/SpotifyWebPlayer";

class App extends Component {
  render() {
    return (
      // <Router>
      <BrowserRouter>
        <Switch>
          <Route
            path="/nowplaying"
            render={props => <NowPlaying {...props} returnPath="/" />}
          />
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
      </BrowserRouter>
      // </Router>
    );
  }
}

export default App;
