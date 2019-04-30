import React, { Component } from "react";
import { Form } from "reactstrap";
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import SearchInput from "../../components/SearchInput/SearchInput";
import { prepareTracks } from "../../utils/prepareTracks/prepareTracks";
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

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { searchedGenre, selectedSortBy } = this.state;
      const token =
        "BQCHGze2hLVStfttAGV40NP0ou7feqn7pcEw9WY08UKWaMdT2ldxA_UGyAIKUmQ1DHmZIjiClDvLeujNnl41IBjk5T_2p6zuD9b5AwaAXiniMFnOCb3wOIi3USXp4le4JmjLFJeNGSXuaMld4dikyA85a_E";
      const res = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${searchedGenre}&limit=20`,
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
    const { tracks } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <SearchInput onChange={this.handleInput} />
          {tracks && <DisplayTable tracks={tracks} />}
        </Form>
      </div>
    );
  }
}

export default Top20Songs;
