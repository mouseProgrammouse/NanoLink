import express from 'express';
import { Request, Response } from 'express';
import { connectDB, getLastUrl } from '../service/db';

const linksRouter = express.Router();

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

export default linksRouter;
