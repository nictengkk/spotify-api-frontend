import React, { Component } from "react";
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();

export class Login extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      username: ""
    };
  }

  componentDidMount() {
    spotifyApi.getMe().then((res, err) => {
      try {
        const data = res.body;
        const { display_name } = data;
        console.log("Some information about this user", data);
        this.setState({ username: display_name });
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    });
  }

  getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    console.log(hashParams);
    return hashParams;
  }

  render() {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return (
        <div className="container">
          <div className="row d-flex flex-row justify-content-center">
            <h1>Welcome</h1>
          </div>
          <div className="row d-flex flex-row justify-content-center">
            <p>Please login</p>
          </div>
          <div className="row d-flex flex-row justify-content-center">
            <a href="http://localhost:8888/login">Login</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">Welcome Back {this.state.username}</div>
        </div>
      );
    }
  }
}

export default Login;
