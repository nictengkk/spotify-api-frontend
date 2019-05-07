import React, { Component } from "react";

export class SongAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: "",
      albumImgUrl: "",
      result: {}
    };
  }

  async componentDidMount() {
    try {
      const { id, token, albumImgUrl, albumName } = this.props.location.state;
      console.log(token);
      const res = await fetch(
        `https://api.spotify.com/v1/audio-analysis/${id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      const result = await res.json();
      console.log(result);
      this.setState({
        albumImgUrl,
        token,
        id,
        result: result,
        albumName: albumName
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { id, trackName, albumImgUrl, albumName } = this.props.location.state;
    return (
      <div className="container fluid">
        <div className="row justify-content-center">
          <h1>Track Analysis</h1>
        </div>
        <div className="row justify-content-center">
          <p>Track Name: {trackName} </p>
        </div>
        <div className="row justify-content-center">
          <p>Track ID: {id}</p>
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

export default SongAnalysis;
