const express = require("express");
const app = express();
const cors = require("cors");

const soccer = require("./data/soccer");
const nfl = require("./data/nfl");
const f1 = require("./data/f1");
const afl = require("./data/afl");
const rugby = require("./data/rugby");
const highlights = require("./data/highlights");
const scores = require("./data/newScores");
const manual = require("./data/manual");
const blank = require("./data/blank");
const mlb = require("./data/mlb");
const nhl = require("./data/nhl");
const nba = require("./data/nba");

const schedule = require('node-schedule');
schedule.scheduleJob('10 22 * * *', () => { // Get matches once a day
  soccer();
  afl();
  f1();
  rugby();
  nfl();
  mlb();
  blank();
  nhl();
  nba();
});

// rugby();
// nfl();
// soccer();
// f1();
// mlb();
// blank();
// nhl();
// nba();
scores();
highlights();

setInterval(function() { 
  scores();
}, 600000);

setInterval(function() { 
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} - Checking for highlights`)
  highlights();
}, 3.6e+6)

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const matchRouter = require('./routes/Matches')
app.use("/matches", matchRouter)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running...");
  });
});
