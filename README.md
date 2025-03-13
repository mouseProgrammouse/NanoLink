<p align="right">
  <img src="https://github.com/user-attachments/assets/3e1cd64d-2a06-4501-bd2d-c1e1d4566a6b" alt="parrot" width="88" height="88">
</p>

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

### Database Setup
This project uses a SQLite database. The setup script:

Ensures the database directory exists (as defined by DATABASE_PATH in your .env file).
Creates the database (using DATABASE_NAME from the .env file).
A sample .env might look like this:

`
DATABASE_PATH=./data
DATABASE_NAME=db.sqlite
`
To run the setup script (after adjusting your .env values if needed):

```sh
npm run setup-db
```
The script will create the database, create the urls table if it doesn’t already exist, and insert two sample records.

### Redis Setup

This project uses Redis for caching. You need to install and start Redis before running the project.

Install Redis on macOS using Homebrew:

```sh
brew install redis
```

Start Redis Server:

```sh
redis-server ./redis.conf
```

Ensure that Redis is running before starting the project.

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

Install all the dependencies and setup database (if needed):

```sh
npm install --omit=dev
npm run setup-db
```

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
