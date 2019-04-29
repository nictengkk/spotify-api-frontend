import React, { Component } from "react";


export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
  }

  async componentDidMount() {
    const { token, id } = this.props;


    try {
      const res = await fetch(
        `https://api.spotify.com/v1/users/${id}/playlists`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      const result = await res.json();
      const foundPlaylists = result.items;
      this.setState({ playlists: foundPlaylists });
    } catch (error) {}
  }

  render(props) {
    const { playlists } = this.state;
    return (
      <div>
        <h1>This are your playlists</h1>
        <ul>
          {playlists.map((playlist, index) => (
            <li key={index}>{playlist.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Playlist;
