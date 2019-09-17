const express = require("express");
const router = express.Router();
const Animals = require("../models/Animals");
const Enviroment = require("../models/Environment");
const Recipes = require("../models/Recipes");
const User = require("../models/User");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/", (req, res, next) => {
  const user = req.user;
  console.log("req.user: ", req.user);
  res.render("index", { user: user, layout: false });
});

// create a middleware that checks if a user is logged in

const loginCheck = () => {
  return (req, res, next) => {
    //if(rec.user)
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/auth/login");
    }
  };
};

router.get("/dashboard", loginCheck(), (req, res) => {
  var myAnimals;
  // var environment;

  Animals.find()
    .then(animals => {
      // console.log(animals);
      myAnimals = animals;
      Enviroment.find()
        .then(env => {
          Recipes.find()
            .then(recipe => {
              // console.log("aaaaanimals-----", myAnimals);
              // console.log("envvvv-----", env);
              // console.log(recipe);

              res.render("dashboard", {
                envFacts: env,
                animalList: myAnimals,
                recipeList: recipe,
                layout: false
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

router.get("/animals", loginCheck(), (req, res, next) => {
  let today = new Date();
  let currentDay = today.getDate();
  console.log(currentDay);
  let user = req.user;
  let displayDate = currentDay - user.created_at.getDate() + 1;

  Animals.findOne({ day: displayDate })
    .then(animal => {
      //
      res.render("animals", { animal: animal, layout: false });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/recipes", loginCheck(), (req, res, next) => {
  let today = new Date();
  let currentDay = today.getDate();
  console.log(currentDay);
  let user = req.user;
  let displayDate = currentDay - user.created_at.getDate() + 1;

  Recipes.findOne({ day: displayDate })
    .then(recipe => {
      //
      res.render("recipes", { recipes: recipe, layout: false });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/environment", loginCheck(), (req, res, next) => {
  let today = new Date();
  let currentDay = today.getDate();
  console.log(currentDay);
  let user = req.user;
  let displayDate = currentDay - user.created_at.getDate() + 1;

  Enviroment.findOne({ day: displayDate })
    .then(env => {
      //
      res.render("environment", { environment: env, layout: false });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/killcounter", (req, res) => {
  res.render("killcounter", { layout: false });
});

module.exports = router;
