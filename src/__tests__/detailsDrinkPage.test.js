import React from "react";
import { cleanup, waitForDomChange, fireEvent } from "@testing-library/react";
import { mockedFetch, renderWithContext, LocalStorage, Clipboard } from "./tests_services";
import { DrinkDetailsPage } from "../pages";
import { meals } from "../../cypress/unit_tests_mocks/meals";
import { drinks } from '../../cypress/unit_tests_mocks/drinks';
import srcShareBtn from "../images/shareIcon.svg";
import srcWhiteFavoriteBtn from "../images/whiteHeartIcon.svg";
import srcBlackFavoriteBtn from "../images/blackHeartIcon.svg";

window.localStorage = new LocalStorage();
navigator.clipboard = new Clipboard();

jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);

describe("Drink Details Page", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);
  jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

  test("should have data-testids", async () => {
    const GG = drinks[0];
    const { getByTestId } = renderWithContext(<DrinkDetailsPage id={15997}/>, '/bebidas/15997');
    await waitForDomChange();
        
    expect(fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${15997}`);

    const expectedIngredientAndMeasures = [
      `${GG.strIngredient1} ${GG.strMeasure1.trim()}`,
      `${GG.strIngredient2}`, // both dont have measure
      `${GG.strIngredient3}`,
    ];

    const drinkPhoto = getByTestId('recipe-photo');
    expect(drinkPhoto).toHaveAttribute("src", GG.strDrinkThumb);

    const drinkName = getByTestId("recipe-title");
    expect(drinkName).toHaveTextContent(GG.strDrink);

    const drinkCategory = getByTestId("recipe-category");
    expect(drinkCategory).toHaveTextContent("Optional alcohol");

    expectedIngredientAndMeasures.forEach((ingAndMea, index) => {
      const drinksIngredients = getByTestId(`${index}-ingredient-name-and-measure`);
      expect(drinksIngredients).toHaveTextContent(ingAndMea);
    });

    const drinkInstructions = getByTestId("instructions");
    expect(drinkInstructions).toHaveTextContent(GG.strInstructions);

    meals.slice(0, 6).forEach((meal, index) => {
      const card = getByTestId(`${index}-recomendation-card`);
      expect(card).toHaveAttribute("src", meal.strMealThumb);
      const cardTitle = getByTestId(`${index}-recomendation-title`);
      expect(cardTitle).toHaveTextContent(meal.strMeal);
    });
  });

  test("should update the localStorage favorite", async () => {
    const { getByTestId } = renderWithContext(<DrinkDetailsPage id={15997} />);

    await waitForDomChange();

    const favoriteBtn = getByTestId("favorite-btn");
    expect(favoriteBtn).toHaveAttribute("src", srcWhiteFavoriteBtn);

    fireEvent.click(favoriteBtn);

    const mockedFavorite = {
      id: "15997",
      type: "bebida",
      area: "",
      category: "Ordinary Drink",
      alcoholicOrNot: "Optional alcohol",
      name: "GG",
      image: "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
    };
    expect(JSON.parse(localStorage.getItem("favoriteRecipes"))).toEqual([mockedFavorite]);
    expect(favoriteBtn).toHaveAttribute("src", srcBlackFavoriteBtn);

    fireEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute("src", srcWhiteFavoriteBtn);
    expect(localStorage.getItem("favoriteRecipes")).toEqual(JSON.stringify([]));
  });

  test("share Button", async () => {
    const { getByTestId, getByText } = renderWithContext(<DrinkDetailsPage id={15997} />);
    await waitForDomChange();

    const shareBtn = getByTestId("share-btn");
    expect(shareBtn).toHaveAttribute("src", srcShareBtn);
    fireEvent.click(shareBtn);

    expect(getByText("Link copiado!")).toBeInTheDocument();
  });

  test("should start favorited", async () => {
    localStorage.setItem("favoriteRecipes", JSON.stringify([{ id: "15997" }]));
    const { getByTestId } = renderWithContext(<DrinkDetailsPage id={15997} />);
    await waitForDomChange();

    const favoriteBtn = getByTestId("favorite-btn");
    expect(favoriteBtn).toHaveAttribute("src", srcBlackFavoriteBtn);
  });

  test("Start Recipe Btn, should exist and update url and localStorage", async () => {
    const { getByTestId, history } = renderWithContext(<DrinkDetailsPage id={15997} />);
    const GG = drinks[0];

    await waitForDomChange();

    const startBtn = getByTestId("start-recipe-btn");
    expect(startBtn).toHaveTextContent("Iniciar Receita");

    fireEvent.click(startBtn);

    const mockInProgress = {
      cocktails: {
        15997: [
          { ingredient: GG.strIngredient1, measure: GG.strMeasure1 },
          { ingredient: GG.strIngredient2, measure: GG.strMeasure2 },
          { ingredient: GG.strIngredient3, measure: GG.strMeasure3 },
        ],
      },
      meals: {},
    };
    expect(history.location.pathname).toEqual(`/bebidas/${15997}/in-progress`);
    expect(JSON.parse(localStorage.getItem("inProgressRecipes"))).toEqual(mockInProgress);
  });

  test("the Btn Start should be responsible to last acts", async () => {
    const GG = drinks[0];
    localStorage.setItem(
      "inProgressRecipes",
      JSON.stringify({
        cocktails: {
          15997: [
            { ingredient: GG.strIngredient1, measure: GG.strMeasure1 },
            { ingredient: GG.strIngredient2, measure: GG.strMeasure2 },
            { ingredient: GG.strIngredient3, measure: GG.strMeasure3 },
          ],
        },
        meals: {},
      }),
    );
    const { getByTestId } = renderWithContext(<DrinkDetailsPage id={15997} />);

    await waitForDomChange();

    expect(getByTestId("start-recipe-btn")).toHaveTextContent("Continuar Receita");
  });

  test("the Btn Start should be responsible to last acts", async () => {
    localStorage.setItem("doneRecipes", JSON.stringify([{ id: 15997 }]));
    const { queryByTestId } = renderWithContext(<DrinkDetailsPage id={15997} />);

    await waitForDomChange();

    expect(queryByTestId("start-recipe-btn")).not.toBeInTheDocument();
  });
});
