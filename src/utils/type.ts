export type UrlRecord = {
  ID: number;
  SHORT_URL: string;
  LONG_URL: string;
  DATE: string;
};

export type LongUrl = { longUrl: string };

export type ShortUrl = { shortUrl: string };

export type LinkResponse = ShortUrl | { error: string };
