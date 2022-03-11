import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

import { Request, Response } from 'express';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/beto';

mongoose.connect(URI, { autoIndex: false }, (err) => {
  if (err) throw err;

  console.log('Connected to mongo!');
});

// Start server listening
const port = process.env.PORT || 5000;

app.get('/api/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello',
  });
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
