import express from 'express';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { addUrlRecord, getLastUrl } from '../service/db';
import bodyParser from 'body-parser';
import { URL_LEN_FALLBACK } from '../utils/const';
type LinkResponse = { shortUrl: string } | { error: string };

const linksRouter = express.Router();

const jsonParser = bodyParser.json();

dotenv.config();

const URL_LEN = Number(process.env.URL_LEN) || URL_LEN_FALLBACK;

/** Encode and take first URL_LEN chars */
const generateShortCode = (url: string) => btoa(url).slice(0, URL_LEN);

linksRouter.get(
  '/:shortUrl',
  async (req: Request<{ shortUrl: string }>, res: Response) => {
    try {
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
  (req: Request<{ longUrl: string }>, res: Response<LinkResponse>) => {
    const longUrl = req.body.longUrl.replace(/^https?:\/\//i, '');
    const shortUrl = generateShortCode(longUrl);
    // TODO: we need to check if the record with shortUrl exists in DB
    addUrlRecord(shortUrl, longUrl)
      .then(() => {
        res.json({ shortUrl });
      })
      .catch((error) => {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      });
  },
);

export default linksRouter;
