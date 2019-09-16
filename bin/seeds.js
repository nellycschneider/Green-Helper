// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Environment = require("../models/Environment");
const Animals = require("../models/Animals");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/green-helper", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt))
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

// source: Cowspiracy Facts

let environmentFacts = [
  {
    id: 1,
    facts: [
      "2,500 gallons of water are needed to produce 1 pound of beef.",
      "477 gallons of water are required to produce 1lb. of eggs."
    ],
    sources: [
      "https://www.watereducation.org/post/food-facts-how-much-water-does-it-take-produce",
      "https://waterfootprint.org/media/downloads/Hoekstra-2008-WaterfootprintFood.pdf"
    ]
  },
  {
    id: 2,
    facts: [
      "1/3 of the planet is desertified, with livestock as the leading driver.",
      "Nearly half of the contiguous US is devoted to animal agriculture."
    ],
    sources: [
      "https://www.biologicaldiversity.org/programs/public_lands/grazing/pdfs/CostsAndConsequences_01-2015.pdf",
      "https://editors.eol.org/eoearth/wiki/Overgrazing"
    ]
  },
  {
    id: 3,
    facts: [
      "90-100 million tons of fish are pulled from our oceans each year.",
      "For every 1 pound of fish caught, up to 5 pounds of unintended marine species are caught and discarded as by-kill."
    ],
    sources: [
      "http://www.fao.org/3/i2727e/i2727e01.pdf",
      "http://www.fao.org/3/W6602E/w6602E09.htm"
    ]
  },
  {
    id: 4,
    facts: [
      "Leading cause of rainforest destruction is livestock and feedcrops.",
      "Up to 137 plant, animal and insect species are lost every day."
    ],
    sources: [
      "http://www.fao.org/3/XII/0568-B1.htm",
      "https://rainforests.mongabay.com/amazon/amazon_destruction.html"
    ]
  },
  {
    id: 5,
    facts: [
      "Cows drink 45 billion gallons of water & eat 135 billion pounds a day.",
      "We are currently growing enough food to feed 10 billion people."
    ],
    sources: [
      "https://www.drovers.com/article/world-cattle-inventory-ranking-countries-fao",
      "https://www.commondreams.org/views/2012/05/08/we-already-grow-enough-food-10-billion-people-and-still-cant-end-hunger"
    ]
  },
  {
    id: 6,
    facts: [
      "82% of starving children live in countries where food is fed to animals, and eaten by other countries.",
      "Each day, a person who eats a vegan diet saves 1,100 gallons of water, 45 pounds of grain, 30 sq ft of forested land, 20 lbs CO2 equivalent, and one animal’s life."
    ],
    sources: [
      "http://comfortablyunaware.com/blog/the-world-hunger-food-choice-connection-a-summary/",
      "https://www.barnesandnoble.com/w/food-choice-and-sustainability-richard-a-oppenlander/1117327379?ean=9781626524354"
    ]
  },
  {
    id: 7,
    facts: [
      "900 gallons of water are needed for 1lb. of cheese.",
      "1,000 gallons of water are required to produce 1 gallon of milk."
    ],
    sources: [
      "https://www.worldwater.org/",
      "https://www.ewg.org/meateatersguide/interactive-graphic/water/"
    ]
  },
  {
    id: 8,
    facts: [
      "Ten thousand years ago, 99% of biomass (i.e. zoomass) was wild animals. Today, humans and the animals that we raise as food make up 98% of the zoomass.",
      "Livestock is responsible for 65% of all human-related emissions of nitrous oxide – a greenhouse gas with 296 times the global warming potential of carbon dioxide."
    ],
    sources: [
      "https://www.onegreenplanet.org/animalsandnature/facts-on-animal-farming-and-the-environment/",
      "https://link.springer.com/article/10.1007/s10584-014-1169-1"
    ]
  },
  {
    id: 9,
    facts: [
      "80% of antibiotic sold in the US are for livestock.",
      "More than 6 million animals are killed for food every hour."
    ],
    sources: [
      "http://livablefutureblog.com/2010/12/new-fda-numbers-reveal-food-animals-consume-lion%E2%80%99s-share-of-antibiotics",
      "https://awellfedworld.org/factory-farms/"
    ]
  },
  {
    id: 10,
    facts: [
      "Animal agriculture is responsible for up to 91% of Amazon destruction.",
      "1-2 acres of rainforest are cleared every second."
    ],
    sources: [
      "https://www.nytimes.com/2017/02/24/business/energy-environment/deforestation-brazil-bolivia-south-america.html?_r=0",
      "https://rainforests.mongabay.com/facts/rainforest-facts.html#8"
    ]
  },
  {
    id: 11,
    facts: [
      "3/4 of the world’s fisheries are exploited or depleted.",
      "We could see fishless oceans by 2048."
    ],
    sources: [
      "http://www.fao.org/newsroom/common/ecg/1000505/en/stocks.pdf",
      "https://www.nationalgeographic.com/animals/2006/11/seafood-biodiversity/"
    ]
  },
  {
    id: 12,
    facts: [
      "Livestock or livestock feed occupies 1/3 of the earth’s ice-free land.",
      "Livestock covers 45% of the earth’s total land."
    ],
    sources: [
      "https://www.un.org/press/en/2012/gaef3352.doc.htm",
      "http://www.fao.org/newsroom/en/News/2006/1000448/index.html"
    ]
  },
  {
    id: 13,
    facts: [
      "5% of water consumed in the US is by private homes. 55% of water consumed in the US is for animal agriculture.",
      "Animal Agriculture is responsible for 20%-33% of all fresh water consumption in the world today.  "
    ],
    facts: [
      "Jacobson, Michael F. “Six Arguments For a Greener Diet: How a More Plant-based Diet Could Save Your Health and the Environment. Chapter 4: More and Cleaner Water”. Washington, DC: Center for Science in the Public Interest, 2006.",
      "https://www.pnas.org/content/110/52/20888.full"
    ]
  },
  {
    id: 14,
    facts: [
      "As many as 40% (63 billion pounds) of fish caught globally every year are discarded.",
      "USDA predator killing of wild animals to protect livestock."
    ],
    sources: [
      "https://www.theguardian.com/environment/2014/mar/20/americas-nine-most-wasteful-fisheries-named",
      "http://www.predatordefense.org/USDA.htm"
    ]
  }
];

