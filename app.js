const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let songs = [
  {
    id: 1,
    name: "Fix You",
    artist: "Coldplay"
  },
  {
    id: 2,
    name: "Yellow",
    artist: "Coldplay"
  }
];

//return list of all songs
app.get("/songs", (req, res) => {
  res.status(200).send(songs);
});

//create a new song, and return new song
app.post("/songs", (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist
  };

  songs.push(newSong);

  res.status(201).send(`New song record created: \n${newSong.name}`);
});

//return a song with id
app.get("/songs/:id", (req, res) => {
  let songId = req.params.id;
  let song = songs.filter(song => song.id == songId);

  res.status(200).send(song[0]);
});

//edit a song with id, and return edited song
app.put("/songs/:id", (req, res) => {
  let songId = req.params.id;
  let song = songs.filter(song => song.id == parseInt(songId))[0];

  let index = songs.map(x => x.id).indexOf(song.id);

  songs[index] = {
    id: song.id,
    name: req.body.name ? req.body.name : song.name,
    artist: req.body.artist ? req.body.artist : song.artist
  };

  res
    .status(200)
    .send(
      `Updated song record from \nid: ${song.id}\n name: ${song.name}\nartist: ${song.artist}\n to \nid: ${songs[index].id}\nname: ${songs[index].name}\nartist: ${songs[index].artist}\n`
    );
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  let songId = req.params.id;

  let index = songs.map(x => x.id).indexOf(parseInt(songId));

  res.status(200).send(songs.splice(index, 1));
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
