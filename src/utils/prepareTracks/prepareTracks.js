const pick = require("lodash.pick");

const prepareTracks = arr => {
  return arr.map(track => {
    const updatedTrack = pick(track, [
      "album",
      "artists",
      "id",
      "name",
      "popularity",
      "uri"
    ]);
    const { album, artists, id, name, uri, popularity } = updatedTrack;
    const albumName = album.name;
    const albumImgUrl = album.images[0].url;
    const oneArtist = artists.length === 1;
    const arrayArtists = lists => {
      return lists.map(artist => {
        return artist.name;
      });
    };
    const artistName = oneArtist
      ? artists[0].name.split()
      : arrayArtists(artists);
    const artistNames =
      artistName.length !== 1 ? artistName.join(", ") : artistName;
    const newUpdatedTrack = pick(
      {
        ...updatedTrack,
        artistNames,
        albumName,
        id,
        name,
        uri,
        popularity,
        albumImgUrl
      },
      [
        "albumName",
        "artistNames",
        "albumImgUrl",
        "id",
        "name",
        "popularity",
        "uri"
      ]
    );
    return newUpdatedTrack;
  });
};

// const sortTracks = arr => {
//   arr.sort((first, second) => {
//     if (first[selectedSortBy] < second[selectedSortBy]) return 1;
//     if (first[selectedSortBy] > second[selectedSortBy]) return -1;
//     return 0;
//   });
// };

export { prepareTracks };
