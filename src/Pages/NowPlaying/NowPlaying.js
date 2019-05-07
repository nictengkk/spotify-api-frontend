import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Container,
  TabContent,
  TabPane,
  Col,
  Row
} from "reactstrap";
import DecimalSlider from "../../components/DecimalSlider/DecimalSlider";
import classnames from "classnames";

export class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    const { token } = this.props.location.state;
    this.state = {
      token: token,
      loggedIn: token ? true : false,
      trackName: "",
      trackId: "",
      albumImgUrl: "",
      albumName: "",
      activeTab: 1,
      trackDanceability: "",
      trackEnergy: "",
      trackKey: "",
      trackLoudness: "",
      trackMode: "",
      trackSpeechiness: "",
      trackAcousticness: "",
      trackInstrumentalness: "",
      trackLiveness: "",
      trackValence: "",
      trackTempo: "",
      trackDuration: ""
      //   nowPlaying: { name: "Not Checked", albumArt: "" }
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
      const response = await fetch(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      const track = await response.json();
      const trackDanceability = track.danceability;
      const trackEnergy = track.energy;
      const trackKey = track.key;
      const trackLoudness = track.loudness;
      const trackMode = track.mode;
      const trackSpeechiness = track.speechiness;
      const trackAcousticness = track.acousticness;
      const trackInstrumentalness = track.instrumentalness;
      const trackLiveness = track.trackLiveness;
      const trackValence = track.valence;
      const trackTempo = track.tempo;
      const trackDuration = track.duration_ms;
      console.log(trackDanceability);
      this.setState({
        trackName,
        albumImgUrl,
        trackId,
        albumName,
        trackEnergy,
        trackDanceability,
        trackKey,
        trackLoudness,
        trackMode,
        trackSpeechiness,
        trackAcousticness,
        trackInstrumentalness,
        trackLiveness,
        trackValence,
        trackTempo,
        trackDuration
      });
    } catch (error) {}
  }

  handleClick = () => {};

  render() {
    const {
      trackEnergy,
      trackDanceability,
      trackAcousticness,
      trackDuration,
      trackInstrumentalness,
      trackLiveness,
      trackKey,
      trackLoudness,
      trackSpeechiness,
      trackMode,
      trackTempo,
      trackValence,
      trackName,
      albumImgUrl,
      trackId,
      albumName
    } = this.state;
    return (
      <Container fluid>
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
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Analysis
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Features
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  {trackDanceability && (
                    <div>
                      <p>Danceability: </p>
                      <DecimalSlider value={trackDanceability} />
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  {trackEnergy && (
                    <div>
                      <p>Energy: </p>
                      <DecimalSlider value={trackEnergy} />
                    </div>
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <h1>Something</h1>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Container>
    );
  }
}

export default NowPlaying;
