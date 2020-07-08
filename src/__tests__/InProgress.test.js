import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';

import { InProcessPage } from '../pages';

import { LocalStorage, renderWithContext, Clipboard, mockedFetch } from './tests_services';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import { handleFoodsData } from '../services/APIs/FOODS_API';
import { handleDrinksData } from '../services/APIs/DRINKS_API';

import srcShareBtn from '../images/shareIcon.svg';
import srcWhiteFavoriteBtn from '../images/whiteHeartIcon.svg';
import srcBlackFavoriteBtn from '../images/blackHeartIcon.svg';

localStorage = new LocalStorage();
navigator.clipboard = new Clipboard();
jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

describe('InProcessPage food', () => {
  const corba = handleFoodsData(meals[0]);
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { 52977: [] }, cocktails: {} }),
    );
  });

  test('should display the image, name, category and instructions', async () => {
    const { getByTestId } = renderWithContext(<InProcessPage id={52977} type="food" />);
    await waitForDomChange();
    const title = getByTestId('recipe-title');
    const image = getByTestId('recipe-photo');
    const category = getByTestId('recipe-category');
    getByTestId('instructions');

    expect(title).toHaveTextContent(corba.name);
    expect(image).toHaveAttribute('src', corba.srcImage);
    expect(category).toHaveTextContent(corba.category);
  });

  test('localStorage favorite', async () => {
    const { getByTestId, getByText } = renderWithContext(<InProcessPage id={52977} type="food" />);
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
    const { getByTestId } = renderWithContext(<InProcessPage id={52977} type="food" />);
    await waitForDomChange();

    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', srcBlackFavoriteBtn);
  });

  test('Checkbox should start empty ', async () => {
    const {
      getByTestId,
      getByLabelText,
    } = renderWithContext(<InProcessPage id={52977} type="food" />);
    await waitForDomChange();
    corba.ingredients.forEach(({ ingredient }, index) => {
      expect(getByTestId(`${index}-ingredient-step`)).toContainElement(getByLabelText(ingredient));
    });
  });

  test('should be able to check some ingredients setting the local storage', async () => {
    const {
      getByTestId,
    } = renderWithContext(<InProcessPage id={52977} type="food" />);
    await waitForDomChange();
    const firstIngre = getByTestId('0-ingredient-step').firstElementChild;
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([]);
    fireEvent.click(firstIngre);
    expect(firstIngre).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([0]);
    fireEvent.click(firstIngre);
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([]);
  });
  test('should start with some ingredients checkeds', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52977: [0, 1, 3] } }));
    const {
      getByTestId,
    } = renderWithContext(<InProcessPage id={52977} type="food" />);
    await waitForDomChange();
    expect(getByTestId('0-ingredient-step').firstElementChild).toBeChecked();
    expect(getByTestId('1-ingredient-step').firstElementChild).toBeChecked();
    expect(getByTestId('2-ingredient-step').firstElementChild).not.toBeChecked();
    expect(getByTestId('3-ingredient-step').firstElementChild).toBeChecked();
    expect(getByTestId('12-ingredient-step').firstElementChild).not.toBeChecked();
  });
});


describe('InProcessPage drink', () => {
  const GG = handleDrinksData(drinks[0]);
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: { 15997: [] }, meals: {} }),
    );
  });

  test('should display the image, name, category and instructions', async () => {
    const { getByTestId } = renderWithContext(<InProcessPage id={15997} type="drink" />);
    await waitForDomChange();
    const title = getByTestId('recipe-title');
    const image = getByTestId('recipe-photo');
    const category = getByTestId('recipe-category');
    getByTestId('instructions');

    expect(title).toHaveTextContent(GG.name);
    expect(image).toHaveAttribute('src', GG.srcImage);
    expect(category).toHaveTextContent(GG.isAlcoholic);
  });

  test('localStorage favorite', async () => {
    const { getByTestId, getByText } = renderWithContext(<InProcessPage id={15997} type="drink" />);
    await waitForDomChange();
    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', srcWhiteFavoriteBtn);

    fireEvent.click(favoriteBtn);
    const mockedObj = JSON.stringify([{
      id: '15997',
      type: 'bebida',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg'
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
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '15997' }]));
    const { getByTestId } = renderWithContext(<InProcessPage id={15997} type="drink" />);
    await waitForDomChange();

    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', srcBlackFavoriteBtn);
  });


  test('Checkbox should start empty', async () => {
    const {
      getByTestId,
      getByLabelText,
    } = renderWithContext(<InProcessPage id={15997} type="drink" />);
    await waitForDomChange();
    GG.ingredients.forEach(({ ingredient }, index) => {
      expect(getByTestId(`${index}-ingredient-step`)).toContainElement(getByLabelText(ingredient));
    });
  });

  test('should be able to check some ingredients setting the local storage', async () => {
    const {
      getByTestId,
    } = renderWithContext(<InProcessPage id={15997} type="drink" />);
    await waitForDomChange();

    const firstIngre = getByTestId('0-ingredient-step').firstElementChild;
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([]);
    fireEvent.click(firstIngre);
    expect(firstIngre).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([0]);
    fireEvent.click(firstIngre);
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([]);
  });
  test('should start with some ingredients checkeds', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { 15997: [0, 1] } }));
    const {
      getByTestId,
    } = renderWithContext(<InProcessPage id={15997} type="drink" />);
    await waitForDomChange();
    expect(getByTestId('0-ingredient-step').firstElementChild).toBeChecked();
    expect(getByTestId('1-ingredient-step').firstElementChild).toBeChecked();
    expect(getByTestId('2-ingredient-step').firstElementChild).not.toBeChecked();
  });

  test('test the button Finalizar receita', async () => {
    const {
      getByTestId,
      history,
    } = renderWithContext(<InProcessPage id={15997} type="drink" />, '/bebidas/15977/in-progress');
    await waitForDomChange();
    expect(getByTestId('finish-recipe-btn')).toBeDisabled();
    GG.ingredients.forEach((_, index) => {
      fireEvent.click(getByTestId(`${index}-ingredient-step`))
    });
    expect(getByTestId('0-ingredient-step').firstElementChild).toBeChecked();
    expect(getByTestId('1-ingredient-step').firstElementChild).toBeChecked();
    expect(getByTestId('2-ingredient-step').firstElementChild).toBeChecked();

    expect(getByTestId('finish-recipe-btn')).toBeEnabled();
    fireEvent.click(getByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});
