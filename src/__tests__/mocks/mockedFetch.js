const meals = require("../");
const oneMeal = require("../mocks/oneMeal");
const soupMeals = require("../mocks/soupMeals");
const beefMeals = require("../mocks/beefMeals");
const breakfastMeals = require("../mocks/breakfastMeals");
const chickenMeals = require("../mocks/chickenMeals");
const dessertMeals = require("../mocks/dessertMeals");
const goatMeals = require("../mocks/goatMeals");
const emptyMeals = require("../mocks/emptyMeals");
const mealCategories = require("../mocks/mealCategories");
const mealIngredients = require("../mocks/mealIngredients");
const mealsByIngredient = require("../mocks/mealsByIngredient");
const drinks = require("../mocks/drinks");
const oneDrink = require("../mocks/oneDrink");
const ginDrinks = require("../mocks/ginDrinks");
const ordinaryDrinks = require("../mocks/ordinaryDrinks");
const cocktailDrinks = require("../mocks/cocktailDrinks");
const milkDrinks = require("../mocks/milkDrinks");
const otherDrinks = require("../mocks/otherDrinks");
const cocoaDrinks = require("../mocks/cocoaDrinks");
const emptyDrinks = require("../mocks/emptyDrinks");
const drinkCategories = require("../mocks/drinkCategories");
const drinkIngredients = require("../mocks/drinkIngredients");
const drinksByIngredient = require("../mocks/drinksByIngredient");
const areas = require("../mocks/areas");
const japaneseMeals = require("../mocks/japaneseMeals");
const italianMeals = require("../mocks/italianMeals");

const fetch = (url) =>
  Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      switch (url) {
        case "https://www.themealdb.com/api/json/v1/1/list.php?c=list":
          return Promise.resolve(mealCategories);

        case "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list":
          return Promise.resolve(drinkCategories);

        case "https://www.themealdb.com/api/json/v1/1/list.php?i=list":
          return Promise.resolve(mealIngredients);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken":
          return Promise.resolve(mealsByIngredient);

        case "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list":
          return Promise.resolve(drinkIngredients);

        case "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum":
          return Promise.resolve(drinksByIngredient);

        case "https://www.themealdb.com/api/json/v1/1/list.php?a=list":
          return Promise.resolve(areas);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese":
          return Promise.resolve(japaneseMeals);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian":
          return Promise.resolve(italianMeals);

        case "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata" ||
          "https://www.themealdb.com/api/json/v1/1/random.php" ||
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771":
          return Promise.resolve(oneMeal);

        case "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine" ||
          "https://www.thecocktaildb.com/api/json/v1/1/random.php" ||
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319":
          return Promise.resolve(oneDrink);

        case "https://www.themealdb.com/api/json/v1/1/search.php?s=soup":
          return Promise.resolve(soupMeals);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef":
          return Promise.resolve(beefMeals);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast":
          return Promise.resolve(breakfastMeals);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken":
          return Promise.resolve(chickenMeals);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert":
          return Promise.resolve(dessertMeals);

        case "https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat":
          return Promise.resolve(goatMeals);

        case "https://www.themealdb.com/api/json/v1/1/search.php?s=xablau":
          return Promise.resolve(emptyMeals);

        case "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin":
          return Promise.resolve(ginDrinks);

        case "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink":
          return Promise.resolve(ordinaryDrinks);

        case "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail":
          return Promise.resolve(cocktailDrinks);

        case "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake":
          return Promise.resolve(milkDrinks);

        case "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown":
          return Promise.resolve(otherDrinks);

        case "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa":
          return Promise.resolve(cocoaDrinks);

        case "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau":
          return Promise.resolve(emptyDrinks);

        case "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=":
          return Promise.resolve(drinks);

        default:
          return Promise.resolve(meals);
      }
    },
  });

module.exports = fetch;
