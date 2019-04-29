import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput/SearchInput";
import Playlist from "../components/Playlist/Playlist";

export class Login extends Component {
  constructor() {
    super();
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
      albumImg: "",
      playing: false,
      position: 0,
      duration: 0,
      deviceId: ""
    };
    this.playerCheckInterval = null;
  }

  async componentDidMount() {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        methood: "GET",
        headers: {
          authorization: `Bearer ${this.state.token}`,
          "Content-Type": "application/json"
        }
      });
      const user = await res.json();
      const { display_name, images, id } = user;
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 5000);
      this.setState({
        username: display_name,
        userImg: images[0].url,
        id: id
      });
    } catch (error) {
      console.error(error);
    }
  }

  onStateChanged(state) {
    // only update if we got a real state
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const albumImg = currentTrack.album.images[0].url;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing,
        albumImg
      });
    } else {
      // state was null, user might have swapped to another device
      this.setState({
        error: "Looks like you might have swapped to another device?"
      });
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

  createEventHandlers = () => {
    this.player.on("initialization_error", e => {
      console.error(e);
    });
    this.player.on("authentication_error", e => {
      console.error(e);
    });
    this.player.on("account_error", e => {
      console.error(e);
    });
    this.player.on("playback_error", e => {
      console.error(e);
    });

    // Playback status updates
    this.player.on("player_state_changed", state => {
      console.log(state);
      this.onStateChanged(state);
    });

    // Ready
    this.player.on("ready", async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      // set the deviceId variable, then let's try
      // to swap music playback to *our* player!
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });
  };

  checkForPlayer = () => {
    const { token } = this.state;

    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: "Nic's Spotify Player",
        getOAuthToken: cb => {
          cb(token);
        }
      });
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  };

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        // true: start playing music if it was paused on the other device
        // false: paused if paused on other device, start playing music otherwise
        play: true
      })
    });
  }

  render() {
    const {
      albumImg,
      username,
      userImg,
      loggedIn,
      trackName,
      artistName,
      albumName,
      playing,
      token,
      id
    } = this.state;
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
          <div className="row">
            <SearchInput />
            {id && <Playlist token={token} id={id} />}
          </div>
          <div className="row justify-content-center">Welcome Back</div>
          <h1 className="row justify-content-center">{username}</h1>
          <div className="row justify-content-center">
            <img className="rounded-circle" src={userImg} alt="userimage" />
          </div>
          <div className="row d-flex justify-content-center">
            <p>Now Playing:</p>
          </div>
          <div className="row justify-content-center">
            <img src={albumImg} alt="albumImg" />
          </div>
          <div className="row justify-content-center">
            <p>Artist: {artistName}</p>
            <p>Track: {trackName}</p>
            <p>Album: {albumName}</p>
          </div>
          <div className="row justify-content-center">
            <p>
              <button onClick={() => this.onPrevClick()}>Previous</button>
              <button onClick={() => this.onPlayClick()}>
                {playing ? "Pause" : "Play"}
              </button>
              <button onClick={() => this.onNextClick()}>Next</button>
            </p>
          </div>
          <div>
            <Link to={"/songanalysis"}>To Audio Analysis</Link>
          </div>
        </div>
      );
    }
  }
}

export default Login;
