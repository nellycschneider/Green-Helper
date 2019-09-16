const express = require("express");
const router = express.Router();
const Animals = require("../models/Animals");
const Enviroment = require("../models/Environment");
const Recipes = require("../models/Recipes");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//re
router.get("/dashboard", (req, res) => {
  var myAnimals;
  // var environment;

  Animals.find()
    .then(animals => {
      // console.log(animals);
      myAnimals = animals;
      Enviroment.find()
        .then(env => {
          // console.log("aaaaanimals-----", myAnimals);
          Recipes.find()
            .then(recipe => {
              // console.log("aaaaanimals-----", myAnimals);
              // console.log("envvvv-----", env);
              // console.log(recipe);

              res.render("dashboard", {
                envFacts: env,
                animalList: myAnimals,
                recipeList: recipe
              });
            })
            .catch(err => {
              console.log(err);
            });

          // res.render("dashboard", { envFacts: env, animalList: myAnimals });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/animals", (req, res, next) => {
  let today = new Date();
  let dd = today.getDate();
  let displayDate = dd - req.user.created_at + 1;

  User.findOne({ username }).then(data => {
    //
  });

  Animals.findOne({ day: displayDate })
    .then(animal => {
      //
      res.render("animals", { animal: animal });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
