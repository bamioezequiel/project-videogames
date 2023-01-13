import "dotenv/config";
import app from "./src/app";
import db from "./src/config/mongo";

const PORT = process.env.PORT || 3002;

db()
  .then(() => console.log('🟢 DB connection succesfull 🟢'))
  .catch((error: Error) => {
    console.log('🔴 --- DB ERROR --- 🔴');
    console.log(error);
    console.log('-------------------');
  });

app.listen(PORT, () => {
  console.log(`🟢 Server listening at ${PORT} 🟢`);
});