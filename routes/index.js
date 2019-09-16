const express = require("express");
const router = express.Router();
const Animals = require("../models/Animals");
const Enviroment = require("../models/Environment");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/dashboard", (req, res) => {
  var myAnimals;

  Animals.find()
    .then(animals => {
      // console.log(animals);
      myAnimals = animals;
      Enviroment.find()
        .then(env => {
          console.log("aaaaanimals-----", myAnimals);

          res.render("dashboard", { envFacts: env, animalList: myAnimals });
        })
        .catch(err => {
          console.log(err);
        });

      //recipes here
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/dashboard/:animalId", (req, res) => {
  //
});

module.exports = router;
