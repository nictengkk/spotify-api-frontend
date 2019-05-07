import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Table } from "reactstrap";

function DisplayTable(props) {
  const { tracks, token } = props;
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Song Name</th>
            <th>Artist</th>
            <th>Album Name</th>
            <th>Album Art</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                {
                  <Link
                    to={{
                      pathname: "/analysis",
                      state: {
                        token: token,
                        id: track.id,
                        trackName: track.name,
                        albumName: track.albumName,
                        albumImgUrl: track.albumImgUrl
                      }
                    }}
                  >
                    {track.name}
                  </Link>
                }
              </td>
              <td>{track.artistNames}</td>
              <td>{track.albumName}</td>
              <td>
                {
                  <img
                    width="200"
                    height="200"
                    src={track.albumImgUrl}
                    alt="albumImg"
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayTable;
