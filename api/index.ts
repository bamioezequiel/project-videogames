import { sequelize } from './src/db';
import server from './src/app';
import { loadGames } from './src/controllers/games.controllers';
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('database connected!');
    return loadGames();
  })
  .then(() => {
    server.listen(PORT, function () {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
