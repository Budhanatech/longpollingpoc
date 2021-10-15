# Long Polling POC

This application is build on top of Loopback, the main aim of this application is
to fetch data from an external datasource i.e an API and store it in the underlying
database

## Install dependencies

To install dependencies please use the following command. Also,
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

## Run the application

Before running the application please make sure you have added the environment file

```sh
npm start
```

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Tests

To run the database integration test please use the following command

```sh
npm test
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container
