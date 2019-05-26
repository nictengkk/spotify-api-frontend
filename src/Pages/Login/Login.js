import React, { Component } from "react";
import { Link } from "react-router-dom";
import MusicDataContext from "../../MusicDataContext";
import { getHashParams } from "../../utils/getHashParams/getHashParams";
import { Container, Button } from "reactstrap";
import "./Login.css";
import NavBar from "../../components/NavBar/NavBar";

export class Login extends Component {
  constructor(props) {
    super(props);

    const params = getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
      token: token,
      username: "",
      id: "",
      userImg: "",
      error: "",
      trackName: "",
      artistName: "",
      albumName: "",
      albumImg: ""
    };
    this.playerCheckInterval = null;
  }

  async componentDidMount() {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          authorization: `Bearer ${this.state.token}`
        }
      });
      const user = await res.json();
      const { display_name, images, id } = user;
      this.setState({
        username: display_name,
        userImg: images[0].url,
        id: id
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  render(props) {
    const { username, userImg, loggedIn, token, id } = this.state;
    if (!loggedIn) {
      return (
        <Container>
          <div className="row d-flex flex-row justify-content-center">
            <h1>Welcome</h1>
          </div>
          <div className="row d-flex flex-row justify-content-center">
            <p>Please login</p>
          </div>
          <div className="row d-flex flex-row justify-content-center">
            <a href="http://localhost:8888/login">Login</a>
          </div>
        </Container>
      );
    } else {
      console.log(token);
      return (
        <React.Fragment>
          <MusicDataContext.Provider value={this.state}>
            <Container className="container">
              <div className="row justify-content-center">Welcome Back</div>
              <h2 className="row justify-content-center">{username}</h2>
              <div className="row justify-content-center">
                <img
                  className="rounded-circle"
                  width={100}
                  height={100}
                  src={userImg}
                  alt="userimage"
                />
              </div>
              <h1 className="row justify-content-center">
                What would you like to do today?
              </h1>
              {/* <div className="row">
                {id && <Playlist token={token} id={id} />}
              </div> */}
              <div className="row justify-content-center">
                <Button outline color="primary" className="Button">
                  <Link
                    to={{
                      pathname: "/analysis",
                      state: {
                        token: token
                      }
                    }}
                  >
                    To Audio Analysis
                  </Link>
                </Button>{" "}
                <Button outline color="primary" className="Button">
                  <Link
                    to={{
                      pathname: "/search",
                      state: {
                        token: token
                      }
                    }}
                  >
                    To Search
                  </Link>
                </Button>{" "}
                <Button outline color="primary" className="Button">
                  <Link
                    to={{
                      pathname: "/player",
                      state: {
                        token: token
                      }
                    }}
                  >
                    To Spotify Web Player
                  </Link>
                </Button>{" "}
                <Button outline color="primary" className="Button">
                  <Link
                    to={{
                      pathname: "/nowplaying",
                      state: {
                        token: token
                      }
                    }}
                  >
                    Analyse Current Track
                  </Link>
                </Button>
              </div>
            </Container>
          </MusicDataContext.Provider>
        </React.Fragment>
      );
    }
  }
}

export default Login;
