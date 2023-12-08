import express, { Express, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

const app: Express = express();
app.use(cors());
const port = 8000;

// pages are parameters that are numbers. If you do not pass a page you get everything. Each page contains 100 deals
app.get('/', cors(), (_, res: Response) => {
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
      const payload = response.data.Items;
      res.json(payload);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
