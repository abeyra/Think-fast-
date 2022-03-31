require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("knex")(require("./knexfile"));

app.use(cors());
app.use(express.json());

const SERVER_PORT = process.env.PORT || 9000;

app.post("/signup", (req, res) => {
  let userName = req.body.userName;

  knex
    .select("username")
    .from("users")
    .where("username", userName)
    .then((result) => {
      if (!result.length) {
         knex("users")
          .insert(
            {
              username: userName,
            }
          )
          .then((response) => {
            console.log(response);
            console.log(userName);
            res.status(201).send({
              userName: userName,
              id: response[0]
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        res.status(400).send("Username already exists! ");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/endgame", (req, res) => {
  let attemptsLeft = req.body.attemptsLeft;
  let word = req.body.word;
  let id = req.body.id;
  console.log(attemptsLeft, word, id);

  knex
      knex("scores")
        .insert(
          {
            userId: id,
            attemptsLeft: attemptsLeft,
            correctWord: word
          }
        )
        .then((response) => {
          console.log(attemptsLeft, word, id);
          res.status(201).send(req.body);
        })
        .catch((error) => {
          console.log(error);
        });
});

// Start up the app
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});
