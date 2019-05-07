import React, { Component } from "react";

export class NowPlaying extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props.location.state;
    this.state = {
      token: token,
      loggedIn: token ? true : false,
      trackName: "",
      trackId: "",
      albumImgUrl: "",
      albumName: ""
      //   nowPlaying: { name: "Not Checked", albumArt: "" }
    };
  }
  async componentDidMount() {
    try {
      const { token } = this.state;
      const res = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      const result = await res.json();
      const trackName = result.item.name;
      const albumName = result.item.album.name;
      const trackId = result.item.id;
      const albumImgUrl = result.item.album.images[0].url;
      console.log(trackName);
      console.log(albumImgUrl);
      console.log(trackId);
      this.setState({ trackName, albumImgUrl, trackId, albumName });
    } catch (error) {}
  }

  render() {
    const { trackName, albumImgUrl, trackId, albumName } = this.state;
    return (
      <div className="container fluid">
        <div className="row justify-content-center">
          <h1>Currently Playing</h1>
        </div>
        <div className="row justify-content-center">
          <p>Track Name: {trackName} </p>
        </div>
        <div className="row justify-content-center">
          <p>Track ID: {trackId}</p>
        </div>
        <div className="row justify-content-center">
          <p>Album Name: {albumName} </p>
        </div>
        <div className="row justify-content-center">
          <p>
            {<img src={albumImgUrl} alt="albumImg" width={200} height={200} />}{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
