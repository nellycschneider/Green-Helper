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

const recipes = [
  {
    day: 1,
    title: "Paella", // https://www.theeasyvegan.org/vegan-paella/
    description:
      "The quintessential Spanish dish. Simple but inexplicably delicious, with fresh onions, garlic, peppers and a lovely blend of spices.",
    image:
      "https://www.theeasyvegan.org/wp-content/uploads/2018/10/Paella-side-shot2.jpg",
    prep_time: 10,
    cook_time: 20,
    total_time: 30,
    ingredients: [
      "125 g meat substitute",
      "2 medium onions, sliced",
      "4 garlic cloves, minced",
      "1 red pepper (capsicum), sliced into thin strips",
      "160 g paella or risotto rice",
      "2 tsp smoked paprika",
      "1 tsp turmeric",
      "600 g or ml veg stock",
      "10 baby tomatoes, halved",
      "100 g fresh or frozen peas",
      "fresh flat leaf parsley to garnish",
      "lemon wedges to garnish"
    ],
    instructions: [
      "Fry the chicken style strips (or other meat substitute) until lightly browned and then remove from the pan and set aside.",
      "Over a medium high heat, sauté the onion, garlic and peppers for 3-5 minutes or until the onions have softened.",
      "Add the rice, smoked paprika and turmeric to the pan, fry for 2 minutes, stirring constantly to incorporate.",
      "Add the vegetable stock and stir until the ingredients are evenly spread over the pan. DO NOT STIR AT ALL AFTER THIS FOR AN AUTHENTIC PAELLA.",
      "Bring the paella to a boil for 10 minutes.",
      "Reduce the heat to simmering. Add the tomatoes, chicken strips and peas, pressing them very slightly into the rice. Loosely cover the pan with a lid, foil or a baking tray and leave for 8 to 10 minutes.",
      "After about 8 minutes, there should be almost no liquid visible (just a bubble here and there). You can check to see if a socarrat has developed by gently pulling back the rice with a spoon. If the socarrat has formed, you should see a deep brown coating on the surface of the pan. Be careful; too long and it will burn.",
      "Remove from the heat and uncover. Taste the rice; if it is properly cooked, cover the pan and let rest for 5 minutes. If the rice is undercooked you can add a little water or stock and simmer for a few minutes until cooked, then rest.",
      "Use a spatula to get under the whole paella and socarrat and then serve. Garnish with flat leaf parsley and lemon wedges if desired."
    ],
    url: "6qz-ObThYo4"
  },
  {
    day: 2,
    title: "Peanut Butter Pancakes", // https://minimalistbaker.com/1-bowl-peanut-butter-protein-pancakes/
    description:
      "Fluffy, light, and packed with fiber, these pancakes are the perfect way to kick off the weekend! They come together in only 20 minutes with just 1 bowl.",
    image:
      "https://minimalistbaker.com/wp-content/uploads/2019/02/Peanut-Butter-Protein-Pancakes-v1-05.jpg",
    prep_time: 15,
    cook_time: 5,
    total_time: 20,
    ingredients: [
      "batch flax egg, 1 Tbsp flaxseed meal + 2 Tbsp water",
      "120ml almond milk",
      "1/2tsp apple cider vinegar or lemon juice",
      "15ml maple syrup",
      "1/2tsp pure vanilla extract",
      "16g peanut butter or sub almond butter",
      "15g coconut oil, melted (or sub olive or avocado oil // plus more for greasing griddle)",
      "1/2tsp baking soda",
      "1tsp baking powder",
      "1 pinch sea salt",
      "67g oat flour"
    ],
    instructions: [
      "Prepare flax egg by adding flaxseed meal and water to a large mixing bowl and letting it sit for a minute or two to thicken.",
      "To a measuring cup (or small bowl), add almond milk and apple cider vinegar (or lemon juice) and stir gently to combine. Set aside to curdle.",
      "To the flax egg, add maple syrup, vanilla extract, peanut butter, and melted coconut oil and whisk to combine.",
      "Slowly add in almond milk mixture while whisking. Add baking soda, baking powder, and salt, and whisk to combine.",
      "Next, add oat flour and stir until just combined. Let batter rest while preheating griddle (about 5 minutes). The batter will be thick once it rests, but that’s a good thing! However, if it’s too thick for your liking, thin with a little almond milk and stir.",
      "Preheat an electric griddle to medium heat (about 350 degrees F), or use a large skillet on the stovetop (seasoned cast iron works great!). You want the surface to be hot but not screaming hot — oil shouldn’t smoke when it makes contact with the surface.",
      "Once hot, lightly grease your griddle with coconut or avocado oil and pour on scant 1/4-cup measurements of the batter. Flip when bubbles appear in the middle and the edges are slightly dry, being careful not to burn. Reduce heat if browning too quickly.",
      "Cook for about 2 minutes more on the other side, then plate. Top with desired toppings, such as vegan butter or more peanut butter, banana, and a light drizzle of maple syrup.",
      "Best when fresh, though leftovers will reheat well the next day in the microwave or oven. See notes for freezing instructions."
    ],
    url: "m8GRpotyje8"
  },
  {
    day: 3,
    title: "Chocolate Cake", // https://thehappypear.ie/recipes/the-most-epic-vegan-chocolate-cake/
    description:
      "This epic cake is by no means healthy, but it is insanely delicious and indulgent – just as any good chocolate cake should be! This is food for the soul and definitely one to make for a special occasion, or when you feel like royally impressing your guests.",
    image: "https://pbs.twimg.com/media/CKoMqedUMAA2EPW?format=jpg&name=medium",
    prep_time: 10,
    cook_time: 10,
    total_time: 30,
    ingredients: [
      "400ml coconut oil (melted)",
      "300g white flour (spelt)",
      "300g almond flour",
      "500ml maple syrup",
      "250ml rice milk",
      "80g coco powder",
      "4tsp baking powder",
      "2tsp salt",
      "2 tbsp vanilla extract",
      "300 g dark chocolate/ dark chocolate chips",
      "200 g solid coconut oil",
      "Grated chocolate",
      "1 full fat can of coconut milk",
      "1 tsp of vanilla extract",
      "1 tsp of maple syrup",
      "1 tub of raspberries"
    ],
    instructions: [
      "Preheat the oven to 160 degrees",
      "Get a big mixing bowl, add the coconut oil and sieve in the flour",
      "Next pour in the maple syrup and rice milk",
      "Lastly, sieve in the coco powder follwed by your baking powder, salt and vanilla extract",
      "Grab your whisk and mix the whole mixture together until it becomes smooth and combined",
      "Grab two 23cm/ 9inch cake tins and line the bottom with baking parchment",
      "Divide the cake mix by pouring it equally into the two cake tins",
      "Pop your cake tins into the oven and leave them there for about one hour",
      "When they’re cooked through (test with a knife), set aside and leave to cool (20-30mins)",
      "For the frosting, pour your coconut oil and chocolate into a glass or metal bowl over a boiling pot and allow to mix together as the ingredients melt",
      "Put the mixture back into the fridge and allow to cool and harden slightly (keep an eye on it, the texture is important for spreading on the cake)",
      "Remove the cakes from the tins and place one on your plate",
      "For the filling, remove the top creamy layer from the can then add 1 tsp of vanilla extract & 1 tsp of maple syrup, and mix all the ingredients up to look like clotted cream",
      "Spread the filling on the base layer",
      "Cover the filling with most of the raspberries (leave some for decoration), and then gently place your second cake layer on top",
      "Remove your chilled frosting from the fridge and spread over the monstrosity that is this amazing cake.",
      "Add the final touches of grated chocolate and raspberries and voilà!!"
    ],
    url: "2dT-Zbg9nHA"
  },
  {
    day: 4,
    title: "Lentil & Chickpea Shepherd's Pie", // https://www.theeasyvegan.org/vegan-lentil-and-chickpea-shepherds-pie/
    description:
      "With a rich and hearty filling and that smooth ‘cheesy’ mash topping, this shepherd’s pie is perfect for those cold winter’s nights.",
    image:
      "https://www.theeasyvegan.org/wp-content/uploads/2018/11/Vegan-lentil-chickpea-shepherds-pie2.jpg",
    prep_time: 20,
    cook_time: 25,
    total_time: 45,
    ingredients: [
      "700g maris piper potatoes",
      "100g vegan cheese, finely grated",
      "200g or ml almond milk",
      "1/2 tsp salt",
      "1/2 tsp pepper",
      "extra salt & pepper to taste",
      "350g or ml veg stock",
      "400g tin chickpeas",
      "400g tin lentils",
      "2 medium red onions",
      "1 large carrot ",
      "4-5 garlic cloves",
      "3Tbsp tomato puree",
      "2Tbsp soy sauce",
      "2tsp dry rosemary",
      "2tsp dry thyme",
      "150 g peas",
      "3 Tbsp cornflour"
    ],
    instructions: [
      "Add 350ml of boiling water to a measuring jug along with the stockpot, stir and then set aside. Replace up to 150ml of the water with red wine or ale if desired.",
      "Drain the lentils and chickpeas together. Rinse if desired. Once finished, I like to put them into the baking dish, freeing up my sieve for the potatoes.",
      "Peel potatoes (optional), chop into bite-sized chunks and boil for 10 minutes or until soft. Once the potatoes have softened up, drain and set aside to steam dry.",
      "While the potatoes are boiling, chop the onions, grate the carrot and mince or finely chop the garlic.",
      "Add about 3 Tbsps of oil to a large frying pan or sauce pan on med-high heat. Sautee the onions, carrot and garlic for about 3 minutes, until slightly softened.",
      "Take off the heat and add the tomato puree, soy sauce, rosemary and thyme. Back onto the heat until sizzling and fry for 1 minute, stirring to release the flavours. Back off the heat.",
      "This would be a good time to start preheating the oven to 220c fan oven, 230c (non-fan oven).",
      "Add the peas, lentils, chickpeas, stock and cornflour to the pan. Fry on med-high heat, stirring continuously until the sauce has thickened, coats the vegetables and no longer forms pools of liquid on the bottom of the pan when stirred. Turn off the heat.",
      "Transfer the potatoes to a bowl or sauce pan. Add the cheese, half of the milk and half a teaspoon each of salt and pepper and then mash. Keep adding milk little by little and mashing until the mash is smooth and creamy. Add more salt and pepper to taste.",
      "Give the vegetable mixture one last mix and transfer into the baking dish, spreading evenly. Press down lightly with a spatula to compact the vegetables.",
      "Spoon the mash evenly over the vegetables. It should be about 1-2cm thick all over (you may have a little left-over). Cover all of the gaps, smooth out and run a fork all over the top to give the mash some texture. This will help to give a crispy top.",
      "Place in the middle of the preheated oven for 20 minutes. Optionally, you can then put it under a high heat grill for a few minutes to get a beautifully browned top.",
      "Remove from the oven and allow to rest for 5 minutes. Cook your veggies by steaming or boiling for 3 to 5 minutes until tender.",
      "To serve, use a knife to cut portions in the shepherd’s pie, using a spatula to remove portions from the dish."
    ],
    url: "AjMDtT1Jurk"
  },
  {
    day: 5,
    title: "Dahl", // https://thehappypear.ie/recipes/5-minute-dahl/
    description:
      "Dahl is the perfect comfort food. It’s versatile and nutritious and is a foolproof way to sneak some much needed lentils into yours or your kids diet!",
    image:
      "https://www.mealgarden.com/media/cache/cc/82/cc82d5dfcf31a04ad3e9fd52a0bc93fe.jpg",
    prep_time: 10,
    cook_time: 15,
    total_time: 35,
    ingredients: [
      "3 cloves of garlic",
      "1 nub of ginger",
      "5 scallions",
      "1 tin of chickpeas",
      "1 tin of cooked lentils",
      "1 handful of spinach",
      "1 tin of coconut milk",
      "Juice of half a lime",
      "Coriander",
      "Wholemeal pittas",
      "10 cherry tomatoes",
      "2 tbsp curry powder",
      "1 tsp Turmeric",
      "2 tsp ground cumin",
      "1 tsp salt",
      "½ tsp black pepper"
    ],
    instructions: [
      "Drain and rinse the chickpeas and lentils",
      "Heat the oil on a high heat",
      "Finely chop the garlic and ginger and add to the pan",
      "Put pittas in the toaster",
      "Chop scallions and add them to the pan along with the cherry tomatoes",
      "Add the tin of coconut milk, lentils and chickpeas, and stir well",
      "Add in the spices, salt, black pepper, spinach and the juice of one lime",
      "Add the coriander stalks"
    ],
    url: "Jpq6puQleJ0"
  },
  {
    day: 6,
    title: "Ratatouille", // https://thehappypear.ie/recipes/one-pot-wonder-ratatouille/
    description:
      "Ratatouille is a delicious belly warmer with a name fancy enough to impress anyone you cook for. This one cooks itself, once you have everything in the pan Mr. Oven does the rest.",
    image:
      "https://www.thefullhelping.com/wp-content/uploads/2019/07/Tempeh-ratatouille-3.jpg",
    prep_time: 10,
    cook_time: 10,
    total_time: 20,
    ingredients: [
      "3 cloves of garlic",
      "Olive oil",
      "1 Red onion",
      "1 head of garlic",
      "1 courgette",
      "1 aubergine",
      "1 red pepper",
      "1 yellow pepper",
      "200 g potatoes",
      "2 bay leaves",
      "½ tsp black pepper",
      "1 ½ tsp salt",
      "400 ml water",
      "2 tins of tomatoes",
      "1 tsp mixed herbs",
      "Basil to garnish"
    ],
    instructions: [
      "Preheat oven to 160 degrees celcius",
      "Roughly chop your veg and cut the top off the garlic",
      "Put 1 tbsp oil into an oven proof pan on a high heat and add the onion. Add the courgette, peppers, potatoes, aubergine and bay leaves",
      "Reduce to medium heat and add the black pepper, tins of chopped tomatoes, salt and water",
      "Cover the pan with a lid and bake in oven for 1 hour along with the head of garlic which you roast for about 25 minutes",
      "Take out your ratatouille and check the potatoes are cooked",
      "Add your mixed herbs and roughly chop the roasted garlic and mix through",
      "To garnish, pluck the basil leaves off the stalk and add to your ratatouille"
    ],
    url: "nVZdm31RjjU"
  },
  {
    day: 7,
    title: "Breakfast Taquitos", // https://www.hotforfoodblog.com/recipes/2019/08/28/vegan-breakfast-taquitos/
    description:
      "Make early mornings a little easier with these breakfast taquitos! Tofu scramble, vegan cheddar, vegan sausage, and kale are a totally A+ combo.",
    image:
      "https://www.hotforfoodblog.com/wp-content/uploads/2019/08/breakfasttaquitos_hotforfood_filtered2-1.jpg",
    prep_time: 20,
    cook_time: 40,
    total_time: 60,
    ingredients: [
      "1 (14 oz/450 g) brick of firm tofu (packed in water)",
      "1/2 a large shallot, minced (about 2 tbsp) *used the other half for sausage mixture below",
      "1 tsp vegetable oil",
      "2 tbsp nutritional yeast",
      "1/2 tsp ground tumeric",
      "1/2 tsp smoked paprika",
      "1/4 to 1/2 tsp sea salt, to taste",
      "1/2 tsp ground black pepper",
      "1/4 C unsweetened nondairy milk",
      "1 tbsp vegetable oil",
      "1/2 a large shallot, minced (about 2 tbsp)",
      "2 spicy vegan sausages, thawed if from frozen (we used Beyond Meat hot italian sausages)",
      "1 C tightly packed baby kale",
      "1/2 tsp whole fennel seeds",
      "1/4 tsp sea salt",
      "1 x (7 oz/200 g) bag vegan cheddar shreds (about 2 cups)",
      "12 x 6-inch vegan flour tortillas",
      "1/2 C tomato salsa or salsa verde (for dipping)",
      "1/4 C tightly packed, finely chopped cilantro or green onion, as garnish"
    ],
    instructions: [
      "Use a paper towel to pat the tofu dry. To make the scramble, in a medium nonstick pan over medium high heat, fry the shallot in vegetable oil for 1 minute until soft.",
      "Crumble the tofu into the pan with your hands. Fry it for 2 to 3 minutes. Then stir in nutritional yeast, turmeric, smoked paprika, sea salt, and ground pepper. Fry for 4 more minutes until the liquid evaporates and the tofu begins to brown slightly.",
      "Add the nondairy milk, combine well, cook for another 2 minutes. Separate half the tofu mixture into a large bowl and set aside. Reserve the other half of the mixture for another use. Wipe out the pan.",
      "To make the sausage mixture, remove the outer sausage casing (if applicable). Heat the nonstick pan over medium heat with vegetable oil and crumble the sausage into small bite size pieces into the pan. Add shallot, fennel seeds and sea salt. Sauté until soft and the sausage is browned, about 8 to 10 minutes. Add baby kale and sauté until wilted. Add the sausage mixture into the tofu scramble and fold it in until combined. Set aside and wipe out the pan which you’ll use again to fry the taquitos.",
      "To assemble your taquitos, add a pinch of vegan cheese shreds to a tortilla, then 2 tablespoons of the tofu and sausage mixture and top with another pinch of cheese. Roll up the taquitos tightly and place them seam side down onto a platter or baking sheet.",
      "Heat up your nonstick pan over low to medium heat. Add 1 teaspoon of vegetable oil in an even layer. Depending on the size of your nonstick pan, fry 3 or 4 taquitos at a time seam side down, for about 3 to 4 minutes. Flip and lightly fry the other side, about another minute. Serve with your favorite salsa.",
      "To freeze your taquitos, individually wrap your cooled taquitos in parchment paper and twist the ends so your ends stick out like a large candy wrapper or a Christmas cracker. Place in the freezer until serving.",
      "To bake your taquitos from frozen, preheat oven to 425°F. Unwrap the taquitos from the parchment and place on a baking sheet. You can re-use the pieces of parchment from the taquitos! Bake for 10 minutes, flipping halfway until the filling is warmed through and the outside gets crispy.",
      "To microwave your taquitos from frozen, put the taquitos (parchment paper and all) on a plate and heat them up for 45 seconds. Some of the filling may seep out so you’ll want a plate under the taquitos. Unwrap and enjoy!"
    ],
    url: "yRwrNa8FBj4"
  },
  {
    day: 8,
    title: "Cubano Sandwich", // https://www.hotforfoodblog.com/recipes/2019/08/14/vegan-cubano-sandwich/
    description:
      "You'll be blown away that this meaty, cheesy stacked cubano sandwich is completely vegan!",
    image:
      "https://www.hotforfoodblog.com/wp-content/uploads/2019/07/cubansandwich_hotforfood_filtered5.jpg",
    prep_time: 25,
    cook_time: 45,
    total_time: 70,
    ingredients: [
      "1 1/2 C vital wheat gluten",
      "1/8 C nutritional yeast",
      "1 tsp onion powder",
      "1/2 tsp sea salt",
      "1/2 tsp celery salt",
      "1/2 tsp smoked paprika",
      "1/2 tsp garlic powder",
      "1/2 tsp dried thyme",
      "1/2 tsp dried oregano",
      "1/2 tsp dried basil",
      "1/2 tsp ground mustard",
      "1/2 tsp ground black pepper",
      "1 1/2 C vegan beef-flavored bouillon stock (or vegetable stock)",
      "1/8 C vegetable oil",
      "1 tbsp low sodium soy sauce or tamari",
      "1 tbsp apple cider vinegar",
      "1 1/2 tsp tomato paste",
      "2 x (800 ml) cans hearts of palm, drained and hand pulled into shreds",
      "1/2 tsp liquid smoke",
      "2 tbsp apple cider vinegar",
      "1 tbsp + 1 tsp low sodium soy sauce or tamari",
      "4 tbsp brown sugar",
      "1 tsp granulated garlic powder",
      "1 tsp chili flakes",
      "1 tsp smoked paprika",
      "1 tsp sea salt",
      "vegetable oil",
      "4 vegan french rolls",
      "4 tbsp vegan mayonnaise, divided",
      "4 to 6 garlic dill pickles, sliced thin",
      "6 to 8 slices vegan swiss cheese or mozzarella, divided",
      "4 tbsp yellow mustard, divided",
      "3 tbsp vegan butter, divided"
    ],
    instructions: [
      "Preheat the oven at 350°F.",
      "To make the seitan, in a large bowl add vital wheat gluten, nutritional yeast, onion powder, sea salt, celery salt, smoked paprika, garlic powder, dried thyme, dried oregano, dried basil, ground mustard and ground pepper.",
      "In a separate bowl add your stock, vegetable oil, soy sauce or tamari, apple cider vinegar and tomato paste. Whisk to make sure it’s well combined. Pour the wet ingredients into the dry ingredients and mix with a wooden spoon until a dough forms.",
      "Knead the dough on a clean surface, folding the dough over itself several times so you can feel the gluten forming. Form the dough into a rectangular log about 3.5 x 5-inches. Transfer the dough onto a large piece of heavy duty foil on a baking sheet. Tightly wrap the log and twist the ends. You may need 2 sheets of foil to make sure it’s covered completely and there are no tears in the foil.",
      "Bake for 90 minutes. Allow to cool to room temperature before refrigerating overnight. To use, slice thinly with a knife or on a mandolin.",
      "To make the vegan roast palm ‘pork’, take the drained hearts of palm and using your hands, pull the hearts of palm into thin shredded pieces about ⅛ to ¼-inch thick. Then add liquid smoke, apple cider vinegar, soy sauce or tamari, brown sugar, granulated garlic powder, chili flakes, smoked paprika and sea salt. Toss to coat all the pieces evenly.",
      "Heat up a cast iron pan or a non-stick pan over medium heat. You may need to pan fry the hearts of palm mixture in 2 batches. Add some vegetable oil and the hearts of palm mixture. Pan fry for 8 to 10 minutes until slightly charred in places and warmed through. Set aside.",
      "To assemble your sandwiches, spread 1 tablespoon of vegan mayonnaise on the bottom of the french roll, then add about 80 g of sliced seitan, some vegan roast palm ‘pork’, pickle slices, 2 slices of vegan cheese and spread some yellow mustard on the top half of the french roll.",
      "To grill your sandwiches, put 1 teaspoon of vegan butter in a cast iron grill pan set to medium-high heat. Place 2 sandwiches onto the grill pan and weigh down the top. Grill for 3 to 4 minutes on each side until the tops have golden grill marks and the cheese is melted. Add more butter when flipping the sandwiches and turn down the heat slightly if needed. Repeat with the last batch of sandwiches. Slice sandwiches in half and serve immediately!"
    ],
    url: "xmoHlOM8"
  },
  {
    day: 9,
    title: "Cheeseburger Bites", // https://www.hotforfoodblog.com/recipes/2018/9/13/vegan-cheeseburger-bites/
    description:
      "Here's a fun way to transform a vegan cheeseburger into a party-perfect appetizer!",
    image:
      "https://www.hotforfoodblog.com/wp-content/uploads/2019/05/vegancheeseburgerbites_hotforfood_filtered1-1024x683.jpg",
    prep_time: 20,
    cook_time: 25,
    total_time: 45,
    ingredients: [
      "3 cups all-purpose flour",
      "1 tsp sea salt",
      "1 tbsp vegetable oil",
      "1  cups warm water",
      "1 tbsp cornstarch (to prevent sticking)",
      "1 cups vegan mayonnaise",
      "2 tbsp apple cider vinegar",
      "2 tbsp sweet green relish",
      "2 tbsp ketchup",
      "1 tbsp dehydrated minced onion",
      "1 tsp garlic powder",
      "1/2 tsp ground black pepper",
      "1 tbsp hot sauce (optional)",
      "1 cups finely diced onion (about 1 onion)",
      "1 ActiFry spoon vegetable oil",
      "2 cups veggie ground round, thawed in the fridge overnight if previously frozen",
      "1 tsp sea salt",
      "1 tsp onion powder",
      "1 tsp chili powder",
      "1 tbsp vegan Worcestershire",
      "1/2 cups finely diced pickle",
      "1 cups vegan cheddar style shreds"
    ],
    instructions: [
      "Prepare the dough by combining flour and sea salt in a mixing bowl. Create a well in the middle of the flour and add water and oil and stir to combine. Once the mixture is just combined but still in pieces you can gather the dough with your hands and knead to combine it into a ball. Then turn out onto a lightly floured surface and knead it about 10 to 15 times until it’s a smooth ball of dough. Wrap it in a tea towel or plastic wrap and let it rest for 20 minutes in the fridge.",
      "Meanwhile combine the ingredients for the special sauce in a bowl or jar and refrigerate before serving.",
      "Add the onions and vegetable oil to the basin of the ActiFry and set timer for 10 minutes. After 6 minutes add the veggie ground round, sea salt, spices, and Worcestershire and continue cooking another 4 minutes.",
      "Empty this mixture into a large mixing bowl and combine with pickles and cheese.",
      "Wipe out the basin of the ActiFry and place it back in the base with the snack tray.",
      "Have a large cutting board or baking sheet dusted with cornstarch prepared. Portion the dough in half. Roll out one half onto a lightly floured surface to 1/8-inch thick.",
      "Cut out 4 1/4 to 4 1/2-inch wide circles with a cookie cutter. Remove excess dough and press together to form a ball of dough. Place cut out rounds onto your sheet or cutting board dusted with cornstarch. Continue to roll out the dough and cut out circles until the dough is used up.",
      "Scoop a heaping tablespoon of filling on top of each cut out circle. Gather and pinch all the edges of the dough together around the filling creating a bundle of dough at the top that you can pinch and twist to seal. Gently place the gathered side down onto the surface dusted with cornstarch. You should have nice rounded mounds but they don’t have to be perfect. Just ensure there’s no gaps or holes in the dough. At this point you could freeze the cheeseburger bites between layers of parchment paper. Cook from frozen as instructed below.",
      "Lightly oil the snack tray of the Actifry and place 5 to 6 bites slightly spaced apart on the tray. Brush or spray the tops with oil.",
      "Set the timer of the ActiFry for 15 minutes and cook until evenly golden brown on top. Continue cooking in batches. If cooking from frozen it may take up to 20 minutes per batch. Serve immediately with special sauce."
    ],
    url: "mllIoJJjt0s"
  },
  {
    day: 10,
    title: "BOSHballs", // https://www.bosh.tv/recipes/pasta-with-bosh-balls-veganuary-week-3
    description:
      "These are our delicious homemade BOSH! balls! Think of them as a healthy meat ball!",
    image:
      "https://d12ph5aixxtnio.cloudfront.net/uploads/images/recipes/_full/5894/kale-balls.jpg",
    prep_time: 20,
    cook_time: 25,
    total_time: 45,
    ingredients: [
      "1 tbsp of olive oil + 1 tbsp of olive oil plus more for frying",
      "1 small onion",
      "1 large clove of garlic",
      "10g fresh basil",
      "10g fresh parsley",
      "400g kale",
      "1 tsp of fennel seeds",
      "Pinch of red chilli flakes",
      "zest and juice of half a lemon",
      "1-2 slices of stale bread",
      "4 tbsp flour",
      "1 tbsp of olive oil",
      "1 onion",
      "2 garlic cloves",
      "Pinch of chilli flakes",
      "1 can of plum tomatoes",
      "100g kale",
      "150g whole wheat spaghetti",
      "10g parsley",
      "10g magic dust (nutritional yeast)"
    ],
    instructions: [],
    url: "mllIoJJjt0s"
  }
];

