# arcade runner

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