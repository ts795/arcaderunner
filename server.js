const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'react-app/build')));

app.use(routes);

// Wildcard route to re-direct users to /
app.get('*', (req, res, next) => {
  res.redirect("/");
  next();
}
);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to: http://localhost:${PORT}`));
});