Recipes.insertMany(recipes).then(data => {
  console
    .log("Success! Added " + data.length + " recipes to the collection :)")
    .catch(err => {
      console.log(err);
    });
});

// source: Cowspiracy Facts

let environmentFacts = [
  {
    day: 1,
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
    day: 2,
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
    day: 3,
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
    day: 4,
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
    day: 5,
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
    day: 6,
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
    day: 7,
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
    day: 8,
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
    day: 9,
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
    day: 10,
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
    day: 11,
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
    day: 12,
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
    day: 13,
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
    day: 14,
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
    day: 1,
    name: "Why Vegan? [NOT-GRAPHIC]",
    url: "y2k4NHjAP84"
  },
  {
    day: 2,
    name: "The Food Matrix - 101 Reasons to Go Vegan",
    url: "YnQb58BoBQw"
  },
  {
    day: 3,
    name: "DAIRY IS SCARY! The industry explained in 5 minutes",
    url: "UcN7SGGoCNI"
  },
  {
    day: 4,
    name: "Why Vegan?",
    url: "pdiOKzGw-2c"
  },
  {
    day: 5,
    name: "'Humane' slaughter DEBUNKED in 5 minutes",
    url: "VI4EjUJb6PQ"
  },
  {
    day: 6,
    name: "The Wool Industry EXPOSED (What They Don't Want You To Know)",
    url: "siTvjWE2aVw"
  },
  {
    day: 7,
    name: "What's Wrong With Eggs? The Truth About The Egg Industry 🍳",
    url: "utPkDP3T7R4"
  },
  {
    day: 8,
    name: "This Will Make You Cry",
    url: "Nowf6Z3YCnA"
  },
  {
    day: 9,
    name: "Vegan Visits Dairy Farm",
    url: "iL9QJEm_SJY"
  },
  {
    day: 10,
    name: "BE THE CHANGE - INSPIRATIONAL VEGAN ANIMAL RIGHTS",
    url: "CK3zdErdp7o"
  },
  {
    day: 11,
    name: "Philip Wollen : Animals Should Be Off The Menu debate",
    url: "uQCe4qEexjc"
  },
  {
    day: 12,
    name:
      "You Will Never Look at Your Life in the Same Way Again | Eye-Opening Speech!",
    url: "Z3u7hXpOm58"
  },
  {
    day: 13,
    name: "British Farmer's Son Shocks Vegan World with this video",
    url: "SYyjel5VuHg"
  },
  {
    day: 14,
    name: "Casa de Carne",
    url: "c1DcFmUrxUQ"
  }
];

Animals.insertMany(animalResources).then(data => {
  console
    .log("Success! Added " + data.length + " videos to the collection :)")
    .catch(err => {
      console.log(err);
    });
});
