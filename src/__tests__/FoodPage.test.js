import React from "react";
import { render, waitForDomChange, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { FoodsPage } from "../pages";
import Provider from "../contexts/Provider";
import meals from "../../cypress/mocks/meals";
import mealCategories from "../../cypress/mocks/mealCategories";

const renderWithFoodContext = (children, route = "/") => {
  const initialEntries = [route];
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <Router history={history}>
        <Provider>{children}</Provider>
      </Router>,
    ),
    history,
  };
};

const mockedFetch = (url) =>
  Promise.resolve({
    ok: 200,
    json: () => {
      switch (url) {
        case "https://www.themealdb.com/api/json/v1/1/search.php?s=":
          return Promise.resolve(meals);
        case "https://www.themealdb.com/api/json/v1/1/list.php?c=list":
          return Promise.resolve(mealCategories);
        default:
          return Promise.reject("test, wrong");
      }
    },
  });

const clean = () => {
  cleanup();
};

describe("Should fetch APIs", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  test("should open whth a requisition and a message of loading", async () => {
    const { getByText } = renderWithFoodContext(<FoodsPage />);

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    expect(getByText("Comidas")).toBeInTheDocument();
  });

  test("should render 12 Cards with image", async () => {
    const { getByTestId } = renderWithFoodContext(<FoodsPage />);

    await waitForDomChange();

    meals.meals.slice(0, 12).forEach((food, index) => {
      const card = getByTestId(`${index}-recipe-card`);
      expect(card).toBeInTheDocument();
      const cardName = getByTestId(`${index}-card-name`);
      expect(cardName).toHaveTextContent(food.strMeal);
      const cardImage = getByTestId(`${index}-card-img`);
      expect(cardImage).toHaveAttribute("src", food.strMealThumb);
    });
  });

  test("should handle error", async () => {
    global.fetch.mockReturnValueOnce(
      Promise.resolve({ ok: 0, json: () => Promise.resolve("Opss") }),
    );
    const { getByTestId } = renderWithFoodContext(<FoodsPage />);

    await waitForDomChange();

    expect(getByTestId("error-foods-page")).toHaveTextContent("Something Went Wrong");
  });
});

describe("Testing category filter", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  test("should display filter categories", async () => {
    const { getByTestId } = renderWithFoodContext(<FoodsPage />);
    await waitForDomChange();
    mealCategories.meals.slice(0, 5).forEach(({ strCategory }) => {
      const filterCategory = getByTestId(`${strCategory}-category-filter`);
      expect(filterCategory).toBeInTheDocument();
    });
  });

  test("filter should work", async () => {
    const { getByTestId, queryAllByAltText } = renderWithFoodContext(<FoodsPage />);
    await waitForDomChange();
    const allFilterButton = getByTestId("all-filter");
    fireEvent.click(allFilterButton);
    const foods = queryAllByAltText("food");
    const allFoods = meals.meals.slice(0, 12);
    expect(allFoods).toHaveLength(foods.length);
    mealCategories.meals.slice(0, 5).forEach(({ strCategory }, index) => {
      const filterCategory = getByTestId(`${strCategory}-category-filter`);
      fireEvent.click(filterCategory);
      const filteredMeals = meals.meals.filter((meal) => strCategory === meal.strCategory);
      const foods = queryAllByAltText("food");
      expect(filteredMeals).toHaveLength(foods.length);
    });
  });
  test("toggle filter should work", async () => {
    const { getByTestId, queryAllByAltText } = renderWithFoodContext(<FoodsPage />);
    await waitForDomChange();
    mealCategories.meals.slice(0, 5).forEach(({ strCategory }) => {
      const filterCategory = getByTestId(`${strCategory}-category-filter`);
      fireEvent.click(filterCategory);
      let filteredMeals = meals.meals.filter((meal) => strCategory === meal.strCategory);
      let foods = queryAllByAltText("food");
      expect(filteredMeals).toHaveLength(foods.length);
      fireEvent.click(filterCategory);
      filteredMeals = meals.meals.slice(0, 12);
      foods = queryAllByAltText("food");
      expect(filteredMeals).toHaveLength(foods.length);
    });
  });
});
describe("Testing footer", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  test("footer buttons should redirect", async () => {
    const { getByTestId, getByText, history } = renderWithFoodContext(<FoodsPage />);
    await waitForDomChange();
    const footer = getByTestId("footer");
    expect(footer).toBeInTheDocument();
    const drinkButton = getByTestId("drinks-bottom-btn");
    const exploreButton = getByTestId("explore-bottom-btn");
    const foodButton = getByTestId("food-bottom-btn");     
    expect(drinkButton.href).toBe('/bebidas');     
    expect(exploreButton.href).toBe('/explorar');     
    expect(foodButton.href).toBe('/comidas'); 
  });
});
describe("Testing header", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);   test("header buttons should redirect", async () => {
    const { getByTestId, getByText, history } = renderWithFoodContext(<FoodsPage />);
    await waitForDomChange();
    const profileIcon = getByTestId("profile-top-btn");     
    expect(profileIcon.href).toBe('/perfil');   
  });

  test("should show searchbar", async () => {
    const { getByTestId, getAllByRole } = renderWithFoodContext(<FoodsPage />);
    await waitForDomChange();
    const searchIcon = getByTestId("search-top-btn");
    fireEvent.click(searchIcon);   
    const searchInput = getByTestId('search-input');
    const ingredientInput = getByTestId('ingredient-search-radio')
    fireEvent.change(searchInput, {
      target: {
        value: a
      },
    }); 
    const findButton = getByTestId('exec-search-btn');
    const firstLetterBtn = getByTestId('first-letter-search-radio')
    expect(findButton).toHaveAttribute('disabled')
    fireEvent.click(ingredientInput);
    expect(findButton).not.toHaveAttribute('disabled')
    fireEvent.click(firstLetterBtn);
    fireEvent.click(findButton);
    const foods = queryAllByAltText('food')
    expect(foods).toHaveLength(2);
  });
});
