import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput/SearchInput";
import Playlist from "../../components/Playlist/Playlist";

export class Login extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
      token: token,
      username: "",
      id: "",
      userImg: "",
      error: "",
      trackName: "",
      artistName: "",
      albumName: "",
      albumImg: ""
    };
    this.playerCheckInterval = null;
  }

  async componentDidMount() {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          authorization: `Bearer ${this.state.token}`
        }
      });
      const user = await res.json();
      const { display_name, images, id } = user;
      this.setState({
        username: display_name,
        userImg: images[0].url,
        id: id
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  getHashParams = () => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  render() {
    const { username, userImg, loggedIn, token, id } = this.state;
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
      console.log(token);
      return (
        <div className="container">
          <div className="row">
            <SearchInput />
            {id && <Playlist token={token} id={id} />}
          </div>
          <div className="row justify-content-center">Welcome Back</div>
          <h1 className="row justify-content-center">{username}</h1>
          <div className="row justify-content-center">
            <img className="rounded-circle" src={userImg} alt="userimage" />
          </div>
          <div>
            <Link to={"/songanalysis"}>To Audio Analysis</Link>
            <Link to={"/search"}>To Search</Link>
            <Link to={"/player"}>To Spotify Web Player</Link>
          </div>
        </div>
      );
    }
  }
}

export default Login;
