import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import DecimalSlider from "../../components/DecimalSlider/DecimalSlider";

export class SongAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: "",
      albumImgUrl: "",
      trackName: "",
      audioFeatures: {
        danceability: "",
        energy: "",
        key: "",
        loudness: "",
        mode: "",
        speechiness: "",
        acousticness: "",
        instrumentalness: "",
        liveness: "",
        valence: "",
        tempo: "",
        duration: ""
      }
    };
  }

  async componentDidMount() {
    try {
      const {
        id,
        token,
        albumImgUrl,
        albumName,
        trackName
      } = this.props.location.state;
      console.log(token);
      const res = await fetch(
        `https://api.spotify.com/v1/audio-features/${id}`,
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
        trackName,
        audioFeatures: result,
        albumName: albumName
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { id, trackName, albumImgUrl, albumName } = this.props.location.state;
    const { audioFeatures } = this.state;
    const features = Object.entries(audioFeatures)
      .filter(feature => typeof feature[1] === "number")
      .filter(feature => feature[0] !== "duration_ms");
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
        <Container fluid>
          {features &&
            features.map((feature, index) => (
              <Row key={index}>
                <Col sm="2">
                  <p>{feature[0]}:</p>
                </Col>
                <Col sm="10">
                  <DecimalSlider value={feature[1]} />
                </Col>
              </Row>
            ))}
        </Container>
      </div>
    );
  }
}

export default SongAnalysis;
