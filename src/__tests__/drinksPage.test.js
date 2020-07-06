import React from "react";
import { waitForDomChange, cleanup, fireEvent } from "@testing-library/react";
import { DrinksPage } from "../pages";
import renderWithContext from "./tests_services/renderWithContext";
import fetch from "../../cypress/unit_tests_mocks/fetch";
import drinks from "../../cypress/unit_tests_mocks/drinks";
import ordinaryDrinks from "../../cypress/unit_tests_mocks/ordinaryDrinks";
import cocktailDrinks from "../../cypress/unit_tests_mocks/cocktailDrinks";
import milkDrinks from "../../cypress/unit_tests_mocks/milkDrinks";
import otherDrinks from "../../cypress/unit_tests_mocks/otherDrinks";
import cocoaDrinks from "../../cypress/unit_tests_mocks/cocoaDrinks";
import drinkCategories from "../../cypress/unit_tests_mocks/drinkCategories";

const mockedFetch = fetch;

const clean = () => {
  cleanup();
};

const checkFirstTwelveRecipes = (recipes, queryByTestId) => {
  const recipeType = "Drink";

  recipes.slice(0, 12).forEach((recipe, index) => {
    const title = recipe[`str${recipeType}`];
    expect(queryByTestId(`${index}-recipe-card`)).toBeInTheDocument;
    expect(queryByTestId(`${index}-card-img`)).toHaveAttribute("src");
    expect(queryByTestId(`${index}-card-name`)).toHaveTextContent(title);
  });

  expect(queryByTestId("12-recipe-card")).not.toBeInTheDocument;
  expect(queryByTestId("12-card-img")).not.toBeInTheDocument;
  expect(queryByTestId("12-card-name")).not.toBeInTheDocument;
};
describe("Should fetch APIs", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  test("should fetch drinks and categories", async () => {
    const { getByText } = renderWithContext(<DrinksPage />);

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(getByText("Bebidas")).toBeInTheDocument();    
  });

  test("should render 12 Cards with image", async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);

    await waitForDomChange();

    drinks.drinks.slice(0, 12).forEach((drink, index) => {
      const card = queryByTestId(`${index}-recipe-card`);
      expect(card).toBeInTheDocument();
      const cardName = queryByTestId(`${index}-card-name`);
      expect(cardName).toHaveTextContent(drink.strDrink);
      const cardImage = queryByTestId(`${index}-card-img`);
      expect(cardImage).toHaveAttribute("src", drink.strDrinkThumb);
    });
  });

  test("should handle error", async () => {
    global.fetch.mockReturnValueOnce(
      Promise.resolve({ ok: 0, json: () => Promise.resolve("Opss") }),
    );
    const { queryByTestId } = renderWithContext(<DrinksPage />);

    await waitForDomChange();

    expect(queryByTestId("error-drinks-page")).toHaveTextContent("Something Went Wrong");
  });
});

describe("A tela deve possuir botões de categoria para serem utilizados como filtro", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de bebida, deve-se exibir as 5 primeiras categorias de bebida", async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    drinkCategories.drinks.slice(0, 5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).toBeInTheDocument();
    });
    drinkCategories.drinks.slice(5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).not.toBeInTheDocument();
    });
  });
});

describe("Ao clicar no filtro de categoria, todas as receitas devem mudar para os dados filtrados da API", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);

  it('Caso as receitas sejam de comida e a categoria seja "ordinary", deve-se carregar as 12 primeiras receitas de "ordinary"', async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const ordinaryBtn = queryByTestId("Ordinary Drink-category-filter");
    fireEvent.click(ordinaryBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(ordinaryDrinks.drinks, queryByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "cocktail", deve-se carregar as 12 primeiras receitas de "cocktail"', async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const cockBtn = queryByTestId("Cocktail-category-filter");
    fireEvent.click(cockBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(cocktailDrinks.drinks, queryByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Milk / Float / Shake", deve-se carregar as 12 primeiras receitas de "Milk / Float / Shake"', async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const milkFloatShakeBtn = queryByTestId("Milk / Float / Shake-category-filter");
    fireEvent.click(milkFloatShakeBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(milkDrinks.drinks, queryByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Other/Unknown", deve-se carregar as 12 primeiras receitas de "Other/Unknown"', async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const otherUnknownBtn = queryByTestId("Other/Unknown-category-filter");
    fireEvent.click(otherUnknownBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(otherDrinks.drinks, queryByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Cocoa", deve-se carregar as 12 primeiras receitas de "Cocoa"', async () => {
    const { queryByTestId, queryAllByAltText } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const cocoaBtn = queryByTestId("Cocoa-category-filter");
    fireEvent.click(cocoaBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(cocoaDrinks.drinks, queryByTestId);
  });
});

describe("Caso o filtro selecionado no momento seja selecionado de novo, o app deve retornar as receitas sem nenhum filtro, como se fosse um toggle", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de comida e o filtro tenha sido selecionado novamente, deve-se retornar as 12 primeiras receitas sem filtro", async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const CocoaBtn = queryByTestId("Cocoa-category-filter");
    fireEvent.click(CocoaBtn);
    await waitForDomChange();
    fireEvent.click(CocoaBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(drinks.drinks, queryByTestId);
  });
});

describe("Apenas um filtro de categoria deve poder ser selecionado por vez", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de comida apenas um filtro de categoria deve poder ser selecionado por vez", async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const cockBtn = queryByTestId("Cocktail-category-filter");
    fireEvent.click(cockBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(cocktailDrinks.drinks, queryByTestId);
    const CocoaBtn = queryByTestId("Cocoa-category-filter");
    fireEvent.click(CocoaBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(cocoaDrinks.drinks, queryByTestId);
  });
});

describe("No filtro de categorias deve existir a opção de filtrar por todas as categorias", () => {
  afterEach(clean);
  jest.spyOn(global, "fetch").mockImplementation(mockedFetch);
  it("Caso as receitas sejam de comida deve existir a opção de filtrar por todas as categorias", async () => {
    const { queryByTestId } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const cockBtn = queryByTestId("Cocoa-category-filter");
    fireEvent.click(cockBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(cocoaDrinks.drinks, queryByTestId);
    const allBtn = queryByTestId("All-category-filter");
    fireEvent.click(allBtn);
    await waitForDomChange();
    checkFirstTwelveRecipes(drinks.drinks, queryByTestId);
  });
});

describe("Ao clicar no card, a rota deve mudar para a tela de detalhes da receita com o ID da mesma na URL", () => {
  it("Caso as receitas sejam de comida a rota deve mudar para a tela de detalhes da receita", async () => {
    const { queryByTestId, history } = renderWithContext(<DrinksPage />);
    await waitForDomChange();
    const cardBtn = queryByTestId("0-recipe-card");
    fireEvent.click(cardBtn);
    expect(history.location.pathname).toBe("/bebidas/15997");
  });
});
