import express from 'express';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { addUrlRecord, getLongUrl, getShortUrl } from '../service/db';
import bodyParser from 'body-parser';
import { LinkResponse, LongUrl, ShortUrl } from '../utils/type';
import { isEmpty, shortenURL } from '../utils/util';

const linksRouter = express.Router();

const jsonParser = bodyParser.json();

dotenv.config();

const BASE = process.env.BASE || '';

linksRouter.get(
  '/:shortUrl',
  jsonParser,
  async (req: Request<ShortUrl>, res: Response) => {
    try {
      console.log('Requested Short Url', req.params.shortUrl);
      const record = await getLongUrl(req.params.shortUrl);

      if (record?.LONG_URL) {
        console.log('Redirect to:', record.LONG_URL);
        res.redirect(record.LONG_URL);
      } else {
        res.status(404).json({ error: 'URL not found' });
      }
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
  async (req: Request<LongUrl>, res: Response<LinkResponse>) => {
    try {
      const longUrl = req.body.longUrl;
      const record = await getShortUrl(longUrl);

      if (isEmpty(record)) {
        const shortUrl = shortenURL(longUrl);
        await addUrlRecord(shortUrl, longUrl);
        res.json({ shortUrl: BASE + shortUrl });
        return;
      }

      // If record exists:
      if (record?.SHORT_URL) {
        res.json({ shortUrl: BASE + record.SHORT_URL });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  },
);

export default linksRouter;
