import express, { Express, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

const app: Express = express();
app.use(cors());
const port = 8000;

app.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server');
});

// pages are parameters that are numbers. If you do not pass a page you get everything. Each page contains 100 deals
app.get('/test', cors(), (_, res: Response) => {
  const options = {
    method: 'GET',
    url: 'https://developer.woot.com/feed/Home',
    headers: {
      'x-api-key': `${process.env.VITE_AUTHKEY}`,
      'content-type': 'application/json',
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
