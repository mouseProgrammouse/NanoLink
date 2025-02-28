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

### Code Quality: Linting, Formatting, and Pre-commit Hooks
To maintain high code quality and consistency, this project uses the following tools:

`ESLint` – Lints JavaScript/TypeScript files to catch errors and enforce best practices.
`Prettier` – Automatically formats code to maintain a consistent style.
`Husky` – Runs Git hooks to prevent commits that violate linting and formatting rules.

To lint and format the code, run:

```sh
npm run format-and-lint
```
