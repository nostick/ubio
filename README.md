# Ubio Test Challenge

![CI](https://github.com/nostick/ubio/actions/workflows/main.yaml/badge.svg)

## Getting Started

This is the testing challenge for Backend Software Engineer position at Ubio, for details please follow this
[link](https://github.com/ubio/technical-challenges/tree/main/backend) to check what this software is
pretended to do

## Prerequisites

You should have installed on your computer NodeJS, Git, Docker, Docker-compose and
(Mongo if you are not going to use docker), also as optional you can use Yarn 
for installing dependencies, you can easily check if you have these softwares 
by running this commands on your shell:

```shell
npm --version
$ 6.14.14

docker --version
$ Docker version 20.10.17, build 100c701

docker-compose --version
$ Docker Compose version v2.6.1

git --version
$ git version 2.30.0

# Optional dependency
yarn --version
$ 1.22.19
```

There is also a recommendation of installing [MongoDB Compass](https://www.mongodb.com/try/download/compass)
which is pretty useful for connecting to the MongoDB and see what is happening on DB side.

## Installation

1. You should open your shell and go to the folder where you want to clone this repo

2. Once you are wherever you want to clone the code please just follow this commands
    ```shell
    git clone https://github.com/nostick/ubio.git
    cd ubio
    ```
3. There are 2 ways of running this software, you can directly run it on your local machine or use docker

### Running locally

Please keep in mind that if you want to run this software locally then you will need to have a 
mongo db server running on your machine and you will need to update those credentials on `config.ts` file.
You can either set your credentials as env vars, please check the `config.js` file to see what vars you 
need to connect to the mongo server, or you can just replace them on that file, and you should be good to go.

#### Setting environment vars

For setting these vars you can run a command like this:
```shell
export MONGO_DB=MONGO_DB
```

Once you have all the credentials required for using mongo then you have to run this commands
to start the server
```shell
npm install
npm run deploy:build
npm run deploy:serve

# If everything goes well, you should get an output like this:
$ > ubio@1.0.0 deploy:serve .../ubio
> nodemon -e js -w lib lib/main.js
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): lib/**/*
[nodemon] watching extensions: js
[nodemon] starting `node lib/main.js`
Server started successfully on 4000
```

### Running with docker

For docker is easier, just running these commands, you should be good to go
```shell
docker-compse build
docker-compose up -d

# If everything goes well and run this command:
docker ps

# You should get an output like this:
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS        PORTS                      NAMES
87daf2af08bf   mongo:latest     "docker-entrypoint.s…"   3 seconds ago   Up 1 second   0.0.0.0:27017->27017/tcp   mongodb
620a2bcc0916   ubio/challenge   "/bin/sh -c 'npm run…"   3 seconds ago   Up 1 second   0.0.0.0:4000->4000/tcp     server
```

You can also spin up only the mongodb server from docker and run locally the server
since the default values of `config.ts` file are indeed the credentials used on `./mongo/init-config.js`
then you shouldn't have any problem with mongo vars for running the server
```shell
# Spinning up only mongo
docker-compose up -d mongo

# Starting server from local
npm run deploy:serve
```

If you want to see the logs of the container to verify they are running properly
you can run this command:
```shell
docker [imageName] logs -f

# Example
docker server logs -f
```


## Usage

Since this is an API and there are specifics Specs, then the way of using this
server is making http requests to the server.

There are 4 routes available as required on the challenge

Please bear in mind i added a version to the endpoints, since the code should be scalable
and usually one of the things that makes api scalable is the availability to do versioning
of their endpoints easily 

`GET /v1`

`GET /v1/:group`

`POST /v1/:group/:id`

`DELETE /v1/:group/:id`

### Examples of requests

```shell
# GET /v1
curl --location --request GET '127.0.0.1:4000/v1'


# GET /v1/:group
curl --location --request GET '127.0.0.1:4000/v1/group-x'

# POST /v1/:group/:id
## :id have to a valid uuid, otherwise it will fail
curl --location --request POST 'localhost:4000/v1/my-group-3/6590275c-7d4a-4d4b-b146-454220e2d82a' \
--header 'Content-Type: application/json' \
--data-raw '{
    "meta1": 1,
    "meta2": "string",
    "meta3": 3
}'

# DELETE /v1/:group/:id
curl --location --request DELETE 'localhost:4000/v1/my-group-3/29f51331-56da-49f7-b929-6355479d502e' \
--header 'Content-Type: application/json' 
```

According to the challenge those should be the operations this API should be able
to make successfully.


## Testing

This repo has only integration tests and it has 100% coverage with them,
for running the tests you need to have mongo running and connected to the server
successfully otherwise all the tests will fail

Also there are some notes regarding these on a special sections, please visit this link
for more details about the notes of the tests: 
[Testing notes](https://github.com/nostick/ubio/blob/main/src/tests/README.md)

```shell
# For running available tests locally
npm run test

# For running available tests with docker
docker-compose buld tests
docker-compose run tests npm run test

################################################
# You should get an output like this either way
################################################

> ubio@1.0.0 test
> jest --maxWorkers=1 --coverage

 PASS  src/tests/integration/post-instance-route.spec.ts (5.811 s)
 PASS  src/tests/integration/get-instance-route.spec.ts
 PASS  src/tests/integration/delete-instance-route.spec.ts
 PASS  src/tests/unit/server.spec.ts
 PASS  src/tests/unit/config.spec.ts
--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |     100 |      100 |     100 |     100 |
 src                            |     100 |      100 |     100 |     100 |
  config.ts                     |     100 |      100 |     100 |     100 |
  server.ts                     |     100 |      100 |     100 |     100 |
 src/handlers/instances         |     100 |      100 |     100 |     100 |
  delete-instance.ts            |     100 |      100 |     100 |     100 |
  get-all-by-groups.ts          |     100 |      100 |     100 |     100 |
  handlers.ts                   |     100 |      100 |     100 |     100 |
  insert-instance-with-group.ts |     100 |      100 |     100 |     100 |
 src/lib                        |     100 |      100 |     100 |     100 |
  mongo.ts                      |     100 |      100 |     100 |     100 |
 src/routes                     |     100 |      100 |     100 |     100 |
  index.ts                      |     100 |      100 |     100 |     100 |
 src/routes/v1                  |     100 |      100 |     100 |     100 |
  index.ts                      |     100 |      100 |     100 |     100 |
 src/routes/v1/instances        |     100 |      100 |     100 |     100 |
  instances.ts                  |     100 |      100 |     100 |     100 |
--------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 5 passed, 5 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        9.303 s
Ran all test suites.
```

## Notes
1. There is not any auth/authz mechanism on this repo
2. The hapi server is not receiving any argument on the constructor,
it is only using the default config
3. This software was created with NodeJS 18.x
4. Probably i could implement more templates to make code more abstract
but i got focused on the resolution with the time i used for solving this.
5. I know that i skipped a lot of templating pattern
6. If you have your own custom credentials for mongo, you can add them to the,
`mongo/init-config.js` and then build the mongo image
7. There are some basic validations made with Joi, but i realize that maybe, 
could be a good idea to add a few more validations to the logi and types of
data being used on those endpoints
