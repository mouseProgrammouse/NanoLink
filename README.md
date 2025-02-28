# NanoLink

This is a practice project to build a simple yet functional URL shortener.

## Get Started

Clone the repo:

```sh
git clone <repo-url> NanoLink
```

### Install Dependencies

```sh
cd NanoLink
npm install
```

### Development

To start the development server with hot reloading:

```sh
npm run dev
```

This will start the server using nodemon, which watches for file changes and restarts the server automatically.

### Production

To build the project for production:

```sh
npm run build
```

This compiles the TypeScript code and bundles it using Webpack, outputting the result to the dist directory.

To start the production server:

```sh
npm start
```

This runs the compiled code from the dist directory using Node.js.

### Dependencies

`express`: Web framework for Node.js.
`nodemon`: Utility that monitors for changes in source code and automatically restarts the server.
`typescript`: TypeScript language support.
`webpack`: Module bundler.
`webpack-cli`: Command line interface for Webpack.
`ts-loader`: TypeScript loader for Webpack.
`webpack-dev-middleware`: Middleware for serving Webpack bundles during development.
`webpack-hot-middleware`: Middleware for enabling hot module replacement during development.
