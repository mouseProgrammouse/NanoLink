import express from 'express';
import { Request, Response } from 'express';
import { connectDB, getLastUrl } from '../service/db';
import bodyParser from 'body-parser';

const linksRouter = express.Router();

const jsonParser = bodyParser.json();

linksRouter.get(
  '/:shortUrl',
  async (req: Request<{ shortUrl: string }>, res: Response) => {
    try {
      connectDB();
      const lastUrl = await getLastUrl();
      res.json({ lastUrl: lastUrl, req: req.params.shortUrl });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  },
);

linksRouter.post(
  '/',
  jsonParser,
  (req: Request, res: Response<{ shortUrl: string }>) => {
    console.log('req-body:', req.body);
    res.json({ shortUrl: 'hS88' });
  },
);

export default linksRouter;
