## Installation

```bash
$ yarn install
```

## Configuration

Example of configuration file

```env
PORT=3000

MONGO_HOST="mongodb://localhost"
MONGO_PORT=27017
MONGO_DB="test"
```

Production env in `.production.env` development env in `.development.env`

## Running the app

```bash
# production mode
$ yarn start

# development mode
$ yarn start:dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```