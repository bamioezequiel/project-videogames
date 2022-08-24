import { sequelize } from './src/db.js';
import server from './src/app.js';
import { loadGames } from './src/controllers/games.controllers.js';
import axios from 'axios';
import { dataGames } from './src/lib/data/games.js';
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ force: true })
  .then( () => {
    console.log('database connected!');
    /* let tags = ["Action",
    "Indie",
    "Adventure",
    "RPG",
    "Strategy",
    "Shooter",
    "Casual",
    "Simulation",
    "Puzzle",
    "Arcade",
    "Platformer",
    "Racing",
    "Massively Multiplayer",
    "Sports",
    "Fighting",
    "Family",
    "Board Games",
    "Educational",
    "Card",];
    
    dataGames.forEach( (el) => {
      let aux = el.genres;
      tags = [...tags, ...aux.map( (t) => t )]

    })
    console.log(new Set(tags)) */

    return loadGames();
  })
  .then(() => {
    server.listen(PORT, function () {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
 