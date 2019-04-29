import React, { Component } from "react";

export class SongAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: ""
    };
  }

  async componentDidMount() {
    try {
      //   const { id, token } = this.props;
      const id = 115242418;
      const token =
        "BQCJ5QdmWDRHayMgdFtQdHDHbiZkB3hit1rCbKOu8QEx88gJiRK1cJp37j2mCzFHkVxSohZFogMr_BfAOOImMYcrrujaTj81atIsENWsE3hsg-imIrTWF-dDDJrcQpQXP3IgbZL5Kq-gBHfECgfMNdCZv-E";
      const res = await fetch(
        `https://api.spotify.com/v1/audio-analysis/${id}`,
        {
          method: "GET",
          headers: {
            authorisation: `Bearer ${token}`
          }
        }
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {}
  }

  render() {
    return <div>Song Analysis</div>;
  }
}

export default SongAnalysis;
