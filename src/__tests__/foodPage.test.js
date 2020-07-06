import React from "react";
import { waitForDomChange, cleanup, fireEvent } from "@testing-library/react";
import renderWithContext from './tests_services/renderWithContext';
import { FoodsPage } from "../pages";
import fetch from "../../cypress/unit_tests_mocks/fetch";
import meals from "../../cypress/unit_tests_mocks/meals";
import beefMeals from "../../cypress/unit_tests_mocks/beefMeals";
import breakfastMeals from "../../cypress/unit_tests_mocks/breakfastMeals";
import chickenMeals from "../../cypress/unit_tests_mocks/chickenMeals";
import dessertMeals from "../../cypress/unit_tests_mocks/dessertMeals";
import goatMeals from "../../cypress/unit_tests_mocks/goatMeals";
import mealCategories from "../../cypress/unit_tests_mocks/mealCategories";

const mockedFetch = fetch;

const clean = () => {
  cleanup();
};

const checkFirstTwelveRecipes = (recipes, queryByTestId) => {
  const recipeType = 'Meal';

  recipes.slice(0, 12).forEach((recipe, index) => {
    const title = recipe[`str${recipeType}`]
    expect(queryByTestId(`${index}-recipe-card`)).toBeInTheDocument;
    expect(queryByTestId(`${index}-card-img`)).toHaveAttribute('src')
    expect(queryByTestId(`${index}-card-name`)).toHaveTextContent(title)
  });

  expect(queryByTestId('12-recipe-card')).not.toBeInTheDocument;
  expect(queryByTestId('12-card-img')).not.toBeInTheDocument;
  expect(queryByTestId('12-card-name')).not.toBeInTheDocument;
};
describe("Should fetch APIs", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  test("should fetch foods and categories", async () => {
    const { getByText } = renderWithContext(<FoodsPage />);

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    expect(getByText("Comidas")).toBeInTheDocument();
  });

  test("should render 12 Cards with image", async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);

    await waitForDomChange();

    meals.meals.slice(0, 12).forEach((food, index) => {
      const card = queryByTestId(`${index}-recipe-card`);
      expect(card).toBeInTheDocument();
      const cardName = queryByTestId(`${index}-card-name`);
      expect(cardName).toHaveTextContent(food.strMeal);
      const cardImage = queryByTestId(`${index}-card-img`);
      expect(cardImage).toHaveAttribute("src", food.strMealThumb);
    });
  });

  test("should handle error", async () => {
    global.fetch.mockReturnValueOnce(
      Promise.resolve({ ok: 0, json: () => Promise.resolve("Opss") }),
    );
    const { queryByTestId } = renderWithContext(<FoodsPage />);

    await waitForDomChange();

    expect(queryByTestId("error-foods-page")).toHaveTextContent("Something Went Wrong");
  });
});

describe("A tela deve possuir botões de categoria para serem utilizados como filtro", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de comida, deve-se exibir as 5 primeiras categorias de comida", async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    mealCategories.meals.slice(0, 5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).toBeInTheDocument();
    });
    mealCategories.meals.slice(5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).not.toBeInTheDocument();
    });
  });
});

describe("Ao clicar no filtro de categoria, todas as receitas devem mudar para os dados filtrados da API", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);

  it('Caso as receitas sejam de comida e a categoria seja "Beef", deve-se carregar as 12 primeiras receitas de "Beef"', async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const beefBtn = queryByTestId("Beef-category-filter");
    fireEvent.click(beefBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(beefMeals.meals, queryByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Breakfast", deve-se carregar as 12 primeiras receitas de "Breakfast"', async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const breakBtn = queryByTestId("Breakfast-category-filter");
    fireEvent.click(breakBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(breakfastMeals.meals, queryByTestId);

  });

  it('Caso as receitas sejam de comida e a categoria seja "Chicken", deve-se carregar as 12 primeiras receitas de "Chicken"', async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const chickenBtn = queryByTestId("Chicken-category-filter");
    fireEvent.click(chickenBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(chickenMeals.meals, queryByTestId);

  });

  it('Caso as receitas sejam de comida e a categoria seja "Dessert", deve-se carregar as 12 primeiras receitas de "Dessert"', async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const dessertBtn = queryByTestId("Dessert-category-filter");
    fireEvent.click(dessertBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(dessertMeals.meals, queryByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Goat", deve-se carregar as 12 primeiras receitas de "Goat"', async () => {
    const { queryByTestId, queryAllByAltText } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const goatBtn = queryByTestId("Goat-category-filter");
    fireEvent.click(goatBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(goatMeals.meals, queryByTestId);
  });
});

describe("Caso o filtro selecionado no momento seja selecionado de novo, o app deve retornar as receitas sem nenhum filtro, como se fosse um toggle", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de comida e o filtro tenha sido selecionado novamente, deve-se retornar as 12 primeiras receitas sem filtro", async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const goatBtn = queryByTestId("Goat-category-filter");
    fireEvent.click(goatBtn);
    await waitForDomChange();
    fireEvent.click(goatBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(meals.meals, queryByTestId);
     });
});

describe("Apenas um filtro de categoria deve poder ser selecionado por vez", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de comida apenas um filtro de categoria deve poder ser selecionado por vez", async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const beefBtn = queryByTestId("Beef-category-filter");
    fireEvent.click(beefBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(beefMeals.meals, queryByTestId);   
    const goatBtn = queryByTestId("Goat-category-filter");
    fireEvent.click(goatBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(goatMeals.meals, queryByTestId);   
  });
});

describe("No filtro de categorias deve existir a opção de filtrar por todas as categorias", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de comida deve existir a opção de filtrar por todas as categorias", async () => {
    const { queryByTestId } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const beefBtn = queryByTestId("Beef-category-filter");
    fireEvent.click(beefBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(beefMeals.meals, queryByTestId);    
    const allBtn = queryByTestId("All-category-filter");
    fireEvent.click(allBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(meals.meals, queryByTestId);   

  });
});

describe("Ao clicar no card, a rota deve mudar para a tela de detalhes da receita com o ID da mesma na URL", () => {
  it("Caso as receitas sejam de comida a rota deve mudar para a tela de detalhes da receita", async () => {
    const { queryByTestId, history } = renderWithContext(<FoodsPage />);
    await waitForDomChange();
    const cardBtn = queryByTestId("0-recipe-card");
    fireEvent.click(cardBtn);
    expect(history.location.pathname).toBe("/comidas/52977");
  });
});
