import React from "react";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import { render } from "react-testing-library";
import DisplayTable from "./DisplayTable";

describe("DisplayTable", () => {
  test("should display Song Name, Artists, Album Name and Album Art when rendered", () => {});
  const sampleTrack = [
    {
      name: "Free Bird",
      artistNames: ["Lynyrd Skynyrd"],
      albumName: "(Pronounced 'Leh-'Nérd 'Skin-'Nérd)",
      albumImgUrl:
        "https://i.scdn.co/image/4b37c81ce1579532d39ef417141fd883357e6a6d"
    }
  ];

  const { getByText, getByAltText } = render(
    <DisplayTable tracks={sampleTrack} />
  );

  expect(getByText(/Free Bird/i)).toBeInTheDocument();
  expect(getByText(/Lynyrd Skynyrd/i)).toBeInTheDocument();
  expect(getByText(/(Pronounced 'Leh-'Nérd 'Skin-'Nérd)/i)).toBeInTheDocument();
  expect(getByAltText("albumImg")).toHaveAttribute(
    "src",
    sampleTrack.albumImgUrl
  );
});
