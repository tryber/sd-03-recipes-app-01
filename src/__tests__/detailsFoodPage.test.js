import React from 'react';
import { cleanup, waitForDomChange, fireEvent } from '@testing-library/react';
import {
  mockedFetch,
  renderWithContext,
  LocalStorage,
  Clipboard,
} from './tests_services';
import { FoodDetailsPage } from '../pages';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import srcShareBtn from '../images/shareIcon.svg';
import srcWhiteFavoriteBtn from '../images/whiteHeartIcon.svg';
import srcBlackFavoriteBtn from '../images/blackHeartIcon.svg';

window.localStorage = new LocalStorage();
navigator.clipboard = new Clipboard();

jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);

describe('DetailsFoodPage', () => {
  afterEach(cleanup);

  test('should have all the data-testids', async () => {
    const corba = meals[0];
    const { getByTestId } = renderWithContextAndRouter(<FoodDetailsPage id={52977}/>, '/comidas/52977');

    await waitForDomChange();
    expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52977}`);

    const expectedIngredientAndMeasures = [
      `${corba.strIngredient1} ${corba.strMeasure1.trim()}`,
      `${corba.strIngredient2} ${corba.strMeasure2.trim()}`,
      `${corba.strIngredient3} ${corba.strMeasure3.trim()}`,
      `${corba.strIngredient4} ${corba.strMeasure4.trim()}`,
      `${corba.strIngredient5} ${corba.strMeasure5.trim()}`,
      `${corba.strIngredient6} ${corba.strMeasure6.trim()}`,
      `${corba.strIngredient7} ${corba.strMeasure7.trim()}`,
      `${corba.strIngredient8} ${corba.strMeasure8.trim()}`,
      `${corba.strIngredient9} ${corba.strMeasure9.trim()}`,
      `${corba.strIngredient10} ${corba.strMeasure10.trim()}`,
      `${corba.strIngredient11} ${corba.strMeasure11.trim()}`,
      `${corba.strIngredient12} ${corba.strMeasure12.trim()}`,
      `${corba.strIngredient13} ${corba.strMeasure13.trim()}`,
    ];

    const mealPhoto = getByTestId('recipe-photo');
    expect(mealPhoto).toHaveAttribute('src', corba.strMealThumb);

    const mealName = getByTestId('recipe-title');
    expect(mealName).toHaveTextContent(corba.strMeal);

    const mealCategory = getByTestId('recipe-category');
    expect(mealCategory).toHaveTextContent(corba.strCategory);

    expectedIngredientAndMeasures.forEach((ingAndMea, index) => {
      const mealsIngredients = getByTestId(`${index}-ingredient-name-and-measure`);
      expect(mealsIngredients).toHaveTextContent(ingAndMea);
    })

    const mealInstructions = getByTestId('instructions');
    // expect(mealInstructions).toHaveTextContent(corba.strInstructions.replace(/\r\n/g, ' '));

    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    drinks.slice(0, 6).forEach((drink, index) => {
      const card = getByTestId(`${index}-recomendation-card`);
      expect(card).toHaveAttribute('src', drink.strDrinkThumb);
      const cardTitle = getByTestId(`${index}-recomendation-title`);
      expect(cardTitle).toHaveTextContent(drink.strDrink);
    });
  });

  test('localStorage favorite', async () => {
    const { getByTestId, getByText } = renderWithContextAndRouter(<FoodDetailsPage id={52977} />, '/comidas/52977');

    await waitForDomChange();

    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', srcWhiteFavoriteBtn);

    fireEvent.click(favoriteBtn);
    const mockedObj = JSON.stringify([{
      id: '52977',
      type: 'comida',
      area: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg'
    }]);

    expect(localStorage.getItem('favoriteRecipes')).toEqual(mockedObj);
    expect(favoriteBtn).toHaveAttribute('src', srcBlackFavoriteBtn);

    fireEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', srcWhiteFavoriteBtn);
    expect(localStorage.getItem('favoriteRecipes')).toEqual(JSON.stringify([]));
    
    const shareBtn = getByTestId('share-btn');
    expect(shareBtn).toHaveAttribute('src', srcShareBtn);
    fireEvent.click(shareBtn);

    expect(getByText('Link copiado!')).toBeInTheDocument();
  });

  test('should begin favorited', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52977' }]));

    const { getByTestId } = renderWithContextAndRouter(<FoodDetailsPage id={52977} />, '/comidas/52977');
    await waitForDomChange();

    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', srcBlackFavoriteBtn);
  });

  test('the Carrosel', async () => {
    const { getByTestId } = renderWithContextAndRouter(<FoodDetailsPage id={52977} />, '/comidas/52977');
    await waitForDomChange();
    const dotsContainer = getByTestId('dot-containers');
    const firstDot = dotsContainer.children[0];
    const SecondDot = dotsContainer.children[1];
    const ThirdDot = dotsContainer.children[2];

    const photos = [
      getByTestId('0-recomendation-title'),
      getByTestId('1-recomendation-title'),
      getByTestId('2-recomendation-title'),
      getByTestId('3-recomendation-title'),
      getByTestId('4-recomendation-title'),
      getByTestId('5-recomendation-title'),
    ];

    expect(dotsContainer.children.length).toBe(3);

    fireEvent.click(firstDot);

    expect(photos[0]).not.toHaveClass('card-invisible');
    expect(photos[2]).toHaveClass('card-invisible');
    expect(photos[5]).toHaveClass('card-invisible');

    fireEvent.click(SecondDot);

    expect(photos[1]).toHaveClass('card-invisible');
    expect(photos[2]).not.toHaveClass('card-invisible');
    expect(photos[4]).toHaveClass('card-invisible');

    fireEvent.click(ThirdDot);

    expect(photos[0]).toHaveClass('card-invisible');
    expect(photos[2]).toHaveClass('card-invisible');
    expect(photos[4]).not.toHaveClass('card-invisible');
  });

  test('prev and next arrows of Carrosel', async () => {
    const { getByText, getByTestId } = renderWithContextAndRouter(<FoodDetailsPage id={52977} />, '/comidas/52977');
    
    await waitForDomChange();

    const photos = [
      getByTestId('0-recomendation-title'),
      getByTestId('1-recomendation-title'),
      getByTestId('2-recomendation-title'),
      getByTestId('3-recomendation-title'),
      getByTestId('4-recomendation-title'),
      getByTestId('5-recomendation-title'),
    ];

    const prev = getByText('❮');
    const next = getByText('❯');
    
    expect(prev).toHaveClass('prev');
    expect(next).toHaveClass('next');

    expect(photos[0]).not.toHaveClass('card-invisible');
    expect(photos[2]).toHaveClass('card-invisible');
    expect(photos[5]).toHaveClass('card-invisible');

    fireEvent.click(prev);

    expect(photos[0]).toHaveClass('card-invisible');
    expect(photos[2]).toHaveClass('card-invisible');
    expect(photos[4]).not.toHaveClass('card-invisible');

    fireEvent.click(prev);

    expect(photos[1]).toHaveClass('card-invisible');
    expect(photos[2]).not.toHaveClass('card-invisible');
    expect(photos[4]).toHaveClass('card-invisible');

    fireEvent.click(next);

    expect(photos[0]).toHaveClass('card-invisible');
    expect(photos[2]).toHaveClass('card-invisible');
    expect(photos[4]).not.toHaveClass('card-invisible');

    fireEvent.click(next);

    expect(photos[0]).not.toHaveClass('card-invisible');
    expect(photos[2]).toHaveClass('card-invisible');
    expect(photos[5]).toHaveClass('card-invisible');
  });

  test('should handle error', async () => {
    global.fetch
      .mockReturnValueOnce(Promise.resolve({ ok: 200, json: () => Promise.resolve({ meals }) }))
      .mockReturnValue(Promise.resolve({ ok: null, json: () => Promise.resolve('Deu erradamente certo em detalhes testes') }));
    const { getByTestId } = renderWithContextAndRouter(<FoodDetailsPage id={52977} />, '/comidas/52977');

    await waitForDomChange();

    expect(getByTestId('error-recom')).toBeInTheDocument();
    expect(getByTestId('error-recom')).toHaveTextContent('Aconteceu algo errado em recomendações');
  });
});
