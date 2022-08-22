import { sequelize } from './src/db';
import server from './src/app';
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('database connected!');
    // return cargar base de datos
  })
  .then(() => {
    server.listen(PORT, function () {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
