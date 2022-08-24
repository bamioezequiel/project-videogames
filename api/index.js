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
    return loadGames();
  })
  .then(() => {
    server.listen(PORT, function () {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
 