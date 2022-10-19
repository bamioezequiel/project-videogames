import { sequelize } from './src/db.js';
// import { sequelize } from './src/db';
import server from './src/app.js';
import { loadGames } from './src/controllers/games.controllers.js';
import { loadAdmin } from './src/controllers/users.controllers.js';
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ force: false })
  .then( () => {
    console.log('database connected!');
    loadAdmin();
    loadGames();
    return;
  })
  .then(() => {
    server.listen(PORT, function () {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
 