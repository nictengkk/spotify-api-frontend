import React, { Component } from "react";
import DecimalSlider from "../../components/DecimalSlider/DecimalSlider";
import NavBar from "../../components/NavBar/NavBar";
import classnames from "classnames";
import "./NowPlaying.css";
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
      console.log(track);
      this.setState({
        trackName,
        albumImgUrl,
        trackId,
        albumName,
        audioFeatures: track
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleClick = () => {};

  render() {
    const {
      trackName,
      albumImgUrl,
      trackId,
      albumName,
      audioFeatures,
      token
    } = this.state;
    const features = Object.entries(audioFeatures)
      .filter(feature => typeof feature[1] === "number")
      .filter(feature => feature[0] !== "duration_ms");

    console.log(features);
    return (
      <Container fluid>
        <div className="row justify-content-center">
          {" "}
          <NavBar token={token} />
        </div>
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
        <Container className="tabs">
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
              <Container fluid>
                {features &&
                  features.map(feature => (
                    <Row>
                      <Col sm="2">
                        <p>{feature[0]}:</p>
                      </Col>
                      <Col sm="10">
                        <DecimalSlider value={feature[1]} />
                      </Col>
                    </Row>
                  ))}
              </Container>
            </TabPane>
            <TabPane tabId="2">
              <Row />
            </TabPane>
          </TabContent>
        </Container>
      </Container>
    );
  }
}

export default NowPlaying;
