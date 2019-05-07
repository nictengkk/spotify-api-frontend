import React, { Component } from "react";
import { Form } from "reactstrap";
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import SearchInput from "../../components/SearchInput/SearchInput";
import { prepareTracks } from "../../utils/prepareTracks/prepareTracks";
// import MusicDataContext from "../../MusicDataContext";
const cloneDeep = require("lodash.clonedeep");

export class Top20Songs extends Component {
  state = {
    token: "",
    tracks: [],
    searchedGenre: "",
    selectedSortBy: "popularity"
  };

  handleInput = e => {
    const stringifiedGenre = e.target.value.split(" ").join("-");
    this.setState({ searchedGenre: stringifiedGenre });
  };

  //   handleSortSelect = event => {
  //     const selectedOption = event.target.value;
  //     this.setState({ selectedSortBy: selectedOption });
  //   };

  componentDidMount() {
    const { token } = this.props.location.state;
    this.setState({ token });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { searchedGenre, selectedSortBy, token } = this.state;
      const res = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${searchedGenre}&limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      const foundTracks = cloneDeep(data.tracks);
      const refinedTracks = prepareTracks(foundTracks);
      const sortedTracks = refinedTracks.sort((first, second) => {
        if (first[selectedSortBy] < second[selectedSortBy]) return 1;
        if (first[selectedSortBy] > second[selectedSortBy]) return -1;
        return 0;
      });
      this.setState({ tracks: sortedTracks });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  render() {
    const { tracks, token } = this.state;
    console.log(tracks);
    const tracksRendered = tracks.slice(0, 20);
    console.log(tracksRendered);
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <SearchInput onChange={this.handleInput} />
          {tracks && <DisplayTable tracks={tracks} token={token} />}
        </Form>
      </React.Fragment>
    );
  }
}

export default Top20Songs;
