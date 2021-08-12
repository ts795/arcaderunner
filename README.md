# back-to-the-game

## Getting Started

Create a .env file in the same directory as server.js with the following content
```
DB_NAME=arcaderunner_db
DB_USER=root
DB_PASSWORD=<your mysql password>
SESSION_SECRET=<some random secret>
```
Then source db/schema.sql in the mysql shell.
After that type:
```
npm run seed
npm run start
```


## Usage

Type 
```
npm run 