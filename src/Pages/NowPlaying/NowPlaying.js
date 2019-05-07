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
      activeTab: 1
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
      console.log(trackName);
      console.log(albumImgUrl);
      console.log(trackId);
      this.setState({ trackName, albumImgUrl, trackId, albumName });
    } catch (error) {}
  }

  handleClick = () => {};

  render() {
    const { trackName, albumImgUrl, trackId, albumName } = this.state;
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
                  <h4>Tab 1 Contents</h4>
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
