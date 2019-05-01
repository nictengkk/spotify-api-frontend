import React, { Component } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";

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
      const { token } = this.props.location.state;
      const id = "2CIMQHirSU0MQqyYHq0eOx";
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
      this.setState({ token });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <div>Song Analysis</div>
        <SearchInput />
      </div>
    );
  }
}

export default SongAnalysis;
