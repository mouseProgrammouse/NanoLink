import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import type { Configuration } from 'webpack';
import webpackConfig from '../webpack.config';
import linksRouter from './routes/linksRouter';
import { closeDB } from './service/db';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const compiler = webpack(webpackConfig as Configuration);

// Enable webpack middleware for hot-reloads in development
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig?.output?.publicPath || '/',
  }),
);
app.use(webpackHotMiddleware(compiler));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../../public')));

app.use('/v1/links/', linksRouter);

app.get('/', async (req, res) => {
  const indexFile = path.join(__dirname, './views', 'index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Could not read index.html', err);
      return res.status(500).send('An error occurred');
    }

    // Inject server-side rendered content
    const renderedContent = `<p>Test Page</p>`;

    return res.send(
      data.replace(
        '<div id="data"></div>',
        `<div id="data" data-shorten-url="${renderedContent}"></div>`,
      ),
    );
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Graceful shutdown handler
const shutdown = () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  // Stop accepting new connections
  server.close(() => {
    console.log('HTTP server closed.');
    // Close database
    closeDB();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
