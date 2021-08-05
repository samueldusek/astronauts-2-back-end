# # Astronauts - back-end :milky_way: :rocket:

Node.JS REST API that enables its users to store information about astronauts. I wrote a React based single-page application for this API, you can find it in this repo: [Astronauts - front-end](https://github.com/samueldusek/astronauts-2-front-end).

![Logo](https://i.ibb.co/n6mYdcS/github-header.png)

## Main features

- Register new user and login
- See all astronauts for given user
- Edit and delete astronauts

## Live demo

Live end point to this API: [https://api-astronauts.herokuapp.com/api](https://api-astronauts.herokuapp.com/api)

## To run this app

Clone the project

```bash
  git clone https://github.com/samueldusek/astronauts-2-back-end.git
```

Go to the project directory

```bash
  cd astronauts-2-back-end
```

Install dependencies

```bash
  npm install
```

Start the server and the app

```bash
  npm start
```

## List of allowed API requests and routes

#### To register new user

```bash
POST: https://api-astronauts.herokuapp.com/api/users/register
```

Expected JSON payload

```javascript
{
    "username": "testuser",
    "email": "test@user.com",
    "password": "test12345",
    "passwordConfirmation": "test12345"
}
```

#### To login

```bash
POST: https://api-astronauts.herokuapp.com/api/users/login
```

Expected JSON payload

```javascript
{
    "username": "testuser",
    "password": "test12345",
}
```

In the response header JWT token will be included if log in was successful. You must include this token in all astronauts related API calls to be authenticated.
In the header store it under key "jwtToken".

#### To get new Astronaut for logged in user

```bash
GET: https://api-astronauts.herokuapp.com/api/astronauts
```

#### To add new Astronaut

```bash
POST: https://api-astronauts.herokuapp.com/api/astronauts
```

Expected JSON payload

```javascript
{
    "firstName": "Random",
    "lastName": "Guy",
    "birthday": "1985-04-11T22:00:00.000Z",
    "superpower": "Flying"
}
```

#### To update existing Astronaut

```bash
PUT: https://api-astronauts.herokuapp.com/api/astronauts/:id
```

Expected JSON payload

```javascript
{
    "firstName": "Good",
    "lastName": "Guy",
    "birthday": "1985-04-11T22:00:00.000Z",
    "superpower": "Flying"
}
```

#### To delete existing Astronaut

```bash
DELETE: https://api-astronauts.herokuapp.com/api/astronauts/:id
```

## Original code :computer:

All the code you find in this repository I wrote from scratch.
