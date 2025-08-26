import dotenv from 'dotenv';
import express from 'express';
import databaseConfig from './database';
import router from './router';

dotenv.config();

const app = express();
const PORT = Number(process.env.API_PORT) || 3000;
await databaseConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api`);
});
