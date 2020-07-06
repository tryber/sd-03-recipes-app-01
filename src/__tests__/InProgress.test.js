import React from 'react';
import { fireEvent } from '@testing-library/react';

import { FoodProcessPage, DrinkProcessPage } from '../pages';

import { LocalStorage, renderWithContext, Clipboard } from './tests_services';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import { FoodsContext } from '../contexts/FoodsContext';
import { DrinksContext } from '../contexts/DrinksContext';
import { handleFoodsData } from '../services/APIs/FOODS_API';
import { handleDrinksData } from '../services/APIs/DRINKS_API';

import srcShareBtn from '../images/shareIcon.svg';
import srcWhiteFavoriteBtn from '../images/whiteHeartIcon.svg';
import srcBlackFavoriteBtn from '../images/blackHeartIcon.svg';

localStorage = new LocalStorage();
navigator.clipboard = new Clipboard();

const corba = handleFoodsData(meals[0]);

const FProv = ({ children, value }) => (
  <FoodsContext.Provider value={value}>
    {children}
  </FoodsContext.Provider>
);
FProv.defaultProps = {
  value: [{ foodInProgress: corba }],
};
describe('FoodProcessPage', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { 52977: [] }, cocktails: {} }),
    );
  });

  test('should display the image, name, category and instructions', () => {
    const { getByTestId } = renderWithContext(<FProv><FoodProcessPage id={52977} /></FProv>);
    const title = getByTestId('recipe-title');
    const image = getByTestId('recipe-photo');
    const category = getByTestId('recipe-category');
    getByTestId('instructions');

    expect(title).toHaveTextContent(corba.name);
    expect(image).toHaveAttribute('src', corba.srcImage);
    expect(category).toHaveTextContent(corba.category);
  });

  test('localStorage favorite', async () => {
    const { getByTestId, getByText } = renderWithContext(<FProv><FoodProcessPage id={52977} /></FProv>);

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

    const { getByTestId } = renderWithContext(<FProv><FoodProcessPage id={52977} /></FProv>);

    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', srcBlackFavoriteBtn);
  });

  test('Checkbox should start empty ', () => {
    const {
      getByTestId,
      getByLabelText,
    } = renderWithContext(<FProv><FoodProcessPage id={52977} /></FProv>);
    corba.ingredients.forEach(({ ingredient }, index) => {
      expect(getByTestId(`${index}-item-step`)).toEqual(getByLabelText(ingredient));
    });
  });

  test('should be able to check some ingredients setting the local storage', () => {
    const {
      getByTestId,
    } = renderWithContext(<FProv><FoodProcessPage id={52977} /></FProv>);

    const firstIngre = getByTestId('0-item-step');
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([]);
    fireEvent.click(firstIngre);
    expect(firstIngre).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([0]);
    fireEvent.click(firstIngre);
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([]);
  });
  test('should start with some ingredients checkeds', () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52977: [0, 1, 3] } }));
    const {
      getByTestId,
    } = renderWithContext(<FProv><FoodProcessPage id={52977} /></FProv>);

    expect(getByTestId('0-item-step')).toBeChecked();
    expect(getByTestId('1-item-step')).toBeChecked();
    expect(getByTestId('2-item-step')).not.toBeChecked();
    expect(getByTestId('3-item-step')).toBeChecked();
    expect(getByTestId('12-item-step')).not.toBeChecked();
  });
});

const GG = handleDrinksData(drinks[0]);

const DProv = ({ children, value }) => (
  <DrinksContext.Provider value={value}>
    {children}
  </DrinksContext.Provider>
);
DProv.defaultProps = {
  value: [{ drinkInProgress: GG }],
};

describe('DrinkProcessPage', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: { 15997: [] }, meals: {} }),
    );
  });

  test('should display the image, name, category and instructions', () => {
    const { getByTestId } = renderWithContext(<DProv><DrinkProcessPage id={15997} /></DProv>);
    const title = getByTestId('recipe-title');
    const image = getByTestId('recipe-photo');
    const category = getByTestId('recipe-category');
    getByTestId('instructions');

    expect(title).toHaveTextContent(GG.name);
    expect(image).toHaveAttribute('src', GG.srcImage);
    expect(category).toHaveTextContent(GG.isAlcoholic);
  });

  test('localStorage favorite', async () => {
    const { getByTestId, getByText } = renderWithContext(<DProv><DrinkProcessPage id={15997} /></DProv>);

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

    const { getByTestId } = renderWithContext(<DProv><DrinkProcessPage id={15997} /></DProv>);

    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', srcBlackFavoriteBtn);
  });


  test('Checkbox should start empty ', () => {
    const {
      getByTestId,
      getByLabelText,
    } = renderWithContext(<DProv><DrinkProcessPage id={15997} /></DProv>);
    GG.ingredients.forEach(({ ingredient }, index) => {
      expect(getByTestId(`${index}-item-step`)).toEqual(getByLabelText(ingredient));
    });
  });

  test('should be able to check some ingredients setting the local storage', () => {
    const {
      getByTestId,
    } = renderWithContext(<DProv><DrinkProcessPage id={15997} /></DProv>);

    const firstIngre = getByTestId('0-item-step');
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([]);
    fireEvent.click(firstIngre);
    expect(firstIngre).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([0]);
    fireEvent.click(firstIngre);
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([]);
  });
  test('should start with some ingredients checkeds', () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { 15997: [0, 1] } }));
    const {
      getByTestId,
    } = renderWithContext(<DProv><DrinkProcessPage id={15997} /></DProv>);

    expect(getByTestId('0-item-step')).toBeChecked();
    expect(getByTestId('1-item-step')).toBeChecked();
    expect(getByTestId('2-item-step')).not.toBeChecked();
  });
});
