# Arcade Runner
![mit](https://img.shields.io/badge/license-MIT-blue)

This project is a hosting platform for react video games. Users can play games, update their profile with their favorite games, and see their high scores. Users can also see the high scores of everyone on the site and compete to be first. It was built using React, node JS, express, mySQL.

## Site Picture
![Site](./arcade_runner.gif)

## Getting Started

To view and edit the files you can clone the repo from github using the following command:

```
git clone git@github.com:ts795/arcaderunner.git
```

After cloning the repo, mySQL, node and npm must be installed. Type
```
npm install
```
to install dependencies.

Then type the following at a node prompt to generate a token secret
```
> require('crypto').randomBytes(64).toString('hex')
```

After doing that, create a .env file in the same directory as server.js with the following content
```
DB_NAME=arcade_db
DB_USER=root
DB_PASSWORD=<your mysql password>
SECRET=<your session secret>
TOKEN_SECRET=<token secret generated with node command>
```

To run the server and compile the react app type:
```
npm run start:prod
```

then go to localhost:3000 in your browser

## Built With
* [Express](https://expressjs.com/)
* [nodeJS](https://nodejs.org/en/)
* [reactJS](https://reactjs.org/)
* [mySQL](https://www.mysql.com/)
* [sequelize](https://sequelize.org/)

## Deployed Link

* [See Live Site](https://afternoon-eyrie-60513.herokuapp.com/)

## Authors

* Alisha Pal
- Email: alishapal96@gmail.com
* Jessica Giannini
- Email: jessgiannini@gmail.com
* Josh Gumperz
- Email: joshgumperz@gmail.com
* Sam Lingampalli
- Email: sam.l.full.stack@gmail.com


## License

This project is licensed under the MIT License