# 54q4r4 Api

![Saqara Logo](https://cdn.jaimelesstartups.fr/wp-content/uploads/2021/09/Logo-Saqara-1500x535.jpg
"Saqara Logo")
## Description

54q4r4 Api of [54q4r4](https://github.com/Geslain/54q4r4-api) project. It has been created from [NestJS](http://nestjs.com/) project

## Installation

Please refer to [54q4r4](https://github.com/Geslain/54q4r4-api) Readme file for install. This app is meant to be used with [docker](https://www.docker.com/).
But still, for development purpose you can install with the following command:

```bash
$ cp .env.template .env # Copy env variables
$ yarn install
```

## Running the app

**Don't forget that a mongo instance must run if you want to use the app without docker.**

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ docker exec 54q4r4-api yarn test 
# or 
$ yarn run test

# e2e tests
$ docker exec 54q4r4-api yarn test:e2e
# or
$ yarn run test:e2e

# test coverage
$ docker exec 54q4r4-api yarn test:cov
# or
$ yarn run test:cov
```

## Documentation

[Swagger](https://swagger.io/) documentation can be found on `/api` url

* if you launch the app locally: http://127.0.0.1:3000/api
* if you launch the app with docker: http://127.0.0.1:3001/api

## Development

The ensure a clean and normalized development process, commit hooks have been settled on this project. You can find it in the `.husky` directory

Following tools are used:
* [husky](https://typicode.github.io/husky/)
* [commitlint](https://commitlint.js.org/)
* [commitizen](https://commitizen-tools.github.io/commitizen/)

In addition, every time you commit, code is formatted, linted, and unit and e2e tests are launched.
**This also means that docker must be running in order to be able to commit.**

## License

Nest is [MIT licensed](LICENSE).
