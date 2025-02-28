import express from 'express';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import type { Configuration } from 'webpack';
import webpackConfig from '../webpack.config';

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

// Handle all GET requests
app.get('*', (req, res) => {
  const indexFile = path.join(__dirname, './views', 'index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Could not read index.html', err);
      return res.status(500).send('An error occurred');
    }

    // Inject server-side rendered content if needed
    const renderedContent = '<h1>Welcome to a Project Setup</h1>';

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${renderedContent}</div>`,
      ),
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
