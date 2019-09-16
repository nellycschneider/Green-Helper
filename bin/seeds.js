// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Recipes = require("../models/Recipes");
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
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

const recipes = [
  // {
  //   id: 1,
  //   title: "Paella", // https://www.theeasyvegan.org/vegan-paella/
  //   description: "The quintessential Spanish dish. Simple but inexplicably delicious, with fresh onions, garlic, peppers and a lovely blend of spices.",
  //   image: 'https://www.theeasyvegan.org/wp-content/uploads/2018/10/Paella-side-shot2.jpg',
  //   prep_time: 10,
  //   cook_time: 20,
  //   ingredients: [
  //     "125 g meat substitute",
  //     "2 medium onions, sliced",
  //     "4 garlic cloves, minced",
  //     "1 red pepper (capsicum), sliced into thin strips",
  //     "160 g paella or risotto rice",
  //     "2 tsp smoked paprika",
  //     "1 tsp turmeric",
  //     "600 g or ml veg stock",
  //     "10 baby tomatoes, halved",
  //     "100 g fresh or frozen peas",
  //     "fresh flat leaf parsley to garnish",
  //     "lemon wedges to garnish"
  //   ],
  //   instructions: [
  //     "Fry the chicken style strips (or other meat substitute) until lightly browned and then remove from the pan and set aside.",
  //     "Over a medium high heat, sauté the onion, garlic and peppers for 3-5 minutes or until the onions have softened.",
  //     "Add the rice, smoked paprika and turmeric to the pan, fry for 2 minutes, stirring constantly to incorporate.",
  //     "Add the vegetable stock and stir until the ingredients are evenly spread over the pan. DO NOT STIR AT ALL AFTER THIS FOR AN AUTHENTIC PAELLA.",
  //     "Bring the paella to a boil for 10 minutes.",
  //     "Reduce the heat to simmering. Add the tomatoes, chicken strips and peas, pressing them very slightly into the rice. Loosely cover the pan with a lid, foil or a baking tray and leave for 8 to 10 minutes.",
  //     "After about 8 minutes, there should be almost no liquid visible (just a bubble here and there). You can check to see if a socarrat has developed by gently pulling back the rice with a spoon. If the socarrat has formed, you should see a deep brown coating on the surface of the pan. Be careful; too long and it will burn.",
  //     "Remove from the heat and uncover. Taste the rice; if it is properly cooked, cover the pan and let rest for 5 minutes. If the rice is undercooked you can add a little water or stock and simmer for a few minutes until cooked, then rest.",
  //     "Use a spatula to get under the whole paella and socarrat and then serve. Garnish with flat leaf parsley and lemon wedges if desired.",
  //   ],
  //   video: "https://youtu.be/6qz-ObThYo4"
  // },
  // {
  //   id: 2,
  //   title: "Peanut Butter Pancakes", // https://minimalistbaker.com/1-bowl-peanut-butter-protein-pancakes/
  //   description: "Fluffy, light, and packed with fiber, these pancakes are the perfect way to kick off the weekend! They come together in only 20 minutes with just 1 bowl.",
  //   image: 'https://minimalistbaker.com/wp-content/uploads/2019/02/Peanut-Butter-Protein-Pancakes-v1-05.jpg',
  //   prep_time: 15,
  //   cook_time: 5,
  //   ingredients: [
  //     "batch flax egg, 1 Tbsp flaxseed meal + 2 Tbsp water",
  //     "120ml almond milk",
  //     "1/2tsp apple cider vinegar or lemon juice",
  //     "15ml maple syrup",
  //     "1/2tsp pure vanilla extract",
  //     "16g peanut butter or sub almond butter",
  //     "15g coconut oil, melted (or sub olive or avocado oil // plus more for greasing griddle)",
  //     "1/2tsp baking soda",
  //     "1tsp baking powder",
  //     "1 pinch sea salt",
  //     "67g oat flour"
  //   ],
  //   instructions: [
  //     "Prepare flax egg by adding flaxseed meal and water to a large mixing bowl and letting it sit for a minute or two to thicken.",
  //     "To a measuring cup (or small bowl), add almond milk and apple cider vinegar (or lemon juice) and stir gently to combine. Set aside to curdle.",
  //     "To the flax egg, add maple syrup, vanilla extract, peanut butter, and melted coconut oil and whisk to combine.",
  //     "Slowly add in almond milk mixture while whisking. Add baking soda, baking powder, and salt, and whisk to combine.",
  //     "Next, add oat flour and stir until just combined. Let batter rest while preheating griddle (about 5 minutes). The batter will be thick once it rests, but that’s a good thing! However, if it’s too thick for your liking, thin with a little almond milk and stir.",
  //     "Preheat an electric griddle to medium heat (about 350 degrees F), or use a large skillet on the stovetop (seasoned cast iron works great!). You want the surface to be hot but not screaming hot — oil shouldn’t smoke when it makes contact with the surface.",
  //     "Once hot, lightly grease your griddle with coconut or avocado oil and pour on scant 1/4-cup measurements of the batter. Flip when bubbles appear in the middle and the edges are slightly dry, being careful not to burn. Reduce heat if browning too quickly.",
  //     "Cook for about 2 minutes more on the other side, then plate. Top with desired toppings, such as vegan butter or more peanut butter, banana, and a light drizzle of maple syrup.",
  //     "Best when fresh, though leftovers will reheat well the next day in the microwave or oven. See notes for freezing instructions."
  //   ],
  //   video: "https://youtu.be/m8GRpotyje8"
  // },
  // {
  //   id: 3,
  //   title: "Chocolate Cake", // https://thehappypear.ie/recipes/the-most-epic-vegan-chocolate-cake/
  //   description: "This epic cake is by no means healthy, but it is insanely delicious and indulgent – just as any good chocolate cake should be! This is food for the soul and definitely one to make for a special occasion, or when you feel like royally impressing your guests.",
  //   image: 'https://pbs.twimg.com/media/CKoMqedUMAA2EPW?format=jpg&name=medium',
  //   prep_time: 10,
  //   cook_time: 10,
  //   ingredients: [
  //     "400ml coconut oil (melted)",
  //     "300g white flour (spelt)",
  //     "300g almond flour",
  //     "500ml maple syrup",
  //     "250ml rice milk",
  //     "80g coco powder",
  //     "4tsp baking powder",
  //     "2tsp salt",
  //     "2 tbsp vanilla extract",
  //     "300 g dark chocolate/ dark chocolate chips",
  //     "200 g solid coconut oil",
  //     "Grated chocolate",
  //     "1 full fat can of coconut milk",
  //     "1 tsp of vanilla extract",
  //     "1 tsp of maple syrup",
  //     "1 tub of raspberries",
  //   ],
  //   instructions: [
  //     "Preheat the oven to 160 degrees",
  //     "Get a big mixing bowl, add the coconut oil and sieve in the flour",
  //     "Next pour in the maple syrup and rice milk",
  //     "Lastly, sieve in the coco powder follwed by your baking powder, salt and vanilla extract",
  //     "Grab your whisk and mix the whole mixture together until it becomes smooth and combined",
  //     "Grab two 23cm/ 9inch cake tins and line the bottom with baking parchment",
  //     "Divide the cake mix by pouring it equally into the two cake tins",
  //     "Pop your cake tins into the oven and leave them there for about one hour",
  //     "When they’re cooked through (test with a knife), set aside and leave to cool (20-30mins)",
  //     "For the frosting, pour your coconut oil and chocolate into a glass or metal bowl over a boiling pot and allow to mix together as the ingredients melt",
  //     "Put the mixture back into the fridge and allow to cool and harden slightly (keep an eye on it, the texture is important for spreading on the cake)",
  //     "Remove the cakes from the tins and place one on your plate",
  //     "For the filling, remove the top creamy layer from the can then add 1 tsp of vanilla extract & 1 tsp of maple syrup, and mix all the ingredients up to look like clotted cream",
  //     "Spread the filling on the base layer",
  //     "Cover the filling with most of the raspberries (leave some for decoration), and then gently place your second cake layer on top",
  //     "Remove your chilled frosting from the fridge and spread over the monstrosity that is this amazing cake.",
  //     "Add the final touches of grated chocolate and raspberries and voilà!!"
  //   ],
  //   video: "https://youtu.be/2dT-Zbg9nHA"
  // },
  // {
  //   id: 4,
  //   title: "Lentil & Chickpea Shepherd's Pie", // https://www.theeasyvegan.org/vegan-lentil-and-chickpea-shepherds-pie/
  //   description: "With a rich and hearty filling and that smooth ‘cheesy’ mash topping, this shepherd’s pie is perfect for those cold winter’s nights.",
  //   image: 'https://www.theeasyvegan.org/wp-content/uploads/2018/11/Vegan-lentil-chickpea-shepherds-pie2.jpg',
  //   prep_time: 20,
  //   cook_time: 25,
  //   ingredients: [
  //     "700g maris piper potatoes",
  //     "100g vegan cheese, finely grated",
  //     "200g or ml almond milk",
  //     "1/2 tsp salt",
  //     "1/2 tsp pepper",
  //     "extra salt & pepper to taste",
  //     "350g or ml veg stock",
  //     "400g tin chickpeas",
  //     "400g tin lentils",
  //     "2 medium red onions",
  //     "1 large carrot ",
  //     "4-5 garlic cloves",
  //     "3Tbsp tomato puree",
  //     "2Tbsp soy sauce",
  //     "2tsp dry rosemary",
  //     "2tsp dry thyme",
  //     "150 g peas",
  //     "3 Tbsp cornflour"
  //   ],
  //   instructions: [
  //     "Add 350ml of boiling water to a measuring jug along with the stockpot, stir and then set aside. Replace up to 150ml of the water with red wine or ale if desired.",
  //     "Drain the lentils and chickpeas together. Rinse if desired. Once finished, I like to put them into the baking dish, freeing up my sieve for the potatoes.",
  //     "Peel potatoes (optional), chop into bite-sized chunks and boil for 10 minutes or until soft. Once the potatoes have softened up, drain and set aside to steam dry.",
  //     "While the potatoes are boiling, chop the onions, grate the carrot and mince or finely chop the garlic.",
  //     "Add about 3 Tbsps of oil to a large frying pan or sauce pan on med-high heat. Sautee the onions, carrot and garlic for about 3 minutes, until slightly softened.",
  //     "Take off the heat and add the tomato puree, soy sauce, rosemary and thyme. Back onto the heat until sizzling and fry for 1 minute, stirring to release the flavours. Back off the heat.",
  //     "This would be a good time to start preheating the oven to 220c fan oven, 230c (non-fan oven).",
  //     "Add the peas, lentils, chickpeas, stock and cornflour to the pan. Fry on med-high heat, stirring continuously until the sauce has thickened, coats the vegetables and no longer forms pools of liquid on the bottom of the pan when stirred. Turn off the heat.",
  //     "Transfer the potatoes to a bowl or sauce pan. Add the cheese, half of the milk and half a teaspoon each of salt and pepper and then mash. Keep adding milk little by little and mashing until the mash is smooth and creamy. Add more salt and pepper to taste.",
  //     "Give the vegetable mixture one last mix and transfer into the baking dish, spreading evenly. Press down lightly with a spatula to compact the vegetables.",
  //     "Spoon the mash evenly over the vegetables. It should be about 1-2cm thick all over (you may have a little left-over). Cover all of the gaps, smooth out and run a fork all over the top to give the mash some texture. This will help to give a crispy top.",
  //     "Place in the middle of the preheated oven for 20 minutes. Optionally, you can then put it under a high heat grill for a few minutes to get a beautifully browned top.",
  //     "Remove from the oven and allow to rest for 5 minutes. Cook your veggies by steaming or boiling for 3 to 5 minutes until tender.",
  //     "To serve, use a knife to cut portions in the shepherd’s pie, using a spatula to remove portions from the dish."
  //   ],
  //   video: "https://youtu.be/AjMDtT1Jurk"
  // },
  //   {
  //   id: 5,
  //   title: "Dahl", // https://thehappypear.ie/recipes/5-minute-dahl/
  //   description: "Dahl is the perfect comfort food. It’s versatile and nutritious and is a foolproof way to sneak some much needed lentils into yours or your kids diet!",
  //   image: 'https://www.mealgarden.com/media/cache/cc/82/cc82d5dfcf31a04ad3e9fd52a0bc93fe.jpg',
  //   prep_time: 10,
  //   cook_time: 15,
  //   ingredients: [
  //     "3 cloves of garlic",
  //     "1 nub of ginger",
  //     "5 scallions",
  //     "1 tin of chickpeas",
  //     "1 tin of cooked lentils",
  //     "1 handful of spinach",
  //     "1 tin of coconut milk",
  //     "Juice of half a lime",
  //     "Coriander",
  //     "Wholemeal pittas",
  //     "10 cherry tomatoes",
  //     "2 tbsp curry powder",
  //     "1 tsp Turmeric",
  //     "2 tsp ground cumin",
  //     "1 tsp salt",
  //     "½ tsp black pepper" 
  //   ],
  //   instructions: [
  //     "Drain and rinse the chickpeas and lentils",
  //     "Heat the oil on a high heat",
  //     "Finely chop the garlic and ginger and add to the pan",
  //     "Put pittas in the toaster",
  //     "Chop scallions and add them to the pan along with the cherry tomatoes",
  //     "Add the tin of coconut milk, lentils and chickpeas, and stir well",
  //     "Add in the spices, salt, black pepper, spinach and the juice of one lime",
  //     "Add the coriander stalks"
  //   ],
  //   video: "https://youtu.be/Jpq6puQleJ0"
  // },
]
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
    url: "https://www.youtube.com/watch?v=y2k4NHjAP84"
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
