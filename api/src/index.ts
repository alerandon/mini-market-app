import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import databaseConfig from './database';
import router from './router';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
await databaseConfig();

app.use(
  cors({
    origin: [
      'http://localhost:3000', // Next.js development server
      'http://127.0.0.1:3000', // Alternative localhost
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api`);
});
