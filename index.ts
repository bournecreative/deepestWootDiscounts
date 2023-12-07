import express, { Express, Response } from 'express';
import axios from 'axios';
import 'dotenv/config';

const app: Express = express();
const port = 8000;

app.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/test', (_, res: Response) => {
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
