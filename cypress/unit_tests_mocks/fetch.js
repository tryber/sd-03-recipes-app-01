const meals = require("../unit_tests_mocks/meals");
const oneMeal = require("../unit_tests_mocks/oneMeal");
const soupMeals = require("../unit_tests_mocks/soupMeals");
const beefMeals = require("../unit_tests_mocks/beefMeals");
const breakfastMeals = require("../unit_tests_mocks/breakfastMeals");
const chickenMeals = require("../unit_tests_mocks/chickenMeals");
const dessertMeals = require("../unit_tests_mocks/dessertMeals");
const goatMeals = require("../unit_tests_mocks/goatMeals");
const emptyMeals = require("../unit_tests_mocks/emptyMeals");
const mealCategories = require("../unit_tests_mocks/mealCategories");
const mealIngredients = require("../unit_tests_mocks/mealIngredients");
const mealsByIngredient = require("../unit_tests_mocks/mealsByIngredient");
const drinks = require("../unit_tests_mocks/drinks");
const oneDrink = require("../unit_tests_mocks/oneDrink");
const ginDrinks = require("../unit_tests_mocks/ginDrinks");
const ordinaryDrinks = require("../unit_tests_mocks/ordinaryDrinks");
const cocktailDrinks = require("../unit_tests_mocks/cocktailDrinks");
const milkDrinks = require("../unit_tests_mocks/milkDrinks");
const otherDrinks = require("../unit_tests_mocks/otherDrinks");
const cocoaDrinks = require("../unit_tests_mocks/cocoaDrinks");
const emptyDrinks = require("../unit_tests_mocks/emptyDrinks");
const drinkCategories = require("../unit_tests_mocks/drinkCategories");
const drinkIngredients = require("../unit_tests_mocks/drinkIngredients");
const drinksByIngredient = require("../unit_tests_mocks/drinksByIngredient");
const areas = require("../unit_tests_mocks/areas");
const japaneseMeals = require("../unit_tests_mocks/japaneseMeals");
const italianMeals = require("../unit_tests_mocks/italianMeals");

const fetch = (url) =>
  Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      if (url === "https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        return Promise.resolve(mealCategories);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
        return Promise.resolve(drinkCategories);

      if (url === "https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        return Promise.resolve(mealIngredients);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken")
        return Promise.resolve(mealsByIngredient);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        return Promise.resolve(drinkIngredients);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum")
        return Promise.resolve(drinksByIngredient);

      if (url === "https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        return Promise.resolve(areas);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese")
        return Promise.resolve(japaneseMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian")
        return Promise.resolve(italianMeals);

      if (
        url === "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata" ||
        url === "https://www.themealdb.com/api/json/v1/1/random.php" ||
        url === "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771"
      )
        return Promise.resolve(oneMeal);

      if (
        url === "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine" ||
        url === "https://www.thecocktaildb.com/api/json/v1/1/random.php" ||
        url === "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319"
      )
        return Promise.resolve(oneDrink);

      if (url === "https://www.themealdb.com/api/json/v1/1/search.php?s=soup")
        return Promise.resolve(soupMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
        return Promise.resolve(beefMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast")
        return Promise.resolve(breakfastMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken")
        return Promise.resolve(chickenMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
        return Promise.resolve(dessertMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat")
        return Promise.resolve(goatMeals);

      if (url === "https://www.themealdb.com/api/json/v1/1/search.php?s=xablau")
        return Promise.resolve(emptyMeals);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin")
        return Promise.resolve(ginDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink")
        return Promise.resolve(ordinaryDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
        return Promise.resolve(cocktailDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake")
        return Promise.resolve(milkDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown")
        return Promise.resolve(otherDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa")
        return Promise.resolve(cocoaDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau")
        return Promise.resolve(emptyDrinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
        return Promise.resolve(drinks);

      if (url === "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997")
        return Promise.resolve(drinks);

      return Promise.resolve(meals);
    },
  });

module.exports = fetch;