Environment.insertMany(environmentFacts).then(data => {
  console
    .log(
      "Success! Added " +
        data.length +
        " facts and sources to the collection :)"
    )
    .catch(err => {
      console.log(err);
    });
});

let animalResources = [
  {
    id: 1,
    name: "Why Vegan? [NOT-GRAPHIC]",
    url: "y2k4NHjAP84"
  },
  {
    id: 2,
    name: "The Food Matrix - 101 Reasons to Go Vegan",
    url: "https://www.youtube.com/watch?v=YnQb58BoBQw"
  },
  {
    id: 3,
    name: "DAIRY IS SCARY! The industry explained in 5 minutes",
    url: "https://www.youtube.com/watch?v=UcN7SGGoCNI"
  },
  {
    id: 4,
    name: "Why Vegan?",
    url: "https://www.youtube.com/watch?v=pdiOKzGw-2c"
  },
  {
    id: 5,
    name: "'Humane' slaughter DEBUNKED in 5 minutes",
    url: "https://www.youtube.com/watch?v=VI4EjUJb6PQ"
  },
  {
    id: 6,
    name: "The Wool Industry EXPOSED (What They Don't Want You To Know)",
    url: "https://www.youtube.com/watch?v=siTvjWE2aVw"
  },
  {
    id: 7,
    name: "What's Wrong With Eggs? The Truth About The Egg Industry 🍳",
    url: "https://www.youtube.com/watch?v=utPkDP3T7R4"
  },
  {
    id: 8,
    name: "This Will Make You Cry",
    url: "https://www.youtube.com/watch?v=Nowf6Z3YCnA"
  },
  {
    id: 9,
    name: "Vegan Visits Dairy Farm",
    url: "https://www.youtube.com/watch?v=iL9QJEm_SJY"
  },
  {
    id: 10,
    name: "BE THE CHANGE - INSPIRATIONAL VEGAN ANIMAL RIGHTS",
    url: "https://www.youtube.com/watch?v=CK3zdErdp7o"
  },
  {
    id: 11,
    name: "Philip Wollen : Animals Should Be Off The Menu debate",
    url: "https://www.youtube.com/watch?v=uQCe4qEexjc"
  },
  {
    id: 12,
    name:
      "You Will Never Look at Your Life in the Same Way Again | Eye-Opening Speech!",
    url: "https://www.youtube.com/watch?v=Z3u7hXpOm58"
  },
  {
    id: 13,
    name: "British Farmer's Son Shocks Vegan World with this video",
    url: "https://www.youtube.com/watch?v=SYyjel5VuHg"
  },
  {
    id: 14,
    name: "Casa de Carne",
    url: "https://www.youtube.com/watch?v=c1DcFmUrxUQ"
  }
];

Animals.insertMany(animalResources).then(data => {
  console
    .log("Success! Added " + data.length + " videos to the collection :)")
    .catch(err => {
      console.log(err);
    });
});